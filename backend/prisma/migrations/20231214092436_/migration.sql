/*
  Warnings:

  - You are about to drop the column `image` on the `photo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `photo` DROP COLUMN `image`,
    ADD COLUMN `imageBytes` LONGBLOB NULL,
    ADD COLUMN `imageUrl` VARCHAR(191) NULL,
    MODIFY `description` VARCHAR(191) NULL;
