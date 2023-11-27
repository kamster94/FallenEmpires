'use client';

import React, { useEffect, useState } from 'react';
import { deleteLanguage, getAllLanguages } from '@/app/actions';
import DataTable, { Row } from '@/components/Tables/DataTable';
import TableActions from '@/components/Tables/TableActions';
import { Language } from '@/db/models';
import useRoute from '@/hooks/useRoute';
import { RoutePath } from '@/enums';

const LanguagesAdminTable = () => {
  const { buildRoute } = useRoute();
  const [languages, setLanguages] = useState<Language[]>([]);

  async function refresh() {
    setLanguages(await getAllLanguages());
  }
  const headers = ['Title', 'Slug'];

  useEffect(() => {
    getAllLanguages().then((loadedLanguages) => {
      setLanguages(loadedLanguages);
    });
  }, []);

  async function handleDelete(id: number) {
    await deleteLanguage(id);
    await refresh();
  }

  const rows: Row[] = languages.map((language) => {
    return {
      cells: [language.title, language.slug],
      actions: (
        <TableActions
          editRoute={buildRoute({
            category: RoutePath.Setting,
            subcategory: RoutePath.Languages,
            slug: language.slug,
            admin: true,
          })}
          deleteAction={() => handleDelete(language.id)}
        />
      ),
    };
  });

  return <DataTable headers={headers} rows={rows} />;
};

export default LanguagesAdminTable;
