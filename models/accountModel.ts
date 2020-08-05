/*
 * @Description: 映射到表 account
 * @Author: chtao
 * @Github: https://github.com/LadyYang
 * @Email: 1763615252@qq.com
 * @Date: 2020-08-05 14:11:40
 * @LastEditTime: 2020-08-05 17:17:53
 * @LastEditors: chtao
 * @FilePath: \time\models\accountModel.ts
 */

import { Model, DataTypes } from 'sequelize';
import sequelize from '.';

export default class AccountModel extends Model {}

AccountModel.init(
  {
    id: { type: DataTypes.NUMBER, primaryKey: true, autoIncrement: true },
    username: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
    expired: { type: DataTypes.DATE },
  },
  { sequelize, tableName: 'account', modelName: 'account' }
);
