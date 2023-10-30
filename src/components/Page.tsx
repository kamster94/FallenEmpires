import React, { ReactNode } from 'react';
import paper from '../../public/paper.jpg';

interface Props {
  children?: ReactNode;
}

const Page = ({ children }: Props) => {
  return (
    <div className="flex flex-col flex-wrap items-center container mx-auto px-1 my-8 p-8 border-2 border-solid border-primary py-6 md:flex-no-wrap md:px-1 justify-center space-y-8" style={{ backgroundImage: `url(${paper.src})` }}>
      {children}
    </div>
  );
};

export default Page;
