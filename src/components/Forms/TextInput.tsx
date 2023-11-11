import React from 'react';
import classnames from 'classnames';

interface Props extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>{
  className?: string;
}

const TextInput = ({ children, className, ...props }: Props) => {
  return (
    <input type="text" className={classnames('p-2 border-2 border-primary bg-secondary', className)} {...props} />
  );
};

export default TextInput;
