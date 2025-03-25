/*
  Warnings:

  - You are about to drop the column `vmsTotalInvestment` on the `Startup` table. All the data in the column will be lost.
  - You are about to drop the `VmsTotal` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "VmsTotal" DROP CONSTRAINT "VmsTotal_investmentId_fkey";

-- DropForeignKey
ALTER TABLE "VmsTotal" DROP CONSTRAINT "VmsTotal_startupId_fkey";

-- AlterTable
ALTER TABLE "Startup" DROP COLUMN "vmsTotalInvestment";

-- DropTable
DROP TABLE "VmsTotal";
