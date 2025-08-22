/*
  Warnings:

  - You are about to drop the column `allergenes` on the `Product` table. All the data in the column will be lost.
  - The `qualities` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "allergenes",
ADD COLUMN     "allegens" TEXT[],
DROP COLUMN "qualities",
ADD COLUMN     "qualities" TEXT[];
