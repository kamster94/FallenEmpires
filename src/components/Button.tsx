import React from 'react';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  label?: string;
  className?: string;
  icon?: IconDefinition;
}

const Button = ({ label, className, icon, ...props }: Props) => {
  return (
    <button
      type='button'
      className={classnames(
        'flex items-center space-x-2 bg-primary px-4 py-2 text-secondary hover:opacity-70',
        className
      )}
      {...props}
    >
      {icon && <FontAwesomeIcon icon={icon} width={18} height={18} />}
      {label && <span>{label}</span>}
    </button>
  );
};

export default Button;
