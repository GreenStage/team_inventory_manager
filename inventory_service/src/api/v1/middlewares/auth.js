import jwt from 'express-jwt';

export default async function auth({ models, SIGN_KEY }, req, resp, next) {
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
      group = await models.Group.findById(req.token.groupid);
    } catch (err) {
      return resp.json({ message: 'GROUP_NOT_FOUND' });
    }

    if (!group || typeof group.name !== 'string' && group.name !== req.params.groupname) {
      return resp.status(401).json({ message: 'NOT_AUTHORIZED' });
    }

    const user = group.users.find((u) => u._id.toString() === req.token.userid);

    if (!user) return resp.status(404).json({ message: 'USER_NOT_FOUND' });
    
    req.group = group;
    req.user = user;
    return next();
  }));
}
