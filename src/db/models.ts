import { InferSelectModel, InferInsertModel } from 'drizzle-orm';
import { sql } from '@vercel/postgres';
import { drizzle as drizzleVercel } from 'drizzle-orm/vercel-postgres';
import { drizzle as drizzlePostgres } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import dotenv from 'dotenv';
import {
  AncestriesTable,
  AncestriesTagsTable,
  CampaignsTable,
  FeatsTable,
  FeatsTagsTable,
  HeritagesTable,
  HeritagesTagsTable,
  PostsTable,
  RulePagesTable,
  SettingPagesTable,
  TagsTable,
} from '@/db/schema';

dotenv.config();

export type Campaign = InferSelectModel<typeof CampaignsTable>;
export type NewCampaign = InferInsertModel<typeof CampaignsTable>;

export type Post = InferSelectModel<typeof PostsTable>;
export type NewPost = InferInsertModel<typeof PostsTable>;

export type RulePage = InferSelectModel<typeof RulePagesTable>;
export type NewRulePage = InferInsertModel<typeof RulePagesTable>;

export type SettingPage = InferSelectModel<typeof SettingPagesTable>;
export type NewSettingPage = InferInsertModel<typeof SettingPagesTable>;

export type Tag = InferSelectModel<typeof TagsTable>;
export type NewTag = InferInsertModel<typeof TagsTable>;

export type Ancestry = InferSelectModel<typeof AncestriesTable>;
export type NewAncestry = InferInsertModel<typeof AncestriesTable>;

export type AncestryTag = InferSelectModel<typeof AncestriesTagsTable>;

export type Heritage = InferSelectModel<typeof HeritagesTable>;
export type NewHeritage = InferInsertModel<typeof HeritagesTable>;

export type HeritageTag = InferSelectModel<typeof HeritagesTagsTable>;

export type Feat = InferSelectModel<typeof FeatsTable>;
export type NewFeat = InferInsertModel<typeof FeatsTable>;

export type FeatTag = InferSelectModel<typeof FeatsTagsTable>;

export const db = process.env.LOCAL_DATABASE_URL
  ? drizzlePostgres(postgres(process.env.LOCAL_DATABASE_URL))
  : drizzleVercel(sql);
