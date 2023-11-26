import React, { ReactNode } from 'react';
import classnames from 'classnames';

interface Props {
  children: ReactNode;
  className?: string;
}

const FormSection = ({ children, className }: Props) => {
  return (
    <div className={classnames('flex flex-col', className)}>{children}</div>
  );
};

export default FormSection;
