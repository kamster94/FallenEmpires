CREATE TABLE IF NOT EXISTS "GeneralSettings" (
	"Id" serial PRIMARY KEY NOT NULL,
	"Key" varchar(255) NOT NULL,
	"Value" text,
	CONSTRAINT "GeneralSettings_Key_unique" UNIQUE("Key")
);
