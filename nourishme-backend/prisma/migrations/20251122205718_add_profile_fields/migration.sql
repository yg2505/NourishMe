-- AlterTable
ALTER TABLE `User` ADD COLUMN `activityLevel` VARCHAR(191) NULL,
    ADD COLUMN `age` INTEGER NULL,
    ADD COLUMN `allergies` JSON NULL,
    ADD COLUMN `gender` VARCHAR(191) NULL,
    ADD COLUMN `goal` VARCHAR(191) NULL,
    ADD COLUMN `profileCompleted` BOOLEAN NOT NULL DEFAULT false;
