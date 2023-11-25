'use client';

import React, { useEffect, useState } from 'react';
import { deleteHeritage, getAllHeritages } from '@/app/actions';
import DataTable, { Row } from '@/components/Tables/DataTable';
import TableActions from '@/components/Tables/TableActions';
import { Heritage } from '@/db/models';
import useRoute from '@/hooks/useRoute';
import { RoutePath } from '@/enums';

const HeritagesAdminTable = () => {
  const { buildRoute } = useRoute();
  const [heritages, setHeritages] = useState<Heritage[]>([]);

  async function refresh() {
    setHeritages(await getAllHeritages());
  }
  const headers = ['Title', 'Slug'];

  useEffect(() => {
    getAllHeritages().then((loadedHeritages) => {
      setHeritages(loadedHeritages);
    });
  }, []);

  async function handleDelete(id: number) {
    await deleteHeritage(id);
    await refresh();
  }

  const rows: Row[] = heritages.map((heritage) => {
    return {
      cells: [heritage.title, heritage.slug],
      actions: (
        <TableActions
          editRoute={buildRoute({
            category: RoutePath.Rules,
            subcategory: RoutePath.Heritages,
            slug: heritage.slug,
            admin: true,
          })}
          deleteAction={() => handleDelete(heritage.id)}
        />
      ),
    };
  });

  return <DataTable headers={headers} rows={rows} />;
};

export default HeritagesAdminTable;
