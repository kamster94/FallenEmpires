'use client';

import React, { useEffect, useState } from 'react';
import { deleteCampaign, getAllCampaigns } from '@/app/actions';
import DataTable, { Row } from '@/components/Tables/DataTable';
import TableActions from '@/components/Tables/TableActions';
import { Campaign } from '@/db/models';
import useRoute from '@/hooks/useRoute';
import { RoutePath } from '@/enums';

const CampaignsAdminTable = () => {
  const { buildRoute } = useRoute();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  async function refresh() {
    setCampaigns(await getAllCampaigns());
  }
  const headers = ['Name', 'Slug'];

  useEffect(() => {
    getAllCampaigns().then((loadedCampaigns) => {
      setCampaigns(loadedCampaigns);
    });
  }, []);

  async function handleDelete(id: number) {
    await deleteCampaign(id);
    await refresh();
  }

  const rows: Row[] = campaigns.map((campaign) => {
    return {
      cells: [campaign.name, campaign.slug],
      actions: (
        <TableActions
          editRoute={buildRoute({
            category: RoutePath.Campaigns,
            slug: campaign.slug,
            admin: true,
          })}
          deleteAction={() => handleDelete(campaign.id)}
        />
      ),
    };
  });

  return <DataTable headers={headers} rows={rows} />;
};

export default CampaignsAdminTable;
