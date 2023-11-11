import React, { ReactNode } from 'react';
import classnames from 'classnames';

interface Props {
  children: ReactNode;
  className?: string;
}

const Section = ({ children, className }: Props) => {
  return (
    <div className={classnames('flex flex-col w-full', className)}>
      {children}
    </div>
  );
};

export default Section;
