import { NextApiHandler } from 'next';
import jwt from 'jsonwebtoken';

import config from '../../config';

const validate: NextApiHandler = async (req, res) => {
  try {
    if (req.method !== 'POST') {
      throw Error('forbid');
    }

    res.statusCode = 200;
    const token: any = jwt.verify(req.body, config.privateKey);

    // 请求过期
    if (token.expired < Date.now()) {
      res.json({
        code: 100,
        message: '已过期，请重新登录',
      });
      return;
    }

    res.json({ code: 0 });
  } catch (e) {
    res.json({
      code: 100,
      message: `${e}`,
    });
  }
};

export default validate;
