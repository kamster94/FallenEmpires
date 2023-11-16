import React from 'react';
import classnames from 'classnames';

interface Props
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  className?: string;
}

const TextInput = ({ children, className, ...props }: Props) => {
  return (
    <input
      type='text'
      className={classnames(
        'border-2 border-primary bg-secondary p-2',
        className
      )}
      {...props}
    />
  );
};

export default TextInput;
