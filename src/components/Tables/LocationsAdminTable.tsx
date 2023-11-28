'use client';

import React, { useEffect, useState } from 'react';
import { deleteLocation, getAllLocations } from '@/app/actions';
import DataTable, { Row } from '@/components/Tables/DataTable';
import TableActions from '@/components/Tables/TableActions';
import { Location } from '@/db/models';
import useRoute from '@/hooks/useRoute';
import { RoutePath } from '@/enums';

const LocationsAdminTable = () => {
  const { buildRoute } = useRoute();
  const [locations, setLocations] = useState<Location[]>([]);

  async function refresh() {
    setLocations(await getAllLocations());
  }
  const headers = ['Name', 'Slug'];

  useEffect(() => {
    getAllLocations().then((loadedLocations) => {
      setLocations(loadedLocations);
    });
  }, []);

  async function handleDelete(id: number) {
    await deleteLocation(id);
    await refresh();
  }

  const rows: Row[] = locations.map((location) => {
    return {
      cells: [location.name, location.slug],
      actions: (
        <TableActions
          editRoute={buildRoute({
            category: RoutePath.Setting,
            subcategory: RoutePath.Locations,
            slug: location.slug,
            admin: true,
          })}
          deleteAction={() => handleDelete(location.id)}
        />
      ),
    };
  });

  return <DataTable headers={headers} rows={rows} />;
};

export default LocationsAdminTable;
