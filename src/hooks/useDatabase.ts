import {
  Campaign, db, RulePage, SettingPage,
} from '@/db/models';
import { CampaignsTable, RulePagesTable, SettingPagesTable } from '@/db/schema';
import { eq } from 'drizzle-orm';

function useDatabase() {
  async function getAllSettingPages(): Promise<SettingPage[]> {
    return db.query.SettingPagesTable.findMany();
  }

  async function getSettingPage(slug: string): Promise<SettingPage | undefined> {
    return db.query.SettingPagesTable.findFirst({
      where: eq(SettingPagesTable.slug, slug),
    });
  }

  async function getAllRulePages(): Promise<RulePage[]> {
    return db.query.RulePagesTable.findMany();
  }

  async function getRulePage(slug: string): Promise<RulePage | undefined> {
    return db.query.RulePagesTable.findFirst({
      where: eq(RulePagesTable.slug, slug),
    });
  }

  async function getAllCampaigns(): Promise<Campaign[]> {
    return db.query.CampaignsTable.findMany();
  }

  async function getCampaign(slug: string): Promise<Campaign | undefined> {
    return db.query.CampaignsTable.findFirst({
      where: eq(CampaignsTable.slug, slug),
    });
  }

  return {
    getAllSettingPages,
    getSettingPage,
    getAllRulePages,
    getRulePage,
    getAllCampaigns,
    getCampaign,
  };
}

export default useDatabase;
