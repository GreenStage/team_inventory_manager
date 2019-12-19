import sign from 'jsonwebtoken';
import { Group } from '../models';

const MIN_USERNAME = 4;
const MIN_PASSWORD = 4;

export async function signup({ SIGN_KEY, SESSION_KEEP_ALIVE }, req, resp) {
  let group = {};
  let invite = {};

  if (typeof req.body.username !== 'string') return resp.json({ message: 'NO_USERNAME' });
  if (req.body.username.length < MIN_USERNAME) return resp.json({ message: 'USERNAME_TOO_SHORT' });

  if (typeof req.body.password !== 'string') return resp.json({ message: 'NO_PASSWORD' });
  if (req.body.password.length < MIN_PASSWORD) return resp.json({ message: 'PASSWORD_TOO_SHORT' });

  if (typeof req.body.code !== 'string') return resp.json({ message: 'NO_CODE' });

  try {
    group = await Group.findOne({ 'invite_codes._id': req.body.code });
    invite = group.invite_codes.id(req.query.code);
  } catch (err) {
    return resp.status(400).json({ message: 'CODE_NOT_FOUND' });
  }

  const now = new Date();
  if (now.getTime() - invite.expiresAt.getTime() > 0) {
    return resp.status(400).json({ message: 'EXPIRED_CODE' });
  }

  group.invite_codes.pull(invite._id);
  const user = {
    username: req.body.username,
    password: req.body.password,
  };

  if (group.users.some((u) => u.username === user.username)) {
    return resp.status(400).json({ message: 'USERNAME_TAKEN' });
  }
  group.users.push(user);

  try {
    await group.save();
  } catch (err) {
    return resp.status(400).json({ message: 'SERVER_ERROR' });
  }

  const usersNoPw = group.users.map(({ password, ...others }) => others);
  group.users = usersNoPw;

  return resp.json({
    message: 'OK',
    user,
    group,
    token: sign({
      groupid: group._id,
      userid: user._id,
    },
    SIGN_KEY,
    { espiresIn: SESSION_KEEP_ALIVE }),
  });
}


export async function signin({ SIGN_KEY, SESSION_KEEP_ALIVE }, req, resp) {
  let group = {}; let user = {};

  try {
    group = await Group.findOne({ name: req.body.groupname });
  } catch (err) {
    return resp.status(400).json({ message: 'GROUP_NOT_FOUND' });
  }

  try {
    user = group.users.find((u) => u.username === req.body.username);
    if (!user) throw (new Error('User not found in group'));

    await user.matchPassword(req.body.password);
  } catch (err) {
    return resp.status(400).json({ message: 'WRONG_USER_PASS' });
  }

  const usersNoPw = group.users.map(({ password, ...others }) => others);
  group.users = usersNoPw;

  return resp.json({
    message: 'OK',
    user,
    group,
    token: sign({
      groupid: group._id,
      userid: user._id,
    },
    SIGN_KEY,
    { espiresIn: SESSION_KEEP_ALIVE }),
  });
}
