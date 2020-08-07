/*
 * @Description: 整合所有的 API 接口
 * @Author: chtao
 * @Github: https://github.com/LadyYang
 * @Email: 1763615252@qq.com
 * @Date: 2020-08-06 16:55:06
 * @LastEditTime: 2020-08-07 14:55:58
 * @LastEditors: chtao
 * @FilePath: \time\server\index.ts
 */

import { ActivityModelType } from '../models/activityModel';

/**
 * 登录请求
 * @param token username password expired 一起加密的结果
 */
export const doLogin = async (token: string) => {
  return await (
    await fetch('/api/login', {
      method: 'POST',
      body: token,
    })
  ).json();
};

/**
 * 获取所有活动的数据
 * @param offset
 * @param limit
 */
export const getActivityData = async (
  offset: number = 0,
  limit: number = 10
) => {
  return await (
    await fetch(`/api/activity/get?offset=${offset}&limit=${limit}`)
  ).json();
};

/**
 * 搜索对应活动的数据
 * @param title 活动名称
 */
export const doSearch = async (title: string) => {
  return await (await fetch(`/api/activity/search?title=${title}`)).json();
};

/**
 * 修改或添加数据
 * @param params
 * @param token
 */
export const doSetData = async (params: ActivityModelType, token: string) => {
  const body = JSON.stringify({ ...params, token });
  return await (
    await fetch('/api/activity/set', { body, method: 'POST' })
  ).json();
};

export const doDelete = async (id: string, token: string) => {
  const body = JSON.stringify({ id, token });
  return await (
    await fetch('/api/activity/del', { body, method: 'POST' })
  ).json();
};

export const isLogin = async (token: string) => {
  return await (
    await fetch('/api/validate', {
      method: 'POST',
      body: token,
    })
  ).json();
};
