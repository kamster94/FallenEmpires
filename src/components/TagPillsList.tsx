import React from 'react';
import { Tag } from '@/db/models';
import TagPill from '@/components/TagPill';
import classnames from 'classnames';

interface Props {
  parentId: number;
  tags: Tag[];
  className?: string;
}

const TagPillsList = ({ parentId, tags, className }: Props) => {
  return (
    <div className={classnames('flex flex-row flex-wrap gap-2', className)}>
      {tags.map((tag) => {
        return <TagPill key={`${parentId}_${tag.id}`} tag={tag} />;
      })}
    </div>
  );
};

export default TagPillsList;
