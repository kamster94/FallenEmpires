'use client';

import React, { useEffect, useState } from 'react';
import { deleteSettingPage, getAllSettingPages } from '@/app/actions';
import DataTable, { Row } from '@/components/Tables/DataTable';
import TableActions from '@/components/Tables/TableActions';
import { SettingPage } from '@/db/models';

const SettingPagesAdminTable = () => {
  const [settingPages, setSettingPages] = useState<SettingPage[]>([]);
  async function refresh() {
    setSettingPages(await getAllSettingPages());
  }
  const headers = ['Title', 'Slug'];

  useEffect(() => {
    getAllSettingPages().then((loadedSettingPages) => {
      setSettingPages(loadedSettingPages);
    });
  }, []);

  async function handleDelete(id: number) {
    await deleteSettingPage(id);
    await refresh();
  }

  const rows: Row[] = settingPages.map((settingPage) => {
    return {
      cells: [settingPage.title, settingPage.slug],
      actions: <TableActions editRoute={`/admin/setting/custom/${settingPage.slug}`} deleteAction={() => handleDelete(settingPage.id)}/>,
    };
  });

  return (
    <DataTable headers={headers} rows={rows} />
  );
};

export default SettingPagesAdminTable;
