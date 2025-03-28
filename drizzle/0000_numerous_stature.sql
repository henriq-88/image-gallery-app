CREATE TABLE `image-management-compression_image` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text(256) NOT NULL,
	`path` text(256) NOT NULL,
	`createdAt` integer DEFAULT (unixepoch()) NOT NULL,
	`updatedAt` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `image-management-compression_image_path_unique` ON `image-management-compression_image` (`path`);--> statement-breakpoint
CREATE INDEX `name_idx` ON `image-management-compression_image` (`name`);