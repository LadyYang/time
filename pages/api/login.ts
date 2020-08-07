import { NextApiHandler } from 'next';
import jwt from 'jsonwebtoken';

import AccountDao from '../../dao/accountDao';
import config from '../../config';

const login: NextApiHandler = async (req, res) => {
  const pwd: any = jwt.verify(req.body, config.privateKey);

  // 请求过期
  if (pwd.expired < Date.now()) {
    res.json({
      code: 100,
      message: '已过期，请求失败',
    });
    return;
  }

  const resp = await AccountDao.validate(pwd.username, pwd.password);

  const payload = {
    username: pwd.username,
    expired: Date.now() + 1000 * 60 * 60,
  };
  const token = jwt.sign(payload, config.privateKey);

  // token 过期时间为一个小时
  res.setHeader('Set-Cookie', `token=${token}; max-age=${60 * 60}; path=/`);

  res.statusCode = 200;
  res.json(resp);
};

export default login;
