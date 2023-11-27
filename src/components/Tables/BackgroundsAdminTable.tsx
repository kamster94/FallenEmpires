'use client';

import React, { useEffect, useState } from 'react';
import { deleteBackground, getAllBackgrounds } from '@/app/actions';
import DataTable, { Row } from '@/components/Tables/DataTable';
import TableActions from '@/components/Tables/TableActions';
import { Background } from '@/db/models';
import useRoute from '@/hooks/useRoute';
import { RoutePath } from '@/enums';

const BackgroundsAdminTable = () => {
  const { buildRoute } = useRoute();
  const [backgrounds, setBackgrounds] = useState<Background[]>([]);

  async function refresh() {
    setBackgrounds(await getAllBackgrounds());
  }
  const headers = ['Title', 'Slug'];

  useEffect(() => {
    getAllBackgrounds().then((loadedBackgrounds) => {
      setBackgrounds(loadedBackgrounds);
    });
  }, []);

  async function handleDelete(id: number) {
    await deleteBackground(id);
    await refresh();
  }

  const rows: Row[] = backgrounds.map((background) => {
    return {
      cells: [background.title, background.slug],
      actions: (
        <TableActions
          editRoute={buildRoute({
            category: RoutePath.Setting,
            subcategory: RoutePath.Backgrounds,
            slug: background.slug,
            admin: true,
          })}
          deleteAction={() => handleDelete(background.id)}
        />
      ),
    };
  });

  return <DataTable headers={headers} rows={rows} />;
};

export default BackgroundsAdminTable;
