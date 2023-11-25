import {
  integer,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const CampaignsTable = pgTable(
  'Campaigns',
  {
    id: serial('Id').primaryKey(),
    name: varchar('Name', { length: 255 }).notNull(),
    slug: varchar('Slug', { length: 255 }).notNull(),
    text: text('Text'),
  },
  (campaigns) => {
    return {
      uniqueIdx: uniqueIndex('Campaigns_unique_idx').on(campaigns.slug),
    };
  }
);

export const PostsTable = pgTable('Posts', {
  id: serial('Id').primaryKey(),
  title: varchar('Title', { length: 255 }).notNull(),
  slug: varchar('Slug', { length: 255 }).unique().notNull(),
  author: varchar('Author', { length: 255 }).notNull(),
  date: timestamp('Date').defaultNow().notNull(),
  text: text('Text'),
});

export const RulePagesTable = pgTable('RulePages', {
  id: serial('Id').primaryKey(),
  title: varchar('Title', { length: 255 }).notNull(),
  slug: varchar('Slug', { length: 255 }).unique().notNull(),
  text: text('Text'),
});

export const SettingPagesTable = pgTable('SettingPages', {
  id: serial('Id').primaryKey(),
  title: varchar('Title', { length: 255 }).notNull(),
  slug: varchar('Slug', { length: 255 }).unique().notNull(),
  text: text('Text'),
});

export const TagsTable = pgTable('Tags', {
  id: serial('Id').primaryKey(),
  label: varchar('Label', { length: 255 }).notNull(),
  link: varchar('Link', { length: 255 }),
});

export const AncestriesTable = pgTable('Ancestries', {
  id: serial('Id').primaryKey(),
  title: varchar('Title', { length: 255 }).notNull(),
  slug: varchar('Slug', { length: 255 }).unique().notNull(),
  text: text('Text'),
});

export const AncestriesTagsTable = pgTable(
  'AncestriesTags',
  {
    ancestryId: integer('AncestryId')
      .references(() => AncestriesTable.id)
      .notNull(),
    tagId: integer('TagId')
      .references(() => TagsTable.id)
      .notNull(),
  },
  (ancestriesTags) => {
    return {
      pk: primaryKey({
        columns: [ancestriesTags.ancestryId, ancestriesTags.tagId],
      }),
    };
  }
);

export const AncestriesRelations = relations(AncestriesTable, ({ many }) => ({
  ancestriesTags: many(AncestriesTagsTable),
}));

export const AncestriesToTagsRelations = relations(
  AncestriesTagsTable,
  ({ one }) => ({
    tag: one(TagsTable, {
      fields: [AncestriesTagsTable.tagId],
      references: [TagsTable.id],
    }),
    ancestry: one(AncestriesTable, {
      fields: [AncestriesTagsTable.ancestryId],
      references: [AncestriesTable.id],
    }),
  })
);

export const HeritagesTable = pgTable('Heritages', {
  id: serial('Id').primaryKey(),
  title: varchar('Title', { length: 255 }).notNull(),
  slug: varchar('Slug', { length: 255 }).unique().notNull(),
  text: text('Text'),
});

export const HeritagesTagsTable = pgTable(
  'HeritagesTags',
  {
    heritageId: integer('HeritageId')
      .references(() => HeritagesTable.id)
      .notNull(),
    tagId: integer('TagId')
      .references(() => TagsTable.id)
      .notNull(),
  },
  (heritagesTags) => {
    return {
      pk: primaryKey({
        columns: [heritagesTags.heritageId, heritagesTags.tagId],
      }),
    };
  }
);

export const HeritagesRelations = relations(HeritagesTable, ({ many }) => ({
  heritagesTags: many(HeritagesTagsTable),
}));

export const HeritagesToTagsRelations = relations(
  HeritagesTagsTable,
  ({ one }) => ({
    tag: one(TagsTable, {
      fields: [HeritagesTagsTable.tagId],
      references: [TagsTable.id],
    }),
    ancestry: one(HeritagesTable, {
      fields: [HeritagesTagsTable.heritageId],
      references: [HeritagesTable.id],
    }),
  })
);

export const FeatsTable = pgTable('Feats', {
  id: serial('Id').primaryKey(),
  title: varchar('Title', { length: 255 }).notNull(),
  slug: varchar('Slug', { length: 255 }).unique().notNull(),
  text: text('Text'),
});

export const FeatsTagsTable = pgTable(
  'FeatsTags',
  {
    featId: integer('FeatId')
      .references(() => FeatsTable.id)
      .notNull(),
    tagId: integer('TagId')
      .references(() => TagsTable.id)
      .notNull(),
  },
  (featsTags) => {
    return {
      pk: primaryKey({ columns: [featsTags.featId, featsTags.tagId] }),
    };
  }
);

export const FeatsRelations = relations(FeatsTable, ({ many }) => ({
  FeatsTagsTable: many(FeatsTagsTable),
}));

export const FeatsToTagsRelations = relations(FeatsTagsTable, ({ one }) => ({
  tag: one(TagsTable, {
    fields: [FeatsTagsTable.tagId],
    references: [TagsTable.id],
  }),
  ancestry: one(FeatsTable, {
    fields: [FeatsTagsTable.featId],
    references: [FeatsTable.id],
  }),
}));

export const GeneralSettingsTable = pgTable('GeneralSettings', {
  id: serial('Id').primaryKey(),
  key: varchar('Key', { length: 255 }).unique().notNull(),
  value: text('Value'),
});
