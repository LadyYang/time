/*
 * @Description: 连接数据库
 * @Author: chtao
 * @Github: https://github.com/LadyYang
 * @Email: 1763615252@qq.com
 * @Date: 2020-08-05 14:30:12
 * @LastEditTime: 2020-08-05 17:08:20
 * @LastEditors: chtao
 * @FilePath: \time\models\index.ts
 */

import { Sequelize } from 'sequelize';
import config from '../config';

const sequelize = new Sequelize({
  database: config.db.database,
  username: config.db.username,
  password: config.db.password,
  host: config.db.host,
  port: config.db.port,
  dialect: 'mysql',
  logging: false,
  timezone: '+08:00',
});

export default sequelize;
