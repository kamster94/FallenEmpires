'use client';

import React, { useEffect, useState } from 'react';
import { deleteAncestry, getAllAncestries } from '@/app/actions';
import DataTable, { Row } from '@/components/Tables/DataTable';
import TableActions from '@/components/Tables/TableActions';
import { Ancestry } from '@/db/models';

const AncestriesAdminTable = () => {
  const [ancestries, setAncestries] = useState<Ancestry[]>([]);
  async function refresh() {
    setAncestries(await getAllAncestries());
  }
  const headers = ['Title', 'Slug'];

  useEffect(() => {
    getAllAncestries().then((loadedAncestries) => {
      setAncestries(loadedAncestries);
    });
  }, []);

  async function handleDelete(id: number) {
    await deleteAncestry(id);
    await refresh();
  }

  const rows: Row[] = ancestries.map((ancestry) => {
    return {
      cells: [ancestry.title, ancestry.slug],
      actions: (
        <TableActions
          editRoute={`/admin/rules/ancestries/${ancestry.slug}`}
          deleteAction={() => handleDelete(ancestry.id)}
        />
      ),
    };
  });

  return <DataTable headers={headers} rows={rows} />;
};

export default AncestriesAdminTable;
