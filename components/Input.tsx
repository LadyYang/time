import React, { InputHTMLAttributes, ReactElement } from 'react';

import styles from './Input.module.css';
import { mergeClass } from '../utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** 输入框左图标 */
  icon?: React.ReactNode;

  tipText?: string;
}

const Input: React.FC<InputProps> = ({ icon, tipText, ...res }) => {
  return (
    <div>
      <div className={mergeClass(styles.input, tipText ? styles.warn : null)}>
        <span className={styles.icon}>{icon}</span>
        <input {...res} />
      </div>
      <div className={styles.tip}>{tipText}</div>
    </div>
  );
};

export default Input;
