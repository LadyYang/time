/*
 * @Description: 登录页
 * @Author: chtao
 * @Github: https://github.com/LadyYang
 * @Email: 1763615252@qq.com
 * @Date: 2020-08-05 07:56:40
 * @LastEditTime: 2020-08-05 12:27:30
 * @LastEditors: chtao
 * @FilePath: \time\pages\login.tsx
 */
import React, { useState } from 'react';

import styles from '../styles/login.module.css';
import Input from '../components/Input';
import Button from '../components/Button';
import Logo from '../components/Logo';

const login = () => {
  const [form, setForm] = useState({ username: '', password: '' });

  const handleLogin = () => {
    console.log(form);
  };

  return (
    <div className={styles.login}>
      <Logo />

      <Input
        type='text'
        placeholder='用户名'
        value={form.username}
        onChange={v => setForm({ ...form, username: v.target.value.trim() })}
        icon={<i className='iconfont'>&#xe66c;</i>}
      />

      <Input
        type='password'
        placeholder='密码'
        value={form.password}
        onChange={v => setForm({ ...form, password: v.target.value.trim() })}
        icon={<i className='iconfont'>&#xe657;</i>}
      />

      <Button type='primary' style={{ height: 40 }} onClick={handleLogin}>
        登录
      </Button>
    </div>
  );
};

export default login;
