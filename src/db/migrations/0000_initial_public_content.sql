CREATE TABLE `event_people` (
	`event_id` text NOT NULL,
	`person_id` text NOT NULL,
	`profile` text,
	`source_url` text,
	`official_speaker_order` integer,
	`display_order` integer DEFAULT 0 NOT NULL,
	PRIMARY KEY(`event_id`, `person_id`),
	FOREIGN KEY (`event_id`) REFERENCES `events`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`person_id`) REFERENCES `people`(`id`) ON UPDATE no action ON DELETE no action,
	CONSTRAINT "event_people_profile_json" CHECK("event_people"."profile" IS NULL OR json_valid("event_people"."profile")),
	CONSTRAINT "event_people_official_speaker_order" CHECK("event_people"."official_speaker_order" IS NULL OR "event_people"."official_speaker_order" >= 0)
);
--> statement-breakpoint
CREATE TABLE `event_person_roles` (
	`event_id` text NOT NULL,
	`person_id` text NOT NULL,
	`kind` text NOT NULL,
	`title` text,
	`listing_order` integer,
	`responsibilities` text,
	`track` text,
	`community` text,
	PRIMARY KEY(`event_id`, `person_id`, `kind`),
	FOREIGN KEY (`event_id`,`person_id`) REFERENCES `event_people`(`event_id`,`person_id`) ON UPDATE no action ON DELETE cascade,
	CONSTRAINT "event_person_roles_kind" CHECK("event_person_roles"."kind" IN ('speaker', 'core-team', 'volunteer', 'ambassador')),
	CONSTRAINT "event_person_roles_listing_order" CHECK("event_person_roles"."listing_order" IS NULL OR "event_person_roles"."listing_order" >= 1),
	CONSTRAINT "event_person_roles_title" CHECK("event_person_roles"."title" IS NULL OR trim("event_person_roles"."title") <> ''),
	CONSTRAINT "event_person_roles_responsibilities" CHECK(("event_person_roles"."kind" IN ('core-team', 'volunteer')) = ("event_person_roles"."responsibilities" IS NOT NULL) AND ("event_person_roles"."responsibilities" IS NULL OR (json_valid("event_person_roles"."responsibilities") AND json_type("event_person_roles"."responsibilities") = 'array' AND json_array_length("event_person_roles"."responsibilities") > 0))),
	CONSTRAINT "event_person_roles_ambassador" CHECK(("event_person_roles"."kind" = 'ambassador') = ("event_person_roles"."track" IS NOT NULL) AND ("event_person_roles"."kind" = 'ambassador') = ("event_person_roles"."community" IS NOT NULL) AND ("event_person_roles"."track" IS NULL OR "event_person_roles"."track" IN ('student', 'professional')) AND ("event_person_roles"."community" IS NULL OR trim("event_person_roles"."community") <> ''))
);
--> statement-breakpoint
CREATE TABLE `events` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`kind` text DEFAULT 'conference' NOT NULL,
	`series` text,
	`attendance_mode` text DEFAULT 'in-person' NOT NULL,
	`parent_event_id` text,
	`starts_at` text,
	`start_date` text,
	`timezone` text,
	`venue` text NOT NULL,
	`organizer` text,
	`tagline` text,
	`sub_tagline` text,
	`contact_email` text,
	`summary` text,
	`theme` text,
	`links` text,
	`source_url` text,
	`recording_url` text,
	`reported_stats` text,
	`cover_media_id` text,
	`registration_policies` text,
	`registration_checklist` text,
	`registration_declaration` text,
	`booking_url` text,
	`booking_widget_url` text,
	`booking_enabled` integer DEFAULT false NOT NULL,
	`legacy_workshop_id` text,
	`display_order` integer DEFAULT 0 NOT NULL,
	FOREIGN KEY (`parent_event_id`) REFERENCES `events`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`cover_media_id`) REFERENCES `media`(`id`) ON UPDATE no action ON DELETE no action,
	CONSTRAINT "events_kind" CHECK("events"."kind" IN ('conference', 'campus-workshop')),
	CONSTRAINT "events_attendance_mode" CHECK("events"."attendance_mode" IN ('in-person', 'online')),
	CONSTRAINT "events_one_start" CHECK(("events"."starts_at" IS NULL) <> ("events"."start_date" IS NULL)),
	CONSTRAINT "events_start_date_format" CHECK("events"."start_date" IS NULL OR "events"."start_date" GLOB '[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]'),
	CONSTRAINT "events_starts_at_format" CHECK("events"."starts_at" IS NULL OR "events"."starts_at" GLOB '[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]T[0-2][0-9]:[0-5][0-9]:[0-5][0-9]*'),
	CONSTRAINT "events_not_own_parent" CHECK("events"."parent_event_id" IS NULL OR "events"."parent_event_id" <> "events"."id"),
	CONSTRAINT "venue_json" CHECK("events"."venue" IS NULL OR json_valid("events"."venue")),
	CONSTRAINT "links_json" CHECK("events"."links" IS NULL OR json_valid("events"."links")),
	CONSTRAINT "reported_stats_json" CHECK("events"."reported_stats" IS NULL OR json_valid("events"."reported_stats")),
	CONSTRAINT "registration_policies_json" CHECK("events"."registration_policies" IS NULL OR json_valid("events"."registration_policies")),
	CONSTRAINT "registration_checklist_json" CHECK("events"."registration_checklist" IS NULL OR json_valid("events"."registration_checklist"))
);
--> statement-breakpoint
CREATE UNIQUE INDEX `events_legacy_workshop_id_unique` ON `events` (`legacy_workshop_id`);--> statement-breakpoint
CREATE TABLE `media` (
	`id` text PRIMARY KEY NOT NULL,
	`kind` text NOT NULL,
	`event_id` text,
	`session_id` text,
	`title` text NOT NULL,
	`path` text NOT NULL,
	`caption` text,
	`category` text,
	`width` integer,
	`height` integer,
	`publication` text,
	`published_date` text,
	`source_url` text,
	`show_in_gallery` integer DEFAULT false NOT NULL,
	`display_order` integer DEFAULT 0 NOT NULL,
	FOREIGN KEY (`event_id`) REFERENCES `events`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`session_id`) REFERENCES `sessions`(`id`) ON UPDATE no action ON DELETE no action,
	CONSTRAINT "media_kind" CHECK("media"."kind" IN ('photo', 'press')),
	CONSTRAINT "media_width" CHECK("media"."width" IS NULL OR "media"."width" > 0),
	CONSTRAINT "media_height" CHECK("media"."height" IS NULL OR "media"."height" > 0)
);
--> statement-breakpoint
CREATE TABLE `organizations` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`kind` text DEFAULT 'organization' NOT NULL,
	`description` text,
	`logo_path` text,
	`logo_shape` text,
	`logo_crop` text,
	`website_url` text,
	`social_url` text,
	`display_order` integer DEFAULT 0 NOT NULL,
	CONSTRAINT "organizations_logo_crop_json" CHECK("organizations"."logo_crop" IS NULL OR json_valid("organizations"."logo_crop"))
);
--> statement-breakpoint
CREATE TABLE `partnerships` (
	`id` text PRIMARY KEY NOT NULL,
	`organization_id` text NOT NULL,
	`event_id` text,
	`scope` text NOT NULL,
	`contribution_type` text NOT NULL,
	`title` text NOT NULL,
	`is_published` integer DEFAULT true NOT NULL,
	`featured` text,
	`source_url` text,
	`display_order` integer,
	`record_order` integer DEFAULT 0 NOT NULL,
	FOREIGN KEY (`organization_id`) REFERENCES `organizations`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`event_id`) REFERENCES `events`(`id`) ON UPDATE no action ON DELETE no action,
	CONSTRAINT "partnership_scope" CHECK(("partnerships"."scope" = 'event' AND "partnerships"."event_id" IS NOT NULL) OR ("partnerships"."scope" IN ('historical', 'ecosystem') AND "partnerships"."event_id" IS NULL)),
	CONSTRAINT "partnership_featured" CHECK("partnerships"."featured" IS NULL OR "partnerships"."featured" IN ('campus', 'space', 'technology')),
	CONSTRAINT "partnership_type" CHECK("partnerships"."contribution_type" IN ('sponsor', 'collaborator', 'community', 'media'))
);
--> statement-breakpoint
CREATE TABLE `pass_inclusion_sets` (
	`id` text PRIMARY KEY NOT NULL,
	`event_id` text NOT NULL,
	`name` text NOT NULL,
	`benefits` text NOT NULL,
	FOREIGN KEY (`event_id`) REFERENCES `events`(`id`) ON UPDATE no action ON DELETE no action,
	CONSTRAINT "pass_benefits_json" CHECK(json_valid("pass_inclusion_sets"."benefits") AND json_type("pass_inclusion_sets"."benefits") = 'array')
);
--> statement-breakpoint
CREATE UNIQUE INDEX `pass_inclusion_sets_id_event_id_unique` ON `pass_inclusion_sets` (`id`,`event_id`);--> statement-breakpoint
CREATE TABLE `passes` (
	`event_id` text NOT NULL,
	`code` text NOT NULL,
	`name` text NOT NULL,
	`audience` text NOT NULL,
	`summary` text NOT NULL,
	`description` text NOT NULL,
	`price_minor` integer,
	`currency_code` text DEFAULT 'INR' NOT NULL,
	`allocation` integer NOT NULL,
	`eligibility` text NOT NULL,
	`inclusion_set_id` text NOT NULL,
	`offers` text,
	`booking_route` text,
	`note` text,
	`is_published` integer DEFAULT false NOT NULL,
	`is_sold_out` integer DEFAULT false NOT NULL,
	`display_order` integer DEFAULT 0 NOT NULL,
	PRIMARY KEY(`event_id`, `code`),
	FOREIGN KEY (`event_id`) REFERENCES `events`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`inclusion_set_id`,`event_id`) REFERENCES `pass_inclusion_sets`(`id`,`event_id`) ON UPDATE no action ON DELETE no action,
	CONSTRAINT "pass_price" CHECK("passes"."price_minor" IS NULL OR ("passes"."price_minor" >= 0 AND typeof("passes"."price_minor") = 'integer')),
	CONSTRAINT "pass_allocation" CHECK("passes"."allocation" >= 0),
	CONSTRAINT "pass_currency" CHECK("passes"."currency_code" = 'INR'),
	CONSTRAINT "pass_booking_route" CHECK("passes"."booking_route" IS NULL OR "passes"."booking_route" IN ('konfhub', 'ambassador')),
	CONSTRAINT "pass_eligibility_json" CHECK(json_valid("passes"."eligibility") AND json_type("passes"."eligibility") = 'array'),
	CONSTRAINT "pass_offers_json" CHECK("passes"."offers" IS NULL OR json_valid("passes"."offers"))
);
--> statement-breakpoint
CREATE TABLE `people` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`job_title` text,
	`company` text,
	`bio` text,
	`photo_path` text,
	`links` text,
	`display_order` integer DEFAULT 0 NOT NULL,
	CONSTRAINT "people_links_json" CHECK("people"."links" IS NULL OR json_valid("people"."links"))
);
--> statement-breakpoint
CREATE TABLE `rooms` (
	`id` text PRIMARY KEY NOT NULL,
	`event_id` text NOT NULL,
	`name` text NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`numbered` integer DEFAULT false NOT NULL,
	`display_order` integer DEFAULT 0 NOT NULL,
	FOREIGN KEY (`event_id`) REFERENCES `events`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `rooms_event_id_name_unique` ON `rooms` (`event_id`,`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `rooms_id_event_id_unique` ON `rooms` (`id`,`event_id`);--> statement-breakpoint
CREATE TABLE `session_organizations` (
	`session_id` text NOT NULL,
	`organization_id` text NOT NULL,
	`display_order` integer DEFAULT 0 NOT NULL,
	PRIMARY KEY(`session_id`, `organization_id`),
	FOREIGN KEY (`session_id`) REFERENCES `sessions`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`organization_id`) REFERENCES `organizations`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `session_people` (
	`session_id` text NOT NULL,
	`person_id` text NOT NULL,
	`profile` text,
	`display_order` integer DEFAULT 0 NOT NULL,
	PRIMARY KEY(`session_id`, `person_id`),
	FOREIGN KEY (`session_id`) REFERENCES `sessions`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`person_id`) REFERENCES `people`(`id`) ON UPDATE no action ON DELETE no action,
	CONSTRAINT "session_people_profile_json" CHECK("session_people"."profile" IS NULL OR json_valid("session_people"."profile"))
);
--> statement-breakpoint
CREATE TABLE `sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`event_id` text NOT NULL,
	`format` text NOT NULL,
	`title` text,
	`description` text,
	`room_id` text,
	`start_time` text,
	`duration_minutes` integer,
	`running_order` integer,
	`category` text,
	`track` text,
	`level` text,
	`tags` text,
	`resources` text,
	`spotlight_badge` text,
	`promotion` text,
	`source_url` text,
	`display_order` integer DEFAULT 0 NOT NULL,
	FOREIGN KEY (`event_id`) REFERENCES `events`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`room_id`,`event_id`) REFERENCES `rooms`(`id`,`event_id`) ON UPDATE no action ON DELETE no action,
	CONSTRAINT "session_format" CHECK("sessions"."format" IN ('talk', 'keynote', 'panel', 'workshop', 'exhibit', 'address')),
	CONSTRAINT "session_duration" CHECK("sessions"."duration_minutes" IS NULL OR "sessions"."duration_minutes" > 0),
	CONSTRAINT "session_start_time" CHECK("sessions"."start_time" IS NULL OR "sessions"."start_time" GLOB '[01][0-9]:[0-5][0-9]' OR "sessions"."start_time" GLOB '2[0-3]:[0-5][0-9]'),
	CONSTRAINT "session_title_not_blank" CHECK("sessions"."title" IS NULL OR trim("sessions"."title") <> ''),
	CONSTRAINT "session_description_not_blank" CHECK("sessions"."description" IS NULL OR trim("sessions"."description") <> ''),
	CONSTRAINT "session_category_not_blank" CHECK("sessions"."category" IS NULL OR trim("sessions"."category") <> ''),
	CONSTRAINT "session_track_not_blank" CHECK("sessions"."track" IS NULL OR trim("sessions"."track") <> ''),
	CONSTRAINT "session_level_not_blank" CHECK("sessions"."level" IS NULL OR trim("sessions"."level") <> ''),
	CONSTRAINT "session_spotlight_badge_not_blank" CHECK("sessions"."spotlight_badge" IS NULL OR trim("sessions"."spotlight_badge") <> ''),
	CONSTRAINT "session_tags_json" CHECK("sessions"."tags" IS NULL OR json_valid("sessions"."tags")),
	CONSTRAINT "session_resources_json" CHECK("sessions"."resources" IS NULL OR json_valid("sessions"."resources")),
	CONSTRAINT "session_promotion_json" CHECK("sessions"."promotion" IS NULL OR json_valid("sessions"."promotion"))
);
