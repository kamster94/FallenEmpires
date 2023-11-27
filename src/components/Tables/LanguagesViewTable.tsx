import React from 'react';
import { getAllLanguages } from '@/app/actions';
import DataTable, { Row } from '@/components/Tables/DataTable';
import TableActions from '@/components/Tables/TableActions';
import useRoute from '@/hooks/useRoute';
import { RoutePath } from '@/enums';
import MarkdownContent from '@/components/Markdown/MarkdownContent';

const LanguagesViewTable = async () => {
  const { buildRoute } = useRoute();
  const languages = await getAllLanguages();
  const headers = ['Title', 'Text'];

  const rows: Row[] = await Promise.all(
    languages.map(async (language) => {
      return {
        cells: [
          language.title,
          <MarkdownContent key={language.id}>{language.text}</MarkdownContent>,
        ],
        actions: (
          <TableActions
            viewRoute={buildRoute({
              category: RoutePath.Setting,
              subcategory: RoutePath.Languages,
              slug: language.slug,
            })}
          />
        ),
      };
    })
  );

  return <DataTable headers={headers} rows={rows} />;
};

export default LanguagesViewTable;
