import React, { InputHTMLAttributes, ReactElement } from 'react';

import styles from './Input.module.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** 输入框左图标 */
  icon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({ icon, ...res }) => {
  return (
    <div className={styles.input}>
      <span className={styles.icon}>{icon}</span>
      <input {...res} />
    </div>
  );
};

export default Input;
