-- AlterTable
ALTER TABLE "UserWork" ALTER COLUMN "present" DROP NOT NULL,
ALTER COLUMN "present" SET DEFAULT false;
