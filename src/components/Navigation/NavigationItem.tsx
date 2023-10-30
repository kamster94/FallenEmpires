import React from 'react';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';

interface Props {
  label: string;
  route: string;
  icon?: IconDefinition;
  className?: string;
}

const NavigationItem = ({
  label, route, icon, className,
}: Props) => {
  return (
    <Link href={route} className={classnames('flex items-center space-x-2', className)}>
      {icon && (
        <FontAwesomeIcon icon={icon} width={18} height={18}/>
      )}
      <span>{label}</span>
    </Link>
  );
};

export default NavigationItem;
