import React, { ReactNode } from 'react';
import classnames from 'classnames';

interface Props {
  children: ReactNode;
  className?: string;
}

const Section = ({ children, className }: Props) => {
  return (
    <div className={classnames('flex w-full flex-col', className)}>
      {children}
    </div>
  );
};

export default Section;
