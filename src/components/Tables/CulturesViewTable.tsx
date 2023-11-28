import React from 'react';
import { getAllCultures } from '@/app/actions';
import DataTable, { Row } from '@/components/Tables/DataTable';
import TableActions from '@/components/Tables/TableActions';
import useRoute from '@/hooks/useRoute';
import { RoutePath } from '@/enums';
import MarkdownContent from '@/components/Markdown/MarkdownContent';

const CulturesViewTable = async () => {
  const { buildRoute } = useRoute();
  const cultures = await getAllCultures();
  const headers = ['Name', 'Description'];

  const rows: Row[] = await Promise.all(
    cultures.map(async (culture) => {
      return {
        cells: [
          culture.name,
          <MarkdownContent key={culture.id}>
            {culture.description}
          </MarkdownContent>,
        ],
        actions: (
          <TableActions
            viewRoute={buildRoute({
              category: RoutePath.Setting,
              subcategory: RoutePath.Cultures,
              slug: culture.slug,
            })}
          />
        ),
      };
    })
  );

  return <DataTable headers={headers} rows={rows} />;
};

export default CulturesViewTable;
