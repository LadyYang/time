import React, { useState } from 'react';
import dynamic from 'next/dynamic';

import Button from '../components/Button';
import InputModal from '../components/InputModal';

import styles from '../styles/home.module.css';

const index = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className={styles.home}>
      {/* <Pager onChange={i => console.log(i)} current={1} total={10} limit={5} /> */}

      <Button type='primary' onClick={() => setShowModal(true)}>
        添加
      </Button>

      <InputModal
        visible={showModal}
        onCancel={() => setShowModal(false)}
        onOk={v => console.log(v)}
      />
    </div>
  );
};

export default index;
