import React, { ReactNode } from 'react';
import BlockWithDecoration from '@/components/BlockWithDecoration';

interface Props {
  children: ReactNode;
}

const PageHeader = ({ children }: Props) => {
  return (
    <BlockWithDecoration>
      <h1 className='text-center text-5xl font-bold text-primary'>
        {children}
      </h1>
    </BlockWithDecoration>
  );
};

export default PageHeader;
