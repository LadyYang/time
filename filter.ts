import { NextApiRequest, NextApiResponse } from 'next';

import jwt from 'jsonwebtoken';
import config from './config';

/**
 * 对请求进行拦截过滤
 * @param req
 * @param res
 */
export const filter = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    if (!req.cookies.token) {
      res.json({ code: 100, message: '没有权限' });
      return false;
    }

    const validate: any = jwt.verify(req.cookies.token, config.privateKey);

    if (validate.expired < Date.now()) {
      res.json({ code: 100, message: 'token 过期' });
      return false;
    }
  }

  return true;
};
