import React from 'react';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';

export interface NavigationIemProps {
  label: string;
  route: string;
  icon?: IconDefinition;
}

interface Props {
  navigationItem: NavigationIemProps;
  className?: string;
}

const NavigationItem = ({ navigationItem, className }: Props) => {
  return (
    <Link
      href={navigationItem.route}
      className={classnames('flex items-center space-x-2', className)}
    >
      {navigationItem.icon && (
        <FontAwesomeIcon icon={navigationItem.icon} width={18} height={18} />
      )}
      <span>{navigationItem.label}</span>
    </Link>
  );
};

export default NavigationItem;
