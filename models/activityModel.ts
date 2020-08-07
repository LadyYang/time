import { Model, DataTypes } from 'sequelize';
import sequelize from '.';

export interface ActivityModelType {
  id?: number;
  title: string;
  time: Date;
  updatedAt?: Date;
  createdAt?: Date;
}

export default class ActivityModel extends Model {}

ActivityModel.init(
  {
    id: { type: DataTypes.NUMBER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    time: { type: DataTypes.DATE, allowNull: false },
  },
  { sequelize, tableName: 'activity', modelName: 'activity' }
);
