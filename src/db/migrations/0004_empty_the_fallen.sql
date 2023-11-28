CREATE TABLE IF NOT EXISTS "Cultures" (
	"Id" serial PRIMARY KEY NOT NULL,
	"Name" varchar(255) NOT NULL,
	"Slug" varchar(255) NOT NULL,
	"Description" text,
	CONSTRAINT "Cultures_Slug_unique" UNIQUE("Slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Locations" (
	"Id" serial PRIMARY KEY NOT NULL,
	"Name" varchar(255) NOT NULL,
	"Slug" varchar(255) NOT NULL,
	"Description" text,
	CONSTRAINT "Locations_Slug_unique" UNIQUE("Slug")
);
