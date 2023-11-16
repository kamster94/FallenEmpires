'use client';

import React, { useEffect, useState } from 'react';
import { deleteCampaign, getAllCampaigns } from '@/app/actions';
import DataTable, { Row } from '@/components/Tables/DataTable';
import TableActions from '@/components/Tables/TableActions';
import { Campaign } from '@/db/models';

const CampaignsAdminTable = () => {
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
          editRoute={`/admin/campaigns/${campaign.slug}`}
          deleteAction={() => handleDelete(campaign.id)}
        />
      ),
    };
  });

  return <DataTable headers={headers} rows={rows} />;
};

export default CampaignsAdminTable;
