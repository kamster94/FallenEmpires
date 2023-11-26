import React, { ReactNode } from 'react';
import classnames from 'classnames';

interface Props {
  children: ReactNode;
  className?: string;
}

const Form = ({ children, className }: Props) => {
  return (
    <form className={classnames('flex flex-col space-y-3', className)}>
      {children}
    </form>
  );
};

export default Form;
