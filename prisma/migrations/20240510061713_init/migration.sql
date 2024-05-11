/*
  Warnings:

  - You are about to drop the column `field` on the `UserEducation` table. All the data in the column will be lost.
  - Added the required column `cgpa` to the `UserEducation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `UserEducation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `present` to the `UserEducation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `present` to the `UserWork` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserEducation" DROP COLUMN "field",
ADD COLUMN     "cgpa" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "present" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "UserWork" ADD COLUMN     "present" BOOLEAN NOT NULL;
