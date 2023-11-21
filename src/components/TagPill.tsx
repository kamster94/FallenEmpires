import React from 'react';
import { Tag } from '@/db/models';
import Link from 'next/link';

interface Props {
  tag: Tag;
}

const TagPill = ({ tag }: Props) => {
  const pill = (
    <div className='bg-primary px-2 text-secondary hover:text-white'>
      {tag.label}
    </div>
  );

  if (tag.link) {
    return <Link href={tag.link}>{pill}</Link>;
  }

  return pill;
};

export default TagPill;
