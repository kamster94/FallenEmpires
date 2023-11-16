import React, { ReactNode } from 'react';
import paper from '../../public/paper.jpg';

interface Props {
  children?: ReactNode;
}

const Page = ({ children }: Props) => {
  return (
    <div
      className='md:flex-no-wrap container mx-auto my-8 flex flex-col flex-wrap items-center justify-center space-y-8 border-2 border-solid border-primary p-8 px-1 py-6 md:px-1'
      style={{ backgroundImage: `url(${paper.src})` }}
    >
      {children}
    </div>
  );
};

export default Page;
