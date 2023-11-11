import React, { ReactNode } from 'react';
import classnames from 'classnames';

interface Props {
  children: ReactNode;
  className?: string;
}

const Label = ({ children, className }: Props) => {
  return (
    <label className={classnames('text-sm text-gray-600', className)}>{children}</label>
  );
};

export default Label;
