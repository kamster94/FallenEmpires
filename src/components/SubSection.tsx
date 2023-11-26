import React, { ReactNode } from 'react';
import classnames from 'classnames';

interface Props {
  children: ReactNode;
  className?: string;
}

const SubSection = ({ children, className }: Props) => {
  return (
    <div className={classnames('mb-4 flex items-center space-x-2', className)}>
      {children}
    </div>
  );
};

export default SubSection;
