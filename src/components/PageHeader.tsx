import React from 'react';
import BlockWithDecoration from '@/components/BlockWithDecoration';

interface Props {
  title: string;
}

const PageHeader = ({ title }: Props) => {
  return (
    <BlockWithDecoration>
      <h1 className="text-5xl text-primary font-bold text-center">
        {title}
      </h1>
    </BlockWithDecoration>
  );
};

export default PageHeader;
