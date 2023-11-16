import React, { ReactNode } from 'react';
import classnames from 'classnames';

interface Props {
  children: ReactNode;
  className?: string;
}

const SectionHeader = ({ children, className }: Props) => {
  return (
    <h2
      className={classnames('mb-4 text-2xl font-bold text-primary', className)}
    >
      {children}
    </h2>
  );
};

export default SectionHeader;
