import { NextApiHandler } from 'next';

import ActivityDao from '../../../dao/activityDao';
import { filter } from '../../../filter';

const activity: NextApiHandler = async (req, res) => {
  try {
    res.statusCode = 200;

    // 验证 api token
    if (!filter(req, res)) return;

    const { action } = req.query;

    let result: any = null;

    switch (action) {
      case 'search':
        if (req.method === 'GET') {
          result = await ActivityDao.doSearch(req.query as any);
          break;
        }
      case 'get':
        if (req.method === 'GET') {
          const offset = req.query.offset || 0;
          const limit = req.query.limit || 10;
          result = await ActivityDao.getData(+offset, +limit);
          break;
        }
      case 'set':
        if (req.method === 'POST') {
          result = await ActivityDao.doSet(req.body);
          break;
        }
      case 'del':
        if (req.method === 'POST') {
          result = await ActivityDao.doDelete(req.body);
          break;
        }
      default:
        throw Error('action 不存在 或 没有对应的 method');
    }

    res.json({ code: 0, result });
  } catch (e) {
    res.json({ code: 100, message: `${e}` });
  }
};

export default activity;
