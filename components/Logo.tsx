import React, { CSSProperties } from 'react';

import Logo_ from '../public/logo.svg';

interface LogoProps {
  styles?: CSSProperties;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ styles = {}, className }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        ...styles,
      }}
      className={className}
    >
      <Logo_ />
    </div>
  );
};

export default React.memo(Logo);
