/*
  Warnings:

  - The primary key for the `Investment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userId` on the `Investment` table. All the data in the column will be lost.
  - The `id` column on the `Investment` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `username` to the `Investment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Investment" DROP CONSTRAINT "Investment_userId_fkey";

-- AlterTable
ALTER TABLE "Investment" DROP CONSTRAINT "Investment_pkey",
DROP COLUMN "userId",
ADD COLUMN     "username" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Investment_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "VmsTotal" (
    "id" SERIAL NOT NULL,
    "investmentId" INTEGER NOT NULL,
    "startupId" INTEGER NOT NULL,
    "vmsTotalInvestment" BIGINT NOT NULL,

    CONSTRAINT "VmsTotal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VmsTotal_investmentId_key" ON "VmsTotal"("investmentId");

-- AddForeignKey
ALTER TABLE "VmsTotal" ADD CONSTRAINT "VmsTotal_investmentId_fkey" FOREIGN KEY ("investmentId") REFERENCES "Investment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VmsTotal" ADD CONSTRAINT "VmsTotal_startupId_fkey" FOREIGN KEY ("startupId") REFERENCES "Startup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
