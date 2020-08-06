import React, { CSSProperties } from 'react';

import Logo_ from '../public/logo.svg';

interface LogoProps {
  styles?: CSSProperties;
}

const Logo: React.FC<LogoProps> = ({ styles = {} }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        ...styles,
      }}
    >
      <Logo_ />
    </div>
  );
};

export default React.memo(Logo);
