/*
  Warnings:

  - The primary key for the `Investment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `password` on the `Investment` table. All the data in the column will be lost.
  - You are about to drop the column `startupId` on the `Investment` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `Investment` table. All the data in the column will be lost.
  - You are about to drop the `Startup` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `companyId` to the `Investment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `encryptedPassword` to the `Investment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `investorName` to the `Investment` table without a default value. This is not possible if the table is not empty.
  - Made the column `comment` on table `Investment` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Investment" DROP CONSTRAINT "Investment_startupId_fkey";

-- AlterTable
ALTER TABLE "Investment" DROP CONSTRAINT "Investment_pkey",
DROP COLUMN "password",
DROP COLUMN "startupId",
DROP COLUMN "username",
ADD COLUMN     "companyId" TEXT NOT NULL,
ADD COLUMN     "encryptedPassword" TEXT NOT NULL,
ADD COLUMN     "investorName" TEXT NOT NULL,
ALTER COLUMN "comment" SET NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Investment_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Investment_id_seq";

-- DropTable
DROP TABLE "Startup";

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "realInvestmentAmount" DOUBLE PRECISION NOT NULL,
    "revenue" DOUBLE PRECISION NOT NULL,
    "numberOfEmployees" INTEGER NOT NULL,
    "pickAsMyStartupCount" INTEGER NOT NULL DEFAULT 0,
    "pickAsComparisonCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Investment" ADD CONSTRAINT "Investment_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
