import React from 'react';
import { RoutePath } from '@/enums';
import ButtonLink from '@/components/ButtonLink';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import classnames from 'classnames';

interface Props {
  type: 'button' | 'link';
  route: string;
  label?: RoutePath;
  className?: string;
}

const NavigateBack = ({ type, route, label, className }: Props) => {
  if (type === 'button') {
    return (
      <ButtonLink route={route} icon={faArrowLeft} className={className} />
    );
  }

  if (type === 'link') {
    return (
      <Link
        href={route}
        className={classnames('text-gray-600 hover:text-black', className)}
      >
        <FontAwesomeIcon
          icon={faArrowLeft}
          width={16}
          height={14}
          className='mr-1'
        />
        <span>
          Back{label && ` to ${label.charAt(0).toUpperCase() + label.slice(1)}`}
        </span>
      </Link>
    );
  }
  return <div></div>;
};

export default NavigateBack;
