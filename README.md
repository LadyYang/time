# 简介

# 开始

```bash
yarn

yarn build

yarn start -p 80

```

# API 接口

---

概述：根据标题获取活动时间

地址：[host]/api/activity/search?title=

方法：get

返回数据：

```json
{ "code": 0, "result": { "data": [], "total": "本次请求获取的数据量" } }
```

---

概述：获取已经根据 修改时间 排序好的数据 默认 offset = 0 limit = 10

地址：[host]/api/activity/get?offset=0&limit=10

方法：get

返回数据：

```json
{ "code": 0, "result": { "data": [], "total": "数据库数据总数" } }
```
