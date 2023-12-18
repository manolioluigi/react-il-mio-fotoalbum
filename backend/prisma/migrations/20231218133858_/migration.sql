/*
  Warnings:

  - Made the column `image` on table `photo` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `photo` MODIFY `image` VARCHAR(191) NOT NULL;
