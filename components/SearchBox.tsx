import React, { useState } from 'react';

import Input from './Input';
import Button from './Button';

import styles from './SearchBox.module.css';

interface SearchBoxProps {
  onSearch: (v: string) => void;
  onAdd: () => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ onSearch, onAdd }) => {
  const [searchContent, setSearchContent] = useState('');

  return (
    <div className={styles.search}>
      <Input
        style={{ width: 400 }}
        placeholder='标题'
        value={searchContent}
        onChange={e => setSearchContent(e.target.value.trim())}
        leftIcon={<i className='iconfont'>&#xe650;</i>}
        rightIcon={
          <span
            style={{ cursor: 'pointer' }}
            onClick={() => onSearch(searchContent)}
          >
            搜索
          </span>
        }
        onKeyDown={e => {
          if (e.key === 'Enter') {
            onSearch(searchContent);
          }
        }}
      />

      <Button type='primary' onClick={onAdd}>
        添加
      </Button>
    </div>
  );
};

export default SearchBox;
