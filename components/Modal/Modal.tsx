/*
 * @Description:  Modal 组件
 * @Author: chtao
 * @Github: https://github.com/LadyYang
 * @Email: 1763615252@qq.com
 * @Date: 2020-08-06 00:24:26
 * @LastEditTime: 2020-08-06 16:17:40
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

  onCancle?: () => void;
  onOk?: () => void;
}

const Modal: React.FC<ModalProps> = ({
  children,
  visible,
  title,
  onCancle,
  onOk,
}) => {
  // server-side render
  if (!isBrowser()) return null;

  const mask = useMemo(() => {
    const div = document.createElement('div');
    div.classList.add('mask', styles.container);
    return div;
  }, []);

  useEffect(() => {
    if (visible) {
      document.onkeydown = e => {
        if (e.key === 'Escape' && onCancle) {
          onCancle();
        }
      };
      mask.classList.add(styles['show-modal']);
    } else {
      document.onkeydown = null;
      mask.classList.remove(styles['show-modal']);
    }
  }, [visible]);

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
        <div className={styles['close-btn']} onClick={onCancle}>
          <i className='iconfont'>&#xe625;</i>
        </div>
      </div>

      {/* main content */}
      <div className={styles.content}>{children}</div>

      {/* footer  */}
      <div className={styles.footer}>
        {onCancle && (
          <Button onClick={onCancle} className={styles.btn}>
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
