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
  NewBackground,
  NewCampaign,
  NewCulture,
  NewFeat,
  NewGeneralSetting,
  NewHeritage,
  NewLanguage,
  NewLocation,
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
  BackgroundsTable,
  CampaignsTable,
  CulturesTable,
  FeatsTable,
  FeatsTagsTable,
  GeneralSettingsTable,
  HeritagesTable,
  HeritagesTagsTable,
  LanguagesTable,
  LocationsTable,
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

export async function getAllGeneralSettings(): Promise<GeneralSetting[]> {
  return db.query.GeneralSettingsTable.findMany();
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
      .set({
        name: ancestry.name,
        slug: ancestry.slug,
        description: ancestry.description,
      })
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
      .set({
        name: heritage.name,
        slug: heritage.slug,
        description: heritage.description,
      })
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
      .set({ name: feat.name, slug: feat.slug, description: feat.description })
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

export async function getAllBackgrounds() {
  return db.query.BackgroundsTable.findMany();
}

export async function getBackground(slug: string) {
  return db.query.BackgroundsTable.findFirst({
    where: eq(BackgroundsTable.slug, slug),
  });
}

export async function saveBackground(background: NewBackground) {
  if (background.id) {
    const updated = await db
      .update(BackgroundsTable)
      .set({
        name: background.name,
        slug: background.slug,
        description: background.description,
      })
      .where(eq(BackgroundsTable.id, background.id))
      .returning();
    revalidatePath('/');
    return updated;
  } else {
    const inserted = await db
      .insert(BackgroundsTable)
      .values(background)
      .returning();
    revalidatePath('/');
    return inserted;
  }
}

export async function deleteBackground(id: number) {
  await db.delete(BackgroundsTable).where(eq(BackgroundsTable.id, id));
  revalidatePath('/');
}

export async function getAllLanguages() {
  return db.query.LanguagesTable.findMany();
}

export async function getLanguage(slug: string) {
  return db.query.LanguagesTable.findFirst({
    where: eq(LanguagesTable.slug, slug),
  });
}

export async function saveLanguage(language: NewLanguage) {
  if (language.id) {
    const updated = await db
      .update(LanguagesTable)
      .set({
        name: language.name,
        slug: language.slug,
        description: language.description,
      })
      .where(eq(LanguagesTable.id, language.id))
      .returning();
    revalidatePath('/');
    return updated;
  } else {
    const inserted = await db
      .insert(LanguagesTable)
      .values(language)
      .returning();
    revalidatePath('/');
    return inserted;
  }
}

export async function deleteLanguage(id: number) {
  await db.delete(LanguagesTable).where(eq(LanguagesTable.id, id));
  revalidatePath('/');
}

export async function getAllCultures() {
  return db.query.CulturesTable.findMany();
}

export async function getCulture(slug: string) {
  return db.query.CulturesTable.findFirst({
    where: eq(CulturesTable.slug, slug),
  });
}

export async function saveCulture(culture: NewCulture) {
  if (culture.id) {
    const updated = await db
      .update(CulturesTable)
      .set({
        name: culture.name,
        slug: culture.slug,
        description: culture.description,
      })
      .where(eq(CulturesTable.id, culture.id))
      .returning();
    revalidatePath('/');
    return updated;
  } else {
    const inserted = await db.insert(CulturesTable).values(culture).returning();
    revalidatePath('/');
    return inserted;
  }
}

export async function deleteCulture(id: number) {
  await db.delete(CulturesTable).where(eq(CulturesTable.id, id));
  revalidatePath('/');
}

export async function getAllLocations() {
  return db.query.LocationsTable.findMany();
}

export async function getLocation(slug: string) {
  return db.query.LocationsTable.findFirst({
    where: eq(LocationsTable.slug, slug),
  });
}

export async function saveLocation(location: NewLocation) {
  if (location.id) {
    const updated = await db
      .update(LocationsTable)
      .set({
        name: location.name,
        slug: location.slug,
        description: location.description,
      })
      .where(eq(LocationsTable.id, location.id))
      .returning();
    revalidatePath('/');
    return updated;
  } else {
    const inserted = await db
      .insert(LocationsTable)
      .values(location)
      .returning();
    revalidatePath('/');
    return inserted;
  }
}

export async function deleteLocation(id: number) {
  await db.delete(LocationsTable).where(eq(LocationsTable.id, id));
  revalidatePath('/');
}
