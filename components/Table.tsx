import React, { CSSProperties } from 'react';

import styles from './Table.module.css';
import { mergeClass } from '../utils';

interface Column {
  /** 列上的标题 */
  title: string;

  /** 对应 dataSource 数据项中的下标 */
  dataIndex: string;

  key: string;

  /**
   * 使用 render 渲染该列
   * @param text 该列内容
   * @param data 该行数据
   */
  render?: (text: string, data: any) => React.ReactNode;
}

interface TableProps {
  /** 要展示的数据 */
  dataSource: any[];

  columns: Column[];

  /**
   * 作为渲染数据行时的 key
   * 可设置为数据库中的 id
   */
  rowKey: string;

  style?: CSSProperties;

  className?: string;
}

/**
 * 约定： 如果想显示序号，这里已经假设序号的 key 为 num
 * @param param0
 */
const Table: React.FC<TableProps> = ({
  columns,
  dataSource,
  rowKey,
  style,
  className,
}) => {
  const header = columns.map(it => {
    const style: any = {};
    // 设置序号列的宽度
    if (it.key === 'num') {
      style.flex = '0 1 80px';
    }
    return (
      <div key={it.key} style={{ flex: 1, ...style }} className={styles.column}>
        {it.title}
      </div>
    );
  });

  const data = dataSource.map((it, index) => {
    // 渲染每一行
    const cols = columns.map(col => {
      const style: any = {};
      if (col.key === 'num') {
        style.flex = '0 1 80px';
      }

      return (
        <div
          key={it[rowKey] + col.key}
          style={{ flex: 1, ...style }}
          className={styles.column}
        >
          {/* 有 render 方法的话，就渲染 render 方法的返回值 */}
          {col.render
            ? col.render(it[col.dataIndex], it)
            : col.key === 'num'
            ? index + 1
            : it[col.dataIndex]}
        </div>
      );
    });

    return (
      <div key={it[rowKey]} className={styles.row}>
        {cols}
      </div>
    );
  });

  return (
    <>
      <div className={mergeClass(styles.table, className)} style={style}>
        <div className={styles.header}>{header}</div>
        <div className={styles.main}>
          {data.length === 0 ? (
            <div className={styles.tip}>暂无数据</div>
          ) : (
            data
          )}
        </div>
      </div>
    </>
  );
};

// export default Table;

// 测试表明 使用 React.memo 减少额外 12ms 渲染时间
export default React.memo(Table);
