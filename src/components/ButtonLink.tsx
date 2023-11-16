import React from 'react';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import Button from '@/components/Button';
import Link from 'next/link';

interface Props {
  label?: string;
  className?: string;
  icon?: IconDefinition;
  route: string;
}

const ButtonLink = ({ label, className, icon, route }: Props) => {
  return (
    <Link href={route}>
      <Button label={label} className={className} icon={icon} />
    </Link>
  );
};

export default ButtonLink;
