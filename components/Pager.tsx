/*
 * @Description: 分页管理
 * @Author: chtao
 * @Github: https://github.com/LadyYang
 * @Email: 1763615252@qq.com
 * @Date: 2020-08-05 20:54:55
 * @LastEditTime: 2020-08-06 13:34:00
 * @LastEditors: chtao
 * @FilePath: \time\components\Pager.tsx
 */
import React from 'react';

import styles from './Pager.module.css';
import { mergeClass } from '../utils';

interface PagerProps {
  /** 页码改变的时触发 */
  onChange(index: number): void;

  current: number;

  /** 总数 */
  total: number;

  /** 一页显示多少条数据 */
  limit: number;

  /**
   * 当页码过多时，中间显示的页码数
   */
  mid?: 3 | 5;
}

/**
 * 分页原理：将需要的页码数通过计算放到一个数组中
 * 之后根据数组判断渲染页码还是省略号。
 * @param param0
 */
const Pager: React.FC<PagerProps> = ({
  onChange,
  total,
  mid = 3,
  limit,
  current,
}) => {
  // 不渲染
  if (total === 0 || limit === 0) return null;

  // 总页数
  const pageNum = Math.ceil(total / limit);

  /**
   * 中间要显示的页码数。
   * 因为当显示的页码数过多时，两边会出现省略号
   * 此时 safeRange 表示在中间要显示的页码
   * eg：1 ... 5 6 7 ... 13 14
   *  safeRage = [5, 6, 7]
   */
  const safeRange = new Set<number>();

  /**
   * 计算以 current 为中心页码的安全范围页码
   * 比如 mid = 3
   * current = 1 ---> safeRange = [1, 2]
   * current = 5 ---> safeRange = [4, 5, 6]
   */
  for (let i = 0; i < mid; i++) {
    let index = current - Math.floor(mid / 2) + i;
    if (index <= 1) {
      index = 1;
    }

    if (index >= pageNum) {
      index = pageNum;
    }
    safeRange.add(index);
  }

  // 最终要在页面渲染的 pages
  const pages = [...safeRange];

  /**
   * 向安全数组中加入左右边界
   * eg: [4, 5, 6] ---> [1, 2, 3, 4, 5, 6, ..., ]
   * [7, 8, 9] ---> [1, -1 , 7, 8, 9, -2 ]
   */
  if (pages[0] - 2 <= 1) {
    for (let i = pages[0] - 1; i >= 1; i--) {
      pages.unshift(i);
    }
  } else {
    // -1 代表前进
    pages.unshift(-1);
    pages.unshift(1);
  }

  if (pages[pages.length - 1] + 2 >= pageNum) {
    for (let i = pages[pages.length - 1] + 1; i <= pageNum; i++) {
      pages.push(i);
    }
  } else {
    // -2 代表后退
    pages.push(-2);
    pages.push(pageNum);
  }

  const renderData = pages.map(it => {
    if (it === -1) {
      return renderPrev2();
    }

    if (it === -2) {
      return renderNext2();
    }

    return (
      <span
        key={it}
        className={mergeClass(
          styles.item,
          current === it ? styles.active : null
        )}
        onClick={() => {
          if (current === it) return;
          onChange(it);
        }}
      >
        {it}
      </span>
    );
  });

  return (
    <div className={styles.pager}>
      <span
        className={mergeClass(styles.prev, styles.item)}
        onClick={() => {
          if (current === 1) return;

          let newPage = current - 1;
          if (newPage <= 1) {
            newPage = 1;
          }

          onChange(newPage);
        }}
      >
        <i className='iconfont'>&#xe732;</i>
      </span>

      {/* 中间内容部分  */}
      {renderData}

      <span
        className={mergeClass(styles.next, styles.item)}
        onClick={() => {
          if (current === pageNum) return;

          let newPage = current + 1;
          if (newPage >= pageNum) {
            newPage = pageNum;
          }

          onChange(newPage);
        }}
      >
        <i className='iconfont'>&#xe731;</i>
      </span>
    </div>
  );

  /**
   * 渲染前进按钮
   */
  function renderPrev2() {
    return (
      <span
        key='prev2'
        className={styles.ellipsesContainer}
        onClick={() => {
          let newPage = current - 3;
          if (newPage <= 1) {
            newPage = 1;
          }

          onChange(newPage);
        }}
      >
        <i className={mergeClass('iconfont', styles.ellipses)}>&#xe708;</i>
        <i className={mergeClass('iconfont', styles.prev2)}>&#xe624;</i>
      </span>
    );
  }

  /**
   * 渲染后退按钮
   */
  function renderNext2() {
    return (
      <span
        key='next2'
        className={styles.ellipsesContainer}
        onClick={() => {
          let newPage = current + 3;
          if (newPage >= pageNum) {
            newPage = pageNum;
          }

          onChange(newPage);
        }}
      >
        <i className={mergeClass('iconfont', styles.ellipses)}>&#xe708;</i>
        <i className={mergeClass('iconfont', styles.next2)}>&#xe62d;</i>
      </span>
    );
  }
};

export default Pager;
