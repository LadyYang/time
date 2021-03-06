/*
 * @Description: 登录页
 * @Author: chtao
 * @Github: https://github.com/LadyYang
 * @Email: 1763615252@qq.com
 * @Date: 2020-08-05 07:56:40
 * @LastEditTime: 2020-08-09 20:26:11
 * @LastEditors: chtao
 * @FilePath: \time\pages\login.tsx
 */
import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/dist/client/router';
import jwt from 'jsonwebtoken';

import Button from '../components/Button';
import Logo from '../components/Logo';
import Input from '../components/Input';
import config from '../config';

import { doLogin } from '../server';

import styles from '../styles/login.module.css';

const passwordLeftIcon = <i className='iconfont'>&#xe66c;</i>;
const usernameLeftIcon = <i className='iconfont'>&#xe657;</i>;

const login = () => {
  const router = useRouter();
  const [logining, setLogining] = useState(false);
  const [input, setInput] = useState({
    data: { username: '', password: '' },
    // 提示内容
    tip: { username: '', password: '' },
  });

  // 验证输入框
  const validate = () => {
    if (!input.data.username.trim()) {
      setInput({ ...input, tip: { password: '', username: '用户名不能为空' } });
      return false;
    }

    if (!input.data.password.trim()) {
      setInput({ ...input, tip: { username: '', password: '密码不能为空' } });
      return false;
    }

    return true;
  };

  // 登录功能
  const handleLogin = async () => {
    if (!validate()) return;

    // 对用户名、密码、时间戳一起进行加密
    const token = jwt.sign(
      {
        username: input.data.username,
        password: jwt.sign(input.data.password, config.privateKey),
        // 防止窃取数据
        expired: Date.now() + 1000,
      },
      config.privateKey
    );

    // 正在登录
    setLogining(true);

    // login fetch data
    try {
      const resp = await doLogin(token);

      if (resp.code === 0) {
        router.replace('/index.tsx', '/');
      }

      if (resp.code === 100) {
        setInput({ ...input, tip: { username: resp.message, password: '' } });
      }

      if (resp.code === 101) {
        setInput({ ...input, tip: { username: '', password: resp.message } });
      }

      setLogining(false);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChangePassword = useCallback(v => {
    // setInput 是异步的，这里使用闭包，保存 target
    const target = v.target;
    setInput(prev => ({
      data: { ...prev.data, password: target.value.trim() },
      tip: { ...prev.tip, password: '' },
    }));
  }, []);

  const handleChangeUsername = useCallback(v => {
    const target = v.target;
    setInput(prev => ({
      data: { ...prev.data, username: target.value.trim() },
      tip: { ...prev.tip, username: '' },
    }));
  }, []);

  return (
    <div
      className={styles.login}
      onKeyDown={e => {
        if (e.key === 'Enter') handleLogin();
      }}
    >
      <Logo className={styles.logo} />

      <div className={styles['input-box']} style={{ flex: 1 }}>
        <Input
          tip
          type='text'
          placeholder='用户名'
          value={input.data.username}
          onChange={handleChangeUsername}
          leftIcon={usernameLeftIcon}
          tipText={input.tip.username}
          autoFocus
        />

        <Input
          tip
          type='password'
          placeholder='密码'
          value={input.data.password}
          onChange={handleChangePassword}
          leftIcon={passwordLeftIcon}
          tipText={input.tip.password}
        />

        <Button
          type='primary'
          className={styles.btn}
          onClick={handleLogin}
          disable={logining}
        >
          登录
        </Button>
      </div>
    </div>
  );
};

export default login;
