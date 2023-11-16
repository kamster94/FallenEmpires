import React from 'react';
import BlockWithDecoration from '@/components/BlockWithDecoration';

interface Props {
  title: string;
}

const PageHeader = ({ title }: Props) => {
  return (
    <BlockWithDecoration>
      <h1 className='text-center text-5xl font-bold text-primary'>{title}</h1>
    </BlockWithDecoration>
  );
};

export default PageHeader;
