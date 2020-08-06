import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import Input from './Input';

interface InputModalProps {
  visible: boolean;
  onOk: (...args: any[]) => void;
  onCancle: () => void;
}

const InputModal: React.FC<InputModalProps> = ({ onCancle, onOk, visible }) => {
  const [input, setInput] = useState({
    data: { title: '', date: '', time: '' },
    tip: { title: '', date: '', time: '' },
  });

  // 重置
  useEffect(() => {
    setInput({
      data: { title: '', date: '', time: '' },
      tip: { title: '', date: '', time: '' },
    });
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
        onCancle={onCancle}
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
            icon={<i className='iconfont'>&#xe64d;</i>}
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
            icon={<i className='iconfont'>&#xe603;</i>}
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
            icon={<i className='iconfont'>&#xe70f;</i>}
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

export default InputModal;
