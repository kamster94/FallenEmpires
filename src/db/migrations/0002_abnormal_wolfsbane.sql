CREATE TABLE IF NOT EXISTS "Backgrounds" (
	"Id" serial PRIMARY KEY NOT NULL,
	"Title" varchar(255) NOT NULL,
	"Slug" varchar(255) NOT NULL,
	"Text" text,
	CONSTRAINT "Backgrounds_Slug_unique" UNIQUE("Slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Languages" (
	"Id" serial PRIMARY KEY NOT NULL,
	"Title" varchar(255) NOT NULL,
	"Slug" varchar(255) NOT NULL,
	"Text" text,
	CONSTRAINT "Languages_Slug_unique" UNIQUE("Slug")
);
