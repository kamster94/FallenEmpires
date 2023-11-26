'use server';

import {
  Ancestry,
  AncestryTag,
  Campaign,
  db,
  Feat,
  FeatTag,
  GeneralSetting,
  Heritage,
  HeritageTag,
  NewAncestry,
  NewCampaign,
  NewFeat,
  NewGeneralSetting,
  NewHeritage,
  NewPost,
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
  FeatsTable,
  FeatsTagsTable,
  GeneralSettingsTable,
  HeritagesTable,
  HeritagesTagsTable,
  PostsTable,
  RulePagesTable,
  SettingPagesTable,
  TagsTable,
} from '@/db/schema';
import { eq, inArray } from 'drizzle-orm';
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

export async function getTagsByIds(ids: number[]): Promise<Tag[]> {
  if (ids.length) {
    return db.query.TagsTable.findMany({
      where: inArray(TagsTable.id, ids),
    });
  }
  return [];
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
  await db
    .delete(AncestriesTagsTable)
    .where(eq(AncestriesTagsTable.ancestryId, id));
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

export async function getAllHeritages(): Promise<Heritage[]> {
  return db.query.HeritagesTable.findMany({
    with: {
      heritagesTags: true,
    },
  });
}

export async function getHeritage(slug: string): Promise<Heritage | undefined> {
  return db.query.HeritagesTable.findFirst({
    where: eq(HeritagesTable.slug, slug),
    with: {
      heritagesTags: true,
    },
  });
}

export async function saveHeritage(heritage: NewHeritage) {
  if (heritage.id) {
    const updated = await db
      .update(HeritagesTable)
      .set({ title: heritage.title, slug: heritage.slug, text: heritage.text })
      .where(eq(HeritagesTable.id, heritage.id))
      .returning();
    revalidatePath('/');
    return updated;
  } else {
    const inserted = await db
      .insert(HeritagesTable)
      .values(heritage)
      .returning();
    revalidatePath('/');
    return inserted;
  }
}

export async function deleteHeritage(id: number) {
  await db
    .delete(HeritagesTagsTable)
    .where(eq(HeritagesTagsTable.heritageId, id));
  await db.delete(HeritagesTable).where(eq(HeritagesTable.id, id));
  revalidatePath('/');
}

export async function saveHeritagesTags(
  heritageId: number,
  heritagesTags: HeritageTag[]
) {
  await db
    .delete(HeritagesTagsTable)
    .where(eq(HeritagesTagsTable.heritageId, heritageId));
  if (heritagesTags.length) {
    await db.insert(HeritagesTagsTable).values([...heritagesTags]);
  }
  revalidatePath('/');
}

export async function getAllFeats(): Promise<Feat[]> {
  return db.query.FeatsTable.findMany({
    with: {
      featsTags: true,
    },
  });
}

export async function getFeat(slug: string): Promise<Feat | undefined> {
  return db.query.FeatsTable.findFirst({
    where: eq(FeatsTable.slug, slug),
    with: {
      featsTags: true,
    },
  });
}

export async function saveFeat(feat: NewFeat) {
  if (feat.id) {
    const updated = await db
      .update(FeatsTable)
      .set({ title: feat.title, slug: feat.slug, text: feat.text })
      .where(eq(FeatsTable.id, feat.id))
      .returning();
    revalidatePath('/');
    return updated;
  } else {
    const inserted = await db.insert(FeatsTable).values(feat).returning();
    revalidatePath('/');
    return inserted;
  }
}

export async function deleteFeat(id: number) {
  await db.delete(FeatsTagsTable).where(eq(FeatsTagsTable.featId, id));
  await db.delete(FeatsTable).where(eq(FeatsTable.id, id));
  revalidatePath('/');
}

export async function saveFeatsTags(featId: number, featsTags: FeatTag[]) {
  await db.delete(FeatsTagsTable).where(eq(FeatsTagsTable.featId, featId));
  if (featsTags.length) {
    await db.insert(FeatsTagsTable).values([...featsTags]);
  }
  revalidatePath('/');
}

export async function getAllPosts() {
  return db.query.PostsTable.findMany();
}

export async function getPost(slug: string) {
  return db.query.PostsTable.findFirst({
    where: eq(PostsTable.slug, slug),
  });
}

export async function savePost(post: NewPost) {
  if (post.id) {
    const updated = await db
      .update(PostsTable)
      .set({ title: post.title, slug: post.slug, text: post.text })
      .where(eq(PostsTable.id, post.id))
      .returning();
    revalidatePath('/');
    return updated;
  } else {
    const inserted = await db.insert(PostsTable).values(post).returning();
    revalidatePath('/');
    return inserted;
  }
}

export async function deletePost(id: number) {
  await db.delete(PostsTable).where(eq(PostsTable.id, id));
  revalidatePath('/');
}
