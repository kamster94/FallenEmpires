import React from 'react';
import { Tag } from '@/db/models';
import TagPill from '@/components/TagPill';

interface Props {
  parentId: number;
  tags: Tag[];
}

const TagPillsList = ({ parentId, tags }: Props) => {
  return (
    <div className='flex flex-row space-x-2'>
      {tags.map((tag) => {
        return <TagPill key={`${parentId}_${tag.id}`} tag={tag} />;
      })}
    </div>
  );
};

export default TagPillsList;
