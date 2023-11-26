'use client';

import React, { useEffect, useState } from 'react';
import { deleteFeat, getAllFeats } from '@/app/actions';
import DataTable, { Row } from '@/components/Tables/DataTable';
import TableActions from '@/components/Tables/TableActions';
import { Feat } from '@/db/models';
import useRoute from '@/hooks/useRoute';
import { RoutePath } from '@/enums';

const FeatsAdminTable = () => {
  const { buildRoute } = useRoute();
  const [feats, setFeats] = useState<Feat[]>([]);

  async function refresh() {
    setFeats(await getAllFeats());
  }
  const headers = ['Title', 'Slug'];

  useEffect(() => {
    getAllFeats().then((loadedFeats) => {
      setFeats(loadedFeats);
    });
  }, []);

  async function handleDelete(id: number) {
    await deleteFeat(id);
    await refresh();
  }

  const rows: Row[] = feats.map((feat) => {
    return {
      cells: [feat.title, feat.slug],
      actions: (
        <TableActions
          editRoute={buildRoute({
            category: RoutePath.Rules,
            subcategory: RoutePath.Feats,
            slug: feat.slug,
            admin: true,
          })}
          deleteAction={() => handleDelete(feat.id)}
        />
      ),
    };
  });

  return <DataTable headers={headers} rows={rows} />;
};

export default FeatsAdminTable;
