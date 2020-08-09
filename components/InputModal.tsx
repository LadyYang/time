import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import Input from './Input';

interface InitialDataType {
  title: string;

  date: string;

  time: string;
}

interface InputModalProps {
  visible: boolean;
  onOk: (...args: any[]) => void;
  onCancel: () => void;

  initialData?: InitialDataType;
}

const InputModal: React.FC<InputModalProps> = ({
  onCancel,
  onOk,
  visible,
  initialData,
}) => {
  const [input, setInput] = useState({
    data: { title: '', date: '', time: '' },
    tip: { title: '', date: '', time: '' },
  });

  // 重置
  useEffect(() => {
    // 有初始数据，则用
    if (initialData) {
      setInput({
        data: { ...initialData },
        tip: { title: '', date: '', time: '' },
      });
    } else {
      setInput({
        data: { title: '', date: '', time: '' },
        tip: { title: '', date: '', time: '' },
      });
    }
  }, [visible]);

  const validate = () => {
    if (!input.data.title.trim()) {
      setInput({ ...input, tip: { ...input.tip, title: '请输入标题' } });
      return false;
    }

    if (!input.data.date.trim()) {
      setInput({ ...input, tip: { ...input.tip, date: '请选择日期' } });
      return false;
    }

    if (!input.data.time.trim()) {
      setInput({ ...input, tip: { ...input.tip, time: '请选择时间' } });
      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    onOk(input.data);
  };

  return (
    <div>
      <Modal
        visible={visible}
        title='添加活动时间'
        onOk={handleSubmit}
        onCancel={onCancel}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            height: 200,
            userSelect: 'none',
          }}
          onKeyDown={e => {
            if (e.key === 'Enter') handleSubmit();
          }}
        >
          <Input
            tip
            leftIcon={<i className='iconfont'>&#xe64d;</i>}
            placeholder='活动标题'
            value={input.data.title}
            onChange={e =>
              setInput({
                data: { ...input.data, title: e.target.value.trim() },
                tip: { ...input.tip, title: '' },
              })
            }
            tipText={input.tip.title}
          />

          <Input
            tip
            max='2099-11-23'
            min='2020-08-01'
            leftIcon={<i className='iconfont'>&#xe603;</i>}
            placeholder='活动日期'
            type='date'
            value={input.data.date}
            onChange={e =>
              setInput({
                data: { ...input.data, date: e.target.value.trim() },
                tip: { ...input.tip, date: '' },
              })
            }
            tipText={input.tip.date}
          />

          <Input
            tip
            leftIcon={<i className='iconfont'>&#xe70f;</i>}
            placeholder='活动时间'
            type='time'
            value={input.data.time}
            onChange={e =>
              setInput({
                data: { ...input.data, time: e.target.value.trim() },
                tip: { ...input.tip, time: '' },
              })
            }
            tipText={input.tip.time}
          />
        </div>
      </Modal>
    </div>
  );
};

export default React.memo(InputModal);
