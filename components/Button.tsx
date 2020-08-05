/*
 * @Description: 通用按钮组件
 * @Author: chtao
 * @Github: https://github.com/LadyYang
 * @Email: 1763615252@qq.com
 * @Date: 2020-08-05 09:54:24
 * @LastEditTime: 2020-08-05 17:39:44
 * @LastEditors: chtao
 * @FilePath: \time\components\Button.tsx
 */
import React, { CSSProperties, HTMLProps } from 'react';

import styles from './Button.module.css';
import { mergeClass } from '../utils';

interface ButtonProps extends HTMLProps<HTMLDivElement> {
  onClick?: () => void;
  disable?: boolean;
  type?: 'default' | 'primary';
  danger?: boolean;
  style?: CSSProperties;
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'default',
  danger = false,
  style,
  disable = false,
}) => {
  return (
    <div
      style={style}
      className={mergeClass(
        styles.btn,
        type === 'primary' ? styles['btn-primary'] : null,
        danger ? styles['btn-dangerous'] : null,
        disable ? styles['btn-disable'] : null
      )}
      onClick={disable ? () => {} : onClick}
    >
      <span>{children}</span>
    </div>
  );
};

export default React.memo(Button);
