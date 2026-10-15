ALTER TABLE "profile" ALTER COLUMN "resume_url" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "contact_messages" ADD COLUMN "ip_hash" text;--> statement-breakpoint
ALTER TABLE "profile" ADD COLUMN "avatar_url" text;--> statement-breakpoint
ALTER TABLE "profile" ADD COLUMN "experience_years" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "profile" ADD COLUMN "completed_projects" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
CREATE INDEX "contact_messages_ip_created_idx" ON "contact_messages" USING btree ("ip_hash","created_at");