import { NextApiHandler } from 'next';
import jwt from 'jsonwebtoken';

import AccountDao from '../../dao/accountDao';
import config from '../../config';

const login: NextApiHandler = async (req, res) => {
  const pwd: any = jwt.verify(req.body, config.privateKey);

  // 请求过期
  if (pwd.expired < Date.now()) {
    res.json({
      code: 103,
      message: '已过期，请求失败',
    });
    return;
  }

  const resp = await AccountDao.validate(pwd.username, pwd.password);

  res.json(resp);
};

export default login;
