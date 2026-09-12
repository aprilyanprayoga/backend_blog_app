CREATE TABLE `categories` (
	`id` int AUTO_INCREMENT PRIMARY KEY,
	`name` varchar(100) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `name_unique` UNIQUE INDEX(`name`)
);
--> statement-breakpoint
CREATE TABLE `posts` (
	`id` int AUTO_INCREMENT PRIMARY KEY,
	`category_id` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`slug` varchar(255),
	`content` text NOT NULL,
	`thumbnail` text,
	`thumbnail_public_id` text,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `slug_unique` UNIQUE INDEX(`slug`)
);
--> statement-breakpoint
ALTER TABLE `posts` ADD CONSTRAINT `posts_category_id_categories_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`);