'use client';

import React, { useEffect, useState } from 'react';
import { deleteRulePage, getAllRulePages } from '@/app/actions';
import DataTable, { Row } from '@/components/Tables/DataTable';
import TableActions from '@/components/Tables/TableActions';
import { RulePage } from '@/db/models';

const RulePagesAdminTable = () => {
  const [rulePages, setRulePages] = useState<RulePage[]>([]);
  async function refresh() {
    setRulePages(await getAllRulePages());
  }
  const headers = ['Title', 'Slug'];

  useEffect(() => {
    getAllRulePages().then((loadedRulePages) => {
      setRulePages(loadedRulePages);
    });
  }, []);

  async function handleDelete(id: number) {
    await deleteRulePage(id);
    await refresh();
  }

  const rows: Row[] = rulePages.map((rulePage) => {
    return {
      cells: [rulePage.title, rulePage.slug],
      actions: (
        <TableActions
          editRoute={`/admin/rules/custom/${rulePage.slug}`}
          deleteAction={() => handleDelete(rulePage.id)}
        />
      ),
    };
  });

  return <DataTable headers={headers} rows={rows} />;
};

export default RulePagesAdminTable;
