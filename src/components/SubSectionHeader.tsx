import React, { ReactNode } from 'react';
import classnames from 'classnames';

interface Props {
  children: ReactNode;
  className?: string;
}

const SubSectionHeader = ({ children, className }: Props) => {
  return (
    <h4 className={classnames('text-xl font-bold text-primary', className)}>
      {children}
    </h4>
  );
};

export default SubSectionHeader;
