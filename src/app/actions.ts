'use server';

import {
  Campaign, db, NewSettingPage, RulePage, SettingPage,
} from '@/db/models';
import { SettingPagesTable } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function getAllSettingPages(): Promise<SettingPage[]> {
  return db.query.SettingPagesTable.findMany();
}

export async function saveSettingPage(settingPage: NewSettingPage) {
  if (settingPage.id) {
    await db
      .update(SettingPagesTable)
      .set({ title: settingPage.title, text: settingPage.text, slug: settingPage.slug })
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

export async function getAllCampaigns(): Promise<Campaign[]> {
  return db.query.CampaignsTable.findMany();
}
