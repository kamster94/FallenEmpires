'use client';

import React, { useEffect, useState } from 'react';
import { getAllGeneralSettings } from '@/app/actions';
import DataTable, { Row } from '@/components/Tables/DataTable';
import TableActions from '@/components/Tables/TableActions';
import { GeneralSetting } from '@/db/models';
import useRoute from '@/hooks/useRoute';
import { RoutePath } from '@/enums';

const GeneralSettingsAdminTable = () => {
  const { buildRoute } = useRoute();
  const [generalSettings, setGeneralSettings] = useState<GeneralSetting[]>([]);

  const headers = ['Key'];

  useEffect(() => {
    getAllGeneralSettings().then((loadedGeneralSettings) => {
      setGeneralSettings(loadedGeneralSettings);
    });
  }, []);

  const rows: Row[] = generalSettings.map((generalSetting) => {
    return {
      cells: [generalSetting.key],
      actions: (
        <TableActions
          editRoute={buildRoute({
            category: RoutePath.GeneralSettings,
            slug: generalSetting.key,
            admin: true,
          })}
        />
      ),
    };
  });

  return <DataTable headers={headers} rows={rows} />;
};

export default GeneralSettingsAdminTable;
