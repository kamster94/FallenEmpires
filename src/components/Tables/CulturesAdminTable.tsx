'use client';

import React, { useEffect, useState } from 'react';
import { deleteCulture, getAllCultures } from '@/app/actions';
import DataTable, { Row } from '@/components/Tables/DataTable';
import TableActions from '@/components/Tables/TableActions';
import { Culture } from '@/db/models';
import useRoute from '@/hooks/useRoute';
import { RoutePath } from '@/enums';

const CulturesAdminTable = () => {
  const { buildRoute } = useRoute();
  const [cultures, setCultures] = useState<Culture[]>([]);

  async function refresh() {
    setCultures(await getAllCultures());
  }
  const headers = ['Name', 'Slug'];

  useEffect(() => {
    getAllCultures().then((loadedCultures) => {
      setCultures(loadedCultures);
    });
  }, []);

  async function handleDelete(id: number) {
    await deleteCulture(id);
    await refresh();
  }

  const rows: Row[] = cultures.map((culture) => {
    return {
      cells: [culture.name, culture.slug],
      actions: (
        <TableActions
          editRoute={buildRoute({
            category: RoutePath.Setting,
            subcategory: RoutePath.Cultures,
            slug: culture.slug,
            admin: true,
          })}
          deleteAction={() => handleDelete(culture.id)}
        />
      ),
    };
  });

  return <DataTable headers={headers} rows={rows} />;
};

export default CulturesAdminTable;
