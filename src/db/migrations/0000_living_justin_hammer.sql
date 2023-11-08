CREATE TABLE IF NOT EXISTS "Ancestries" (
	"Id" serial PRIMARY KEY NOT NULL,
	"Title" varchar(255) NOT NULL,
	"Slug" varchar(255) NOT NULL,
	"Text" text,
	CONSTRAINT "Ancestries_Slug_unique" UNIQUE("Slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "AncestriesTags" (
	"AncestryId" integer NOT NULL,
	"TagId" integer NOT NULL,
	CONSTRAINT AncestriesTags_AncestryId_TagId PRIMARY KEY("AncestryId","TagId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Campaigns" (
	"Id" serial PRIMARY KEY NOT NULL,
	"Name" varchar(255) NOT NULL,
	"Slug" varchar(255) NOT NULL,
	"Text" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Feats" (
	"Id" serial PRIMARY KEY NOT NULL,
	"Title" varchar(255) NOT NULL,
	"Slug" varchar(255) NOT NULL,
	"Text" text,
	CONSTRAINT "Feats_Slug_unique" UNIQUE("Slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "FeatsTags" (
	"FeatId" integer NOT NULL,
	"TagId" integer NOT NULL,
	CONSTRAINT FeatsTags_FeatId_TagId PRIMARY KEY("FeatId","TagId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Heritages" (
	"Id" serial PRIMARY KEY NOT NULL,
	"Title" varchar(255) NOT NULL,
	"Slug" varchar(255) NOT NULL,
	"Text" text,
	CONSTRAINT "Heritages_Slug_unique" UNIQUE("Slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "HeritagesTags" (
	"HeritageId" integer NOT NULL,
	"TagId" integer NOT NULL,
	CONSTRAINT HeritagesTags_HeritageId_TagId PRIMARY KEY("HeritageId","TagId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Posts" (
	"Id" serial PRIMARY KEY NOT NULL,
	"Title" varchar(255) NOT NULL,
	"Slug" varchar(255) NOT NULL,
	"Author" varchar(255) NOT NULL,
	"Date" timestamp DEFAULT now() NOT NULL,
	"Text" text,
	CONSTRAINT "Posts_Slug_unique" UNIQUE("Slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "RulePages" (
	"Id" serial PRIMARY KEY NOT NULL,
	"Title" varchar(255) NOT NULL,
	"Slug" varchar(255) NOT NULL,
	"Text" text,
	CONSTRAINT "RulePages_Slug_unique" UNIQUE("Slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "SettingPages" (
	"Id" serial PRIMARY KEY NOT NULL,
	"Title" varchar(255) NOT NULL,
	"Slug" varchar(255) NOT NULL,
	"Text" text,
	CONSTRAINT "SettingPages_Slug_unique" UNIQUE("Slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Tags" (
	"Id" serial PRIMARY KEY NOT NULL,
	"Label" varchar(255) NOT NULL,
	"Link" varchar(255)
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "Campaigns_unique_idx" ON "Campaigns" ("Slug");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "AncestriesTags" ADD CONSTRAINT "AncestriesTags_AncestryId_Ancestries_Id_fk" FOREIGN KEY ("AncestryId") REFERENCES "Ancestries"("Id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "AncestriesTags" ADD CONSTRAINT "AncestriesTags_TagId_Tags_Id_fk" FOREIGN KEY ("TagId") REFERENCES "Tags"("Id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "FeatsTags" ADD CONSTRAINT "FeatsTags_FeatId_Feats_Id_fk" FOREIGN KEY ("FeatId") REFERENCES "Feats"("Id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "FeatsTags" ADD CONSTRAINT "FeatsTags_TagId_Tags_Id_fk" FOREIGN KEY ("TagId") REFERENCES "Tags"("Id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "HeritagesTags" ADD CONSTRAINT "HeritagesTags_HeritageId_Heritages_Id_fk" FOREIGN KEY ("HeritageId") REFERENCES "Heritages"("Id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "HeritagesTags" ADD CONSTRAINT "HeritagesTags_TagId_Tags_Id_fk" FOREIGN KEY ("TagId") REFERENCES "Tags"("Id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
