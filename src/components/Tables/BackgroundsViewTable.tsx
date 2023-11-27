import React from 'react';
import { getAllBackgrounds } from '@/app/actions';
import DataTable, { Row } from '@/components/Tables/DataTable';
import TableActions from '@/components/Tables/TableActions';
import useRoute from '@/hooks/useRoute';
import { RoutePath } from '@/enums';
import MarkdownContent from '@/components/Markdown/MarkdownContent';

const BackgroundsViewTable = async () => {
  const { buildRoute } = useRoute();
  const backgrounds = await getAllBackgrounds();
  const headers = ['Name', 'Description'];

  const rows: Row[] = await Promise.all(
    backgrounds.map(async (background) => {
      return {
        cells: [
          background.name,
          <MarkdownContent key={background.id}>
            {background.description}
          </MarkdownContent>,
        ],
        actions: (
          <TableActions
            viewRoute={buildRoute({
              category: RoutePath.Setting,
              subcategory: RoutePath.Backgrounds,
              slug: background.slug,
            })}
          />
        ),
      };
    })
  );

  return <DataTable headers={headers} rows={rows} />;
};

export default BackgroundsViewTable;
