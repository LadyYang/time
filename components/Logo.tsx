import React from 'react';

import Logo_ from '../public/logo.svg';

const Logo = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <Logo_ />
    </div>
  );
};

export default React.memo(Logo);
