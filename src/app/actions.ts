'use server';

import {
  Ancestry,
  AncestryTag,
  Campaign,
  db,
  GeneralSetting,
  NewAncestry,
  NewCampaign,
  NewGeneralSetting,
  NewRulePage,
  NewSettingPage,
  NewTag,
  RulePage,
  SettingPage,
  Tag,
} from '@/db/models';
import {
  AncestriesTable,
  AncestriesTagsTable,
  CampaignsTable,
  GeneralSettingsTable,
  RulePagesTable,
  SettingPagesTable,
  TagsTable,
} from '@/db/schema';
import { and, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

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
  revalidatePath('/');
}

export async function deleteSettingPage(id: number) {
  await db.delete(SettingPagesTable).where(eq(SettingPagesTable.id, id));
  revalidatePath('/');
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
  revalidatePath('/');
}

export async function deleteRulePage(id: number) {
  await db.delete(RulePagesTable).where(eq(RulePagesTable.id, id));
  revalidatePath('/');
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
  revalidatePath('/');
}

export async function deleteCampaign(id: number) {
  await db.delete(CampaignsTable).where(eq(CampaignsTable.id, id));
  revalidatePath('/');
}

export async function getGeneralSetting(
  key: string
): Promise<GeneralSetting | undefined> {
  return db.query.GeneralSettingsTable.findFirst({
    where: eq(GeneralSettingsTable.key, key),
  });
}

export async function saveGeneralSetting(generalSetting: NewGeneralSetting) {
  if (generalSetting.id) {
    await db
      .update(GeneralSettingsTable)
      .set({ value: generalSetting.value })
      .where(eq(GeneralSettingsTable.id, generalSetting.id));
  } else {
    await db.insert(GeneralSettingsTable).values(generalSetting);
  }
  revalidatePath('/');
}

export async function getAllTags(): Promise<Tag[]> {
  return db.query.TagsTable.findMany();
}

export async function getTag(id: number): Promise<Tag | undefined> {
  return db.query.TagsTable.findFirst({
    where: eq(TagsTable.id, id),
  });
}

export async function saveTag(tag: NewTag) {
  if (tag.id) {
    await db
      .update(TagsTable)
      .set({ label: tag.label, link: tag.link })
      .where(eq(TagsTable.id, tag.id));
  } else {
    await db.insert(TagsTable).values(tag);
  }
  revalidatePath('/');
}

export async function deleteTag(id: number) {
  await db.delete(TagsTable).where(eq(TagsTable.id, id));
  revalidatePath('/');
}

export async function getAllAncestries(): Promise<Ancestry[]> {
  return db.query.AncestriesTable.findMany({
    with: {
      ancestriesTags: true,
    },
  });
}

export async function getAncestry(slug: string): Promise<Ancestry | undefined> {
  return db.query.AncestriesTable.findFirst({
    where: eq(AncestriesTable.slug, slug),
    with: {
      ancestriesTags: true,
    },
  });
}

export async function saveAncestry(ancestry: NewAncestry) {
  if (ancestry.id) {
    const updated = await db
      .update(AncestriesTable)
      .set({ title: ancestry.title, slug: ancestry.slug, text: ancestry.text })
      .where(eq(AncestriesTable.id, ancestry.id))
      .returning();
    revalidatePath('/');
    return updated;
  } else {
    const inserted = await db
      .insert(AncestriesTable)
      .values(ancestry)
      .returning();
    revalidatePath('/');
    return inserted;
  }
}

export async function deleteAncestry(id: number) {
  await db.delete(AncestriesTable).where(eq(AncestriesTable.id, id));
  revalidatePath('/');
}

export async function saveAncestriesTags(
  ancestryId: number,
  ancestriesTags: AncestryTag[]
) {
  await db
    .delete(AncestriesTagsTable)
    .where(eq(AncestriesTagsTable.ancestryId, ancestryId));
  if (ancestriesTags.length) {
    await db.insert(AncestriesTagsTable).values([...ancestriesTags]);
  }
  revalidatePath('/');
}

export async function deleteAncestryTag(ancestryTag: AncestryTag) {
  await db
    .delete(AncestriesTagsTable)
    .where(
      and(
        eq(AncestriesTagsTable.tagId, ancestryTag.tagId),
        eq(AncestriesTagsTable.ancestryId, ancestryTag.ancestryId)
      )
    );
  revalidatePath('/');
}
