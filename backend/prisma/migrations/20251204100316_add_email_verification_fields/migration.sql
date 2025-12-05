-- AlterTable
ALTER TABLE "User" ADD COLUMN     "tokenExpires" TIMESTAMP(3),
ADD COLUMN     "verificationToken" TEXT;
