/*
  Warnings:

  - You are about to drop the column `Sell` on the `Crypto` table. All the data in the column will be lost.
  - Added the required column `sell` to the `Crypto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Crypto" DROP COLUMN "Sell",
ADD COLUMN     "sell" DOUBLE PRECISION NOT NULL;
