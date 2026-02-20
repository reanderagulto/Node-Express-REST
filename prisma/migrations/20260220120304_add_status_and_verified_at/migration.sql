-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('PENDING', 'ACTIVE', 'SUSPENDED');

-- CreateEnum
CREATE TYPE "PostStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'TRASHED');

-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "status" "PostStatus" NOT NULL DEFAULT 'DRAFT';

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "status" "UserStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "verified_at" TIMESTAMP(3);
