/*
  Warnings:

  - You are about to drop the column `imageBytes` on the `photo` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `photo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `photo` DROP COLUMN `imageBytes`,
    DROP COLUMN `imageUrl`,
    ADD COLUMN `image` VARCHAR(191) NULL;
