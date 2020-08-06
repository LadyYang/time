/*
 * @Description:  Modal 组件
 * @Author: chtao
 * @Github: https://github.com/LadyYang
 * @Email: 1763615252@qq.com
 * @Date: 2020-08-06 00:24:26
 * @LastEditTime: 2020-08-06 16:22:56
 * @LastEditors: chtao
 * @FilePath: \time\components\Modal\Modal.tsx
 */
import React, { useMemo, useEffect } from 'react';
import ReactDOM from 'react-dom';

import styles from './Modal.module.css';
import Button from '../Button';
import { isBrowser } from '../../utils';

export interface ModalProps {
  visible: boolean;
  title: string;

  onCancel?: () => void;
  onOk?: () => void;
}

const Modal: React.FC<ModalProps> = ({
  children,
  visible,
  title,
  onCancel: onCancel,
  onOk,
}) => {
  // server-side render
  if (!isBrowser()) return null;

  // 蒙层
  const mask = useMemo(() => {
    const div = document.createElement('div');
    div.classList.add('mask', styles.container);
    return div;
  }, []);

  // 切换显示 Modal， 同时按下 Esc 会执行 onCancel 方法
  useEffect(() => {
    if (visible) {
      document.onkeydown = e => {
        if (e.key === 'Escape' && onCancel) {
          onCancel();
        }
      };
      mask.classList.add(styles['show-modal']);
    } else {
      document.onkeydown = null;
      mask.classList.remove(styles['show-modal']);
    }
  }, [visible]);

  // 将 mask 加入到 body 中
  useEffect(() => {
    document.body.appendChild(mask);

    return () => {
      document.body.removeChild(mask);
    };
  }, [mask]);

  return ReactDOM.createPortal(
    <div className={styles.modal}>
      {/* header */}
      <div className={styles.header}>
        <div className={styles.title}>{title}</div>
        <div className={styles['close-btn']} onClick={onCancel}>
          <i className='iconfont'>&#xe625;</i>
        </div>
      </div>

      {/* main content */}
      <div className={styles.content}>{children}</div>

      {/* footer  */}
      <div className={styles.footer}>
        {onCancel && (
          <Button onClick={onCancel} className={styles.btn}>
            取消
          </Button>
        )}
        {onOk && (
          <Button onClick={onOk} className={styles.btn} type='primary'>
            确认
          </Button>
        )}
      </div>
    </div>,
    mask
  );
};

export default Modal;
