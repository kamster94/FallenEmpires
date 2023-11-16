import React from 'react';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { NavigationIemProps } from '@/components/Navigation/NavigationItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import classnames from 'classnames';

export interface NavigationCategoryProps {
  label: string;
  icon: IconDefinition;
  navigationItems?: NavigationIemProps[];
  route?: string;
  target?: string;
}

interface Props {
  navigationCategory: NavigationCategoryProps;
  className?: string;
}

const NavigationCategoryMenu = ({ navigationCategory, className }: Props) => {
  if (navigationCategory.route) {
    return (
      <Link
        href={navigationCategory.route}
        target={navigationCategory.target}
        className={classnames(
          'inline-flex w-full items-center space-x-1',
          className
        )}
      >
        <FontAwesomeIcon
          icon={navigationCategory?.icon}
          width={18}
          height={18}
        />
        <span>{navigationCategory?.label}</span>
      </Link>
    );
  }

  return (
    <div
      className={classnames(
        'inline-flex w-full items-center space-x-1',
        className
      )}
    >
      <FontAwesomeIcon icon={navigationCategory?.icon} width={18} height={18} />
      <span>{navigationCategory?.label}</span>
    </div>
  );
};

export default NavigationCategoryMenu;
