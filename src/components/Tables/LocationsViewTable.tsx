import React from 'react';
import { getAllLocations } from '@/app/actions';
import DataTable, { Row } from '@/components/Tables/DataTable';
import TableActions from '@/components/Tables/TableActions';
import useRoute from '@/hooks/useRoute';
import { RoutePath } from '@/enums';
import MarkdownContent from '@/components/Markdown/MarkdownContent';

const LocationsViewTable = async () => {
  const { buildRoute } = useRoute();
  const locations = await getAllLocations();
  const headers = ['Name', 'Description'];

  const rows: Row[] = await Promise.all(
    locations.map(async (location) => {
      return {
        cells: [
          location.name,
          <MarkdownContent key={location.id}>
            {location.description}
          </MarkdownContent>,
        ],
        actions: (
          <TableActions
            viewRoute={buildRoute({
              category: RoutePath.Setting,
              subcategory: RoutePath.Locations,
              slug: location.slug,
            })}
          />
        ),
      };
    })
  );

  return <DataTable headers={headers} rows={rows} />;
};

export default LocationsViewTable;
