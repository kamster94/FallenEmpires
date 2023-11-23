'use client';

import React, { useEffect, useState } from 'react';
import { deleteTag, getAllTags } from '@/app/actions';
import DataTable, { Row } from '@/components/Tables/DataTable';
import TableActions from '@/components/Tables/TableActions';
import { Tag } from '@/db/models';
import useRoute from '@/hooks/useRoute';
import { RoutePath } from '@/enums';

const TagsAdminTable = () => {
  const { buildRoute } = useRoute();
  const [tags, setTags] = useState<Tag[]>([]);

  async function refresh() {
    setTags(await getAllTags());
  }
  const headers = ['Label', 'Link'];

  useEffect(() => {
    getAllTags().then((loadedTags) => {
      setTags(loadedTags);
    });
  }, []);

  async function handleDelete(id: number) {
    await deleteTag(id);
    await refresh();
  }

  const rows: Row[] = tags.map((tag) => {
    return {
      cells: [tag.label, tag.link ?? ''],
      actions: (
        <TableActions
          editRoute={buildRoute({
            category: RoutePath.Tags,
            slug: tag.id.toString(),
            admin: true,
          })}
          deleteAction={() => handleDelete(tag.id)}
        />
      ),
    };
  });

  return <DataTable headers={headers} rows={rows} />;
};

export default TagsAdminTable;
