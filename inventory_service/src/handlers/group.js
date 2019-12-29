import {sign} from 'jsonwebtoken';
import { Types } from 'mongoose';
import { Group } from '../models';

const MIN_USERNAME = 4;
const MIN_PASSWORD = 4;
const MIN_GROUPNAME = 4;

export async function newGroup({ SIGN_KEY, SESSION_KEEP_ALIVE }, req, resp) {
  if (typeof req.body.groupname !== 'string') return resp.json({ message: 'NO_GROUPNAME' });
  if (req.body.groupname.length < MIN_GROUPNAME) return resp.json({ message: 'GROUPNAME_TOO_SHORT' });

  if (typeof req.body.username !== 'string') return resp.json({ message: 'NO_USERNAME' });
  if (req.body.username.length < MIN_USERNAME) return resp.json({ message: 'USERNAME_TOO_SHORT' });

  if (typeof req.body.password !== 'string') return resp.json({ message: 'NO_PASSWORD' });
  if (req.body.password.length < MIN_PASSWORD) return resp.json({ message: 'PASSWORD_TOO_SHORT' });

  const user = {
    username: req.body.username,
    password: req.body.password,
  };

  const group = new Group({
    name: req.body.groupname,
    users: [user],
  });

  try {
    await group.save();
  } catch (err) {
    return resp.status(400).json({ message: 'GROUP_ALREADY_EXISTS' });
  }

  delete user.password;
  group.users.forEach((u) => {
    // eslint-disable-next-line no-param-reassign
    u.password = '';
  });

  const userId = group.users.find(u=> u.username === user.username)._id;

  return resp.json({
    message: 'OK',
    user,
    group,
    token: sign({
      groupid: group._id,
      userid: userId,
    },
    SIGN_KEY,
    { expiresIn: SESSION_KEEP_ALIVE }),
  });
}

export async function createGroupCode(config, req, resp) {
  const expireAt = new Date();
  expireAt.setTime(expireAt.getTime() + 15 * 86400000);

  const groupCode = {
    code: Types.ObjectId(),
    expiresAt: expireAt,
  };

  req.group.invite_codes.push(groupCode);

  try {
    await req.group.save();
  } catch (err) {
    return resp.json({ message: 'FAIL_CREATE_CODE' });
  }
  return resp.json({ message: 'OK', groupCode });
}

export async function getGroup(config,req,resp){
  return resp.json({
    message: 'OK',
    group: req.group,
    user: req.user,
  });
}

export async function setGroupPic(config, req, resp) {
  return resp.json({ message: 'OK' });
}
