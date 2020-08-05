import { NextApiHandler } from 'next';
import jwt from 'jsonwebtoken';

import AccountDao from '../../dao/accountDao';
import config from '../../config';

const login: NextApiHandler = async (req, res) => {
  const pwd: any = jwt.verify(req.body, config.privateKey);

  const resp = await AccountDao.validate(pwd.username, pwd.password);

  res.json(resp);
};

export default login;
