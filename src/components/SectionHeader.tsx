import React, { ReactNode } from 'react';
import classnames from 'classnames';

interface Props {
  children: ReactNode;
  className?: string;
}

const SectionHeader = ({ children, className }: Props) => {
  return (
    <h2 className={classnames('text-primary font-bold text-2xl mb-4', className)}>{children}</h2>
  );
};

export default SectionHeader;
