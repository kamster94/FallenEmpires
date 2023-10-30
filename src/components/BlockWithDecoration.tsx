import React, { ReactNode } from 'react';
import decoration from '../../public/decoration.png';

interface Props {
  children: ReactNode;
}

const BlockWithDecoration = ({ children }: Props) => {
  return (
    <div className="flex flex-col">
      {children}
      <div className="h-8" style={{ backgroundImage: `url(${decoration.src})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}/>
    </div>
  );
};

export default BlockWithDecoration;
