/*
  Warnings:

  - You are about to drop the column `orderId` on the `Payment` table. All the data in the column will be lost.
  - Made the column `paymentId` on table `Order` required. This step will fail if there are existing NULL values in that column.
  - Made the column `razorpayPaymentId` on table `Payment` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_orderId_fkey";

-- DropIndex
DROP INDEX "Payment_orderId_key";

-- DropIndex
DROP INDEX "Payment_razorpayOrderId_key";

-- DropIndex
DROP INDEX "Payment_razorpayPaymentId_key";

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "status" DROP DEFAULT,
ALTER COLUMN "paymentId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "orderId",
ALTER COLUMN "amount" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "status" DROP DEFAULT,
ALTER COLUMN "razorpayPaymentId" SET NOT NULL;
