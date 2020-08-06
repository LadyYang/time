import React, { useState } from 'react';
import dynamic from 'next/dynamic';

import Modal from '../components/Modal';
import Input from '../components/Input';
import Button from '../components/Button';

// const Modal = dynamic(() => import('../components/Modal'));

const index = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      {/* <Pager onChange={i => console.log(i)} current={1} total={10} limit={5} /> */}

      <Button type='primary' onClick={() => setShowModal(true)}>
        添加
      </Button>

      <Modal
        visible={showModal}
        title='添加活动时间'
        onOk={() => console.log('ok')}
        onCancle={() => console.log('cancle')}
      >
        <div className='input'>
          <Input />

          <Input />
        </div>
      </Modal>
    </div>
  );
};

export default index;
