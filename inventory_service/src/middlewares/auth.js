import jwt from 'express-jwt';

import {Group} from '../models';

export default async function auth({ SIGN_KEY }, req, resp, next) {
  console.log(req.headers.authorization)
  const jwtRequestH = jwt({
    secret: SIGN_KEY,
    requestProperty: 'token',
    getToken: () => {
      if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
      }
      return null;
    },
  });
  jwtRequestH(req,resp,(req, resp, async () => {
    let group = {};

    try {
      group = await Group.findById(req.token.groupid);
    } catch (err) {
      return resp.json({ message: 'GROUP_NOT_FOUND' });
    }

    if (typeof group.name !== 'string' && group.name !== req.params.groupname) {
      return resp.status(401).json({ message: 'NOT_AUTHORIZED' });
    }

    const user = group.users.filter((u) => u._id === req.token.userid);

    if (!user) return resp.status(404).json({ message: 'USER_NOT_FOUND' });
    
    delete user.password;
    group.users.forEach((u) => {
      // eslint-disable-next-line no-param-reassign
      u.password = '';
    });

    req.group = group;
    req.user = user;
    return next();
  }));
}
