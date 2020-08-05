import AccountModel from '../models/accountModel';

export default class AccountDao {
  /**
   * 用户登录验证
   * @param username
   * @param password
   */
  static async validate(username: string, password: string) {
    try {
      const user: any = await AccountModel.findOne({ where: { username } });

      if (!user) {
        return {
          code: 100,
          message: '用户不存在',
        };
      }

      if (user.password !== password) {
        return {
          code: 101,
          message: '密码不正确',
        };
      }

      return {
        code: 0,
        result: { token: '123' },
      };
    } catch (e) {
      console.log(e);
      return {
        code: 500,
        message: `${e}`,
      };
    }
  }

  static async createUser(username: string, password: string) {}
}
