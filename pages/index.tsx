/*
 * @Description: 主页
 * @Author: chtao
 * @Github: https://github.com/LadyYang
 * @Email: 1763615252@qq.com
 * @Date: 2020-08-05 07:39:09
 * @LastEditTime: 2020-08-07 15:02:55
 * @LastEditors: chtao
 * @FilePath: \time\pages\index.tsx
 */
import React, { useState, useEffect, useCallback } from 'react';

import Button from '../components/Button';
import Modal from '../components/Modal';
import InputModal from '../components/InputModal';
import Pagination from '../components/Pagiation';
import SearchBox from '../components/SearchBox';
import Table from '../components/Table';

import { getActivityData, doSearch, doDelete, doSetData } from '../server';
import { formatDate } from '../utils';

import styles from '../styles/home.module.css';

const defaultWarnData = { show: false, content: '', whichId: '' };
const defaultEditData = {
  title: '',
  time: '',
  id: '',
  date: '',
};

const index = () => {
  const [showInputModal, setShowInputModal] = useState(false);

  // 页面初次加载时，请求的数据
  const [dataSource, setDataSource] = useState([]);

  // 点击行 删除 按钮时，提示的数据
  const [warn, setWarn] = useState(defaultWarnData);

  const [editData, setEditData] = useState(defaultEditData);

  // 分页控制
  const [page, setPage] = useState({
    offset: 0,
    limit: 10,
    current: 1,
    total: 0,
  });

  // fetch
  useEffect(() => {
    fetchData();
  }, []);

  // 表格的每一列
  const columns = [
    { title: '序号', key: 'num', dataIndex: 'id' },
    { title: '标题', key: 'title', dataIndex: 'title' },
    {
      title: '时间',
      key: 'time',
      dataIndex: 'time',
      render: (time: string) => <span>{formatDate(time)}</span>,
    },
    {
      title: '操作',
      key: 'id',
      dataIndex: 'id',
      render: (_: any, col: any) => {
        // 解构出每一行的 日期和时间
        const [date, time] = formatDate(col.time).split(' ');

        return (
          <div className={styles.action}>
            <Button
              danger
              type='primary'
              onClick={() =>
                setWarn({ show: true, content: '确定删除 ?', whichId: col.id })
              }
            >
              删除
            </Button>
            <Button
              type='primary'
              onClick={() => {
                // 将当前行数据传递给 InputModal
                // 达到编辑的功能
                setEditData({
                  title: col.title,
                  date: date.replace(/\//g, '-'),
                  time,
                  id: col.id,
                });
                setShowInputModal(true);
              }}
            >
              编辑
            </Button>
          </div>
        );
      },
    },
  ];

  const handleSearch = async (val: string) => {
    const resp = await doSearch(val);

    if (resp.code === 0) {
      setDataSource(resp.result.data || []);
      setPage({ ...page, total: resp.result.total });
    } else {
      alert(resp.message);
    }
  };

  const handleDelete = async () => {
    setWarn(defaultWarnData);
    const resp = await doDelete(warn.whichId, '123');

    if (resp.code === 0) {
      await fetchData();
    } else {
      alert(resp.message);
    }
  };

  const handleCancelModal = useCallback(() => {
    setShowInputModal(false);
    setWarn(defaultWarnData);
    setEditData(defaultEditData);
  }, []);

  const handleAdd = useCallback(async v => {
    const resp = await doSetData(
      {
        title: v.title,
        time: new Date(`${v.date} ${v.time}`),
        // 没有 id 则是编辑修改，有 id 则是添加
        id: v.id || null,
      },
      'f'
    );

    if (resp.code !== 0) {
      alert(resp.message);
    }

    fetchData();
    handleCancelModal();
  }, []);

  const handlePageChange = (i: number) => {
    const offset = (i - 1) * page.limit;

    fetchData(offset, page.limit);

    // 这里更新要使用函数的形式
    // 不然 fetchData 中再 setPage 时，会覆盖
    setPage(prev => ({ ...prev, current: i }));
  };

  async function fetchData(offset: number = 0, limit: number = 10) {
    const resp = await getActivityData(offset, limit);

    if (resp.code === 0) {
      setDataSource(resp.result.data || []);
      setPage(prev => ({ ...prev, total: resp.result.total }));
    } else {
      alert(resp.message);
    }
  }

  return (
    <div className={styles.home}>
      {/* search */}
      <SearchBox
        onAdd={() => setShowInputModal(true)}
        onSearch={handleSearch}
      />

      {/* 表格 */}
      <Table
        style={{ width: '80%' }}
        dataSource={dataSource}
        columns={columns}
        // 数据库中的主键是 id
        rowKey='id'
      />

      {/* 分页 */}
      <Pagination
        current={page.current}
        total={page.total}
        limit={page.limit}
        onChange={handlePageChange}
      />

      {/* 添加输入框 */}
      <InputModal
        initialData={editData}
        visible={showInputModal}
        onCancel={handleCancelModal}
        onOk={handleAdd}
      />

      {/* 警告 Modal */}
      <Modal
        visible={warn.show}
        title='警告 !!!'
        onCancel={handleCancelModal}
        onOk={handleDelete}
      >
        {warn.content}
      </Modal>
    </div>
  );
};

export default index;
