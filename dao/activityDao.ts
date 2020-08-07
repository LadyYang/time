import ActivityModel from '../models/activityModel';
import { Op } from 'sequelize';

export default class ActivityDao {
  /**
   * 获取活动数据，根据 updatedAt 时间排序好的
   * @param offset
   * @param limit
   */
  static async getData(offset: number, limit: number) {
    const result = await ActivityModel.findAll({
      offset,
      limit,
      order: [['updatedAt', 'DESC']],
    });
    const total = await ActivityModel.count();

    return { data: result, total };
  }

  /**
   * 搜索活动时间
   * @param query
   */
  static async doSearch(query: any) {
    const { title } = query;
    if (!title) {
      return this.getData(0, 10);
    } else {
      const result = await ActivityModel.findAll({
        where: { title: { [Op.like]: `%${title}%` } },
      });
      return {
        data: result,
        total: result.length,
      };
    }
  }

  /**
   *  没有数据时创建，有该条数据时，直接更新
   * @param body
   */
  static async doSet(body: any) {
    body = JSON.parse(body);

    if (!body.title.trim()) {
      throw Error('标题不能为空');
    }

    if (new Date(body.time).toString() === 'Invalid Date') {
      throw Error('时间不正确');
    }

    const result = await ActivityModel.findOne({
      where: { title: body.title },
    });

    if (result) {
      throw Error('title 已存在');
    }

    return ActivityModel.upsert({
      title: body.title,
      time: new Date(body.time),
      id: body.id || null,
    });
  }

  /**
   * 删除记录
   * @param id 主键
   */
  static async doDelete(body: any) {
    const { id } = JSON.parse(body);

    return ActivityModel.destroy({ where: { id } });
  }
}
