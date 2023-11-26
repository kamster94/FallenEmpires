import { InferSelectModel, InferInsertModel } from 'drizzle-orm';
import { sql } from '@vercel/postgres';
import { drizzle as drizzleVercel } from 'drizzle-orm/vercel-postgres';
import { drizzle as drizzlePostgres } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import dotenv from 'dotenv';
import * as schema from '@/db/schema';

dotenv.config();

export type Campaign = InferSelectModel<typeof schema.CampaignsTable>;
export type NewCampaign = InferInsertModel<typeof schema.CampaignsTable>;

export type Post = InferSelectModel<typeof schema.PostsTable>;
export type NewPost = InferInsertModel<typeof schema.PostsTable>;

export type RulePage = InferSelectModel<typeof schema.RulePagesTable>;
export type NewRulePage = InferInsertModel<typeof schema.RulePagesTable>;

export type SettingPage = InferSelectModel<typeof schema.SettingPagesTable>;
export type NewSettingPage = InferInsertModel<typeof schema.SettingPagesTable>;

export type Tag = InferSelectModel<typeof schema.TagsTable>;
export type NewTag = InferInsertModel<typeof schema.TagsTable>;

export type Ancestry = InferSelectModel<typeof schema.AncestriesTable> & {
  ancestriesTags: AncestryTag[];
};
export type NewAncestry = InferInsertModel<typeof schema.AncestriesTable> & {
  ancestriesTags?: AncestryTag[];
};

export type AncestryTag = InferSelectModel<typeof schema.AncestriesTagsTable>;

export type Heritage = InferSelectModel<typeof schema.HeritagesTable> & {
  heritagesTags: HeritageTag[];
};
export type NewHeritage = InferInsertModel<typeof schema.HeritagesTable> & {
  heritagesTags?: HeritageTag[];
};

export type HeritageTag = InferSelectModel<typeof schema.HeritagesTagsTable>;

export type Feat = InferSelectModel<typeof schema.FeatsTable> & {
  featsTags: FeatTag[];
};
export type NewFeat = InferInsertModel<typeof schema.FeatsTable> & {
  featsTags?: FeatTag[];
};

export type FeatTag = InferSelectModel<typeof schema.FeatsTagsTable>;

export type GeneralSetting = InferSelectModel<
  typeof schema.GeneralSettingsTable
>;
export type NewGeneralSetting = InferInsertModel<
  typeof schema.GeneralSettingsTable
>;

export const db = process.env.LOCAL_DATABASE_URL
  ? drizzlePostgres(postgres(process.env.LOCAL_DATABASE_URL), { schema })
  : drizzleVercel(sql, { schema });
