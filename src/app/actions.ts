'use server';

import {
  Campaign,
  db,
  NewCampaign,
  NewRulePage,
  NewSettingPage,
  RulePage,
  SettingPage,
} from '@/db/models';
import { CampaignsTable, RulePagesTable, SettingPagesTable } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function getAllSettingPages(): Promise<SettingPage[]> {
  return db.query.SettingPagesTable.findMany();
}

export async function getSettingPage(
  slug: string
): Promise<SettingPage | undefined> {
  return db.query.SettingPagesTable.findFirst({
    where: eq(SettingPagesTable.slug, slug),
  });
}

export async function saveSettingPage(settingPage: NewSettingPage) {
  if (settingPage.id) {
    await db
      .update(SettingPagesTable)
      .set({
        title: settingPage.title,
        text: settingPage.text,
        slug: settingPage.slug,
      })
      .where(eq(SettingPagesTable.id, settingPage.id));
  } else {
    await db.insert(SettingPagesTable).values(settingPage);
  }
}

export async function deleteSettingPage(id: number) {
  await db.delete(SettingPagesTable).where(eq(SettingPagesTable.id, id));
}

export async function getAllRulePages(): Promise<RulePage[]> {
  return db.query.RulePagesTable.findMany();
}

export async function getRulePage(slug: string): Promise<RulePage | undefined> {
  return db.query.RulePagesTable.findFirst({
    where: eq(RulePagesTable.slug, slug),
  });
}

export async function saveRulePage(rulePage: NewRulePage) {
  if (rulePage.id) {
    await db
      .update(RulePagesTable)
      .set({ title: rulePage.title, text: rulePage.text, slug: rulePage.slug })
      .where(eq(RulePagesTable.id, rulePage.id));
  } else {
    await db.insert(RulePagesTable).values(rulePage);
  }
}

export async function deleteRulePage(id: number) {
  await db.delete(RulePagesTable).where(eq(RulePagesTable.id, id));
}

export async function getAllCampaigns(): Promise<Campaign[]> {
  return db.query.CampaignsTable.findMany();
}

export async function getCampaign(slug: string): Promise<Campaign | undefined> {
  return db.query.CampaignsTable.findFirst({
    where: eq(CampaignsTable.slug, slug),
  });
}

export async function saveCampaign(campaign: NewCampaign) {
  if (campaign.id) {
    await db
      .update(CampaignsTable)
      .set({ name: campaign.name, text: campaign.text, slug: campaign.slug })
      .where(eq(CampaignsTable.id, campaign.id));
  } else {
    await db.insert(CampaignsTable).values(campaign);
  }
}

export async function deleteCampaign(id: number) {
  await db.delete(CampaignsTable).where(eq(CampaignsTable.id, id));
}
