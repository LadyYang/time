import React, { InputHTMLAttributes, CSSProperties } from 'react';

import styles from './Input.module.css';
import { mergeClass } from '../utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** 输入框左图标 */
  leftIcon?: React.ReactNode;

  rightIcon?: React.ReactNode;

  tipText?: string;

  style?: CSSProperties;

  /** 禁止在输入框下有提示内容 , 默认为 false, 不提示*/
  tip?: boolean;
}

const arr: any[] = [];

const Input: React.FC<InputProps> = ({
  leftIcon,
  tipText,
  rightIcon,
  style,
  tip = false,
  ...res
}) => {
  return (
    <div style={style}>
      <div className={mergeClass(styles.input, tipText ? styles.warn : null)}>
        <span className={styles.icon}>{leftIcon}</span>
        <input {...res} autoComplete='off' />
        <span className={styles.icon}>{rightIcon}</span>
      </div>
      {tip && <div className={styles.tip}>{tipText}</div>}
    </div>
  );
};

export default React.memo(Input);
