import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('en', 'he', 'ru');
  CREATE TYPE "public"."enum_pages_blocks_hero_buttons_style" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."enum_pages_blocks_legislative_list_categories_type" AS ENUM('standard', 'blocked');
  CREATE TYPE "public"."enum_site_settings_social_links_platform" AS ENUM('Facebook', 'Twitter', 'Instagram', 'LinkedIn', 'YouTube');
  CREATE TABLE "pages_blocks_hero_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"style" "enum_pages_blocks_hero_buttons_style" DEFAULT 'primary'
  );
  
  CREATE TABLE "pages_blocks_hero_buttons_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_hero_locales" (
  	"badge" varchar,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_news_articles" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"link" varchar
  );
  
  CREATE TABLE "pages_blocks_news_articles_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"category" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_news" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"view_all_link" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_news_locales" (
  	"title" varchar,
  	"view_all_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_legislative_list_categories_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_legislative_list_categories_items_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_legislative_list_categories" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"type" "enum_pages_blocks_legislative_list_categories_type"
  );
  
  CREATE TABLE "pages_blocks_legislative_list_categories_locales" (
  	"name" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_legislative_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_legislative_list_locales" (
  	"badge" varchar,
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_mission_section_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_mission_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"link" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_mission_section_locales" (
  	"mission_tag" varchar,
  	"title" varchar NOT NULL,
  	"icon" varchar,
  	"quote" varchar,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_team_grid_members" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"photo_id" integer,
  	"link" varchar
  );
  
  CREATE TABLE "pages_blocks_team_grid_members_locales" (
  	"name" varchar NOT NULL,
  	"role" varchar,
  	"bio" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_team_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_team_grid_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_values_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"background_image_id" integer
  );
  
  CREATE TABLE "pages_blocks_values" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_values_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_newsletter" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_newsletter_locales" (
  	"badge" varchar,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"button_label" varchar,
  	"placeholder" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "pages_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "navigation_menu_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"link" varchar NOT NULL
  );
  
  CREATE TABLE "navigation_footer_menus_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"link" varchar NOT NULL
  );
  
  CREATE TABLE "navigation_footer_menus" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL
  );
  
  CREATE TABLE "navigation" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site_settings_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_site_settings_social_links_platform",
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site_settings_locales" (
  	"logo_text" varchar,
  	"official_portal" varchar,
  	"footer_text" varchar,
  	"copyright_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "pages_id" integer;
  ALTER TABLE "pages_blocks_hero_buttons" ADD CONSTRAINT "pages_blocks_hero_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_buttons_locales" ADD CONSTRAINT "pages_blocks_hero_buttons_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero_buttons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_locales" ADD CONSTRAINT "pages_blocks_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_news_articles" ADD CONSTRAINT "pages_blocks_news_articles_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_news_articles" ADD CONSTRAINT "pages_blocks_news_articles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_news_articles_locales" ADD CONSTRAINT "pages_blocks_news_articles_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_news_articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_news" ADD CONSTRAINT "pages_blocks_news_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_news_locales" ADD CONSTRAINT "pages_blocks_news_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_legislative_list_categories_items" ADD CONSTRAINT "pages_blocks_legislative_list_categories_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_legislative_list_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_legislative_list_categories_items_locales" ADD CONSTRAINT "pages_blocks_legislative_list_categories_items_locales_pa_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_legislative_list_categories_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_legislative_list_categories" ADD CONSTRAINT "pages_blocks_legislative_list_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_legislative_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_legislative_list_categories_locales" ADD CONSTRAINT "pages_blocks_legislative_list_categories_locales_parent_i_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_legislative_list_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_legislative_list" ADD CONSTRAINT "pages_blocks_legislative_list_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_legislative_list" ADD CONSTRAINT "pages_blocks_legislative_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_legislative_list_locales" ADD CONSTRAINT "pages_blocks_legislative_list_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_legislative_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_mission_section_points" ADD CONSTRAINT "pages_blocks_mission_section_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_mission_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_mission_section" ADD CONSTRAINT "pages_blocks_mission_section_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_mission_section" ADD CONSTRAINT "pages_blocks_mission_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_mission_section_locales" ADD CONSTRAINT "pages_blocks_mission_section_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_mission_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_team_grid_members" ADD CONSTRAINT "pages_blocks_team_grid_members_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_team_grid_members" ADD CONSTRAINT "pages_blocks_team_grid_members_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_team_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_team_grid_members_locales" ADD CONSTRAINT "pages_blocks_team_grid_members_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_team_grid_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_team_grid" ADD CONSTRAINT "pages_blocks_team_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_team_grid_locales" ADD CONSTRAINT "pages_blocks_team_grid_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_team_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_values_columns" ADD CONSTRAINT "pages_blocks_values_columns_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_values_columns" ADD CONSTRAINT "pages_blocks_values_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_values"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_values" ADD CONSTRAINT "pages_blocks_values_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_values_locales" ADD CONSTRAINT "pages_blocks_values_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_values"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_newsletter" ADD CONSTRAINT "pages_blocks_newsletter_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_newsletter_locales" ADD CONSTRAINT "pages_blocks_newsletter_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_newsletter"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_menu_items" ADD CONSTRAINT "navigation_menu_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_footer_menus_links" ADD CONSTRAINT "navigation_footer_menus_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation_footer_menus"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_footer_menus" ADD CONSTRAINT "navigation_footer_menus_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_social_links" ADD CONSTRAINT "site_settings_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_locales" ADD CONSTRAINT "site_settings_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_hero_buttons_order_idx" ON "pages_blocks_hero_buttons" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_buttons_parent_id_idx" ON "pages_blocks_hero_buttons" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_hero_buttons_locales_locale_parent_id_unique" ON "pages_blocks_hero_buttons_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_hero_order_idx" ON "pages_blocks_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_parent_id_idx" ON "pages_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_path_idx" ON "pages_blocks_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_hero_background_image_idx" ON "pages_blocks_hero" USING btree ("background_image_id");
  CREATE UNIQUE INDEX "pages_blocks_hero_locales_locale_parent_id_unique" ON "pages_blocks_hero_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_news_articles_order_idx" ON "pages_blocks_news_articles" USING btree ("_order");
  CREATE INDEX "pages_blocks_news_articles_parent_id_idx" ON "pages_blocks_news_articles" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_news_articles_image_idx" ON "pages_blocks_news_articles" USING btree ("image_id");
  CREATE UNIQUE INDEX "pages_blocks_news_articles_locales_locale_parent_id_unique" ON "pages_blocks_news_articles_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_news_order_idx" ON "pages_blocks_news" USING btree ("_order");
  CREATE INDEX "pages_blocks_news_parent_id_idx" ON "pages_blocks_news" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_news_path_idx" ON "pages_blocks_news" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_news_locales_locale_parent_id_unique" ON "pages_blocks_news_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_legislative_list_categories_items_order_idx" ON "pages_blocks_legislative_list_categories_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_legislative_list_categories_items_parent_id_idx" ON "pages_blocks_legislative_list_categories_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_legislative_list_categories_items_locales_local" ON "pages_blocks_legislative_list_categories_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_legislative_list_categories_order_idx" ON "pages_blocks_legislative_list_categories" USING btree ("_order");
  CREATE INDEX "pages_blocks_legislative_list_categories_parent_id_idx" ON "pages_blocks_legislative_list_categories" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_legislative_list_categories_locales_locale_pare" ON "pages_blocks_legislative_list_categories_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_legislative_list_order_idx" ON "pages_blocks_legislative_list" USING btree ("_order");
  CREATE INDEX "pages_blocks_legislative_list_parent_id_idx" ON "pages_blocks_legislative_list" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_legislative_list_path_idx" ON "pages_blocks_legislative_list" USING btree ("_path");
  CREATE INDEX "pages_blocks_legislative_list_image_idx" ON "pages_blocks_legislative_list" USING btree ("image_id");
  CREATE UNIQUE INDEX "pages_blocks_legislative_list_locales_locale_parent_id_uniqu" ON "pages_blocks_legislative_list_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_mission_section_points_order_idx" ON "pages_blocks_mission_section_points" USING btree ("_order");
  CREATE INDEX "pages_blocks_mission_section_points_parent_id_idx" ON "pages_blocks_mission_section_points" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_mission_section_points_locale_idx" ON "pages_blocks_mission_section_points" USING btree ("_locale");
  CREATE INDEX "pages_blocks_mission_section_order_idx" ON "pages_blocks_mission_section" USING btree ("_order");
  CREATE INDEX "pages_blocks_mission_section_parent_id_idx" ON "pages_blocks_mission_section" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_mission_section_path_idx" ON "pages_blocks_mission_section" USING btree ("_path");
  CREATE INDEX "pages_blocks_mission_section_image_idx" ON "pages_blocks_mission_section" USING btree ("image_id");
  CREATE UNIQUE INDEX "pages_blocks_mission_section_locales_locale_parent_id_unique" ON "pages_blocks_mission_section_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_team_grid_members_order_idx" ON "pages_blocks_team_grid_members" USING btree ("_order");
  CREATE INDEX "pages_blocks_team_grid_members_parent_id_idx" ON "pages_blocks_team_grid_members" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_team_grid_members_photo_idx" ON "pages_blocks_team_grid_members" USING btree ("photo_id");
  CREATE UNIQUE INDEX "pages_blocks_team_grid_members_locales_locale_parent_id_uniq" ON "pages_blocks_team_grid_members_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_team_grid_order_idx" ON "pages_blocks_team_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_team_grid_parent_id_idx" ON "pages_blocks_team_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_team_grid_path_idx" ON "pages_blocks_team_grid" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_team_grid_locales_locale_parent_id_unique" ON "pages_blocks_team_grid_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_values_columns_order_idx" ON "pages_blocks_values_columns" USING btree ("_order");
  CREATE INDEX "pages_blocks_values_columns_parent_id_idx" ON "pages_blocks_values_columns" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_values_columns_locale_idx" ON "pages_blocks_values_columns" USING btree ("_locale");
  CREATE INDEX "pages_blocks_values_columns_background_image_idx" ON "pages_blocks_values_columns" USING btree ("background_image_id");
  CREATE INDEX "pages_blocks_values_order_idx" ON "pages_blocks_values" USING btree ("_order");
  CREATE INDEX "pages_blocks_values_parent_id_idx" ON "pages_blocks_values" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_values_path_idx" ON "pages_blocks_values" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_values_locales_locale_parent_id_unique" ON "pages_blocks_values_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_newsletter_order_idx" ON "pages_blocks_newsletter" USING btree ("_order");
  CREATE INDEX "pages_blocks_newsletter_parent_id_idx" ON "pages_blocks_newsletter" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_newsletter_path_idx" ON "pages_blocks_newsletter" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_newsletter_locales_locale_parent_id_unique" ON "pages_blocks_newsletter_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE UNIQUE INDEX "pages_locales_locale_parent_id_unique" ON "pages_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "navigation_menu_items_order_idx" ON "navigation_menu_items" USING btree ("_order");
  CREATE INDEX "navigation_menu_items_parent_id_idx" ON "navigation_menu_items" USING btree ("_parent_id");
  CREATE INDEX "navigation_menu_items_locale_idx" ON "navigation_menu_items" USING btree ("_locale");
  CREATE INDEX "navigation_footer_menus_links_order_idx" ON "navigation_footer_menus_links" USING btree ("_order");
  CREATE INDEX "navigation_footer_menus_links_parent_id_idx" ON "navigation_footer_menus_links" USING btree ("_parent_id");
  CREATE INDEX "navigation_footer_menus_links_locale_idx" ON "navigation_footer_menus_links" USING btree ("_locale");
  CREATE INDEX "navigation_footer_menus_order_idx" ON "navigation_footer_menus" USING btree ("_order");
  CREATE INDEX "navigation_footer_menus_parent_id_idx" ON "navigation_footer_menus" USING btree ("_parent_id");
  CREATE INDEX "navigation_footer_menus_locale_idx" ON "navigation_footer_menus" USING btree ("_locale");
  CREATE INDEX "site_settings_social_links_order_idx" ON "site_settings_social_links" USING btree ("_order");
  CREATE INDEX "site_settings_social_links_parent_id_idx" ON "site_settings_social_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "site_settings_locales_locale_parent_id_unique" ON "site_settings_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_hero_buttons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_hero_buttons_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_hero_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_news_articles" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_news_articles_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_news" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_news_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_legislative_list_categories_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_legislative_list_categories_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_legislative_list_categories" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_legislative_list_categories_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_legislative_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_legislative_list_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_mission_section_points" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_mission_section" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_mission_section_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_team_grid_members" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_team_grid_members_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_team_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_team_grid_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_values_columns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_values" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_values_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_newsletter" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_newsletter_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "navigation_menu_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "navigation_footer_menus_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "navigation_footer_menus" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "navigation" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_settings_social_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_settings" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_settings_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_hero_buttons" CASCADE;
  DROP TABLE "pages_blocks_hero_buttons_locales" CASCADE;
  DROP TABLE "pages_blocks_hero" CASCADE;
  DROP TABLE "pages_blocks_hero_locales" CASCADE;
  DROP TABLE "pages_blocks_news_articles" CASCADE;
  DROP TABLE "pages_blocks_news_articles_locales" CASCADE;
  DROP TABLE "pages_blocks_news" CASCADE;
  DROP TABLE "pages_blocks_news_locales" CASCADE;
  DROP TABLE "pages_blocks_legislative_list_categories_items" CASCADE;
  DROP TABLE "pages_blocks_legislative_list_categories_items_locales" CASCADE;
  DROP TABLE "pages_blocks_legislative_list_categories" CASCADE;
  DROP TABLE "pages_blocks_legislative_list_categories_locales" CASCADE;
  DROP TABLE "pages_blocks_legislative_list" CASCADE;
  DROP TABLE "pages_blocks_legislative_list_locales" CASCADE;
  DROP TABLE "pages_blocks_mission_section_points" CASCADE;
  DROP TABLE "pages_blocks_mission_section" CASCADE;
  DROP TABLE "pages_blocks_mission_section_locales" CASCADE;
  DROP TABLE "pages_blocks_team_grid_members" CASCADE;
  DROP TABLE "pages_blocks_team_grid_members_locales" CASCADE;
  DROP TABLE "pages_blocks_team_grid" CASCADE;
  DROP TABLE "pages_blocks_team_grid_locales" CASCADE;
  DROP TABLE "pages_blocks_values_columns" CASCADE;
  DROP TABLE "pages_blocks_values" CASCADE;
  DROP TABLE "pages_blocks_values_locales" CASCADE;
  DROP TABLE "pages_blocks_newsletter" CASCADE;
  DROP TABLE "pages_blocks_newsletter_locales" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_locales" CASCADE;
  DROP TABLE "navigation_menu_items" CASCADE;
  DROP TABLE "navigation_footer_menus_links" CASCADE;
  DROP TABLE "navigation_footer_menus" CASCADE;
  DROP TABLE "navigation" CASCADE;
  DROP TABLE "site_settings_social_links" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "site_settings_locales" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_pages_fk";
  
  DROP INDEX "payload_locked_documents_rels_pages_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "pages_id";
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum_pages_blocks_hero_buttons_style";
  DROP TYPE "public"."enum_pages_blocks_legislative_list_categories_type";
  DROP TYPE "public"."enum_site_settings_social_links_platform";`)
}
