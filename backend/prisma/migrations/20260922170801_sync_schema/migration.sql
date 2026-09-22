/*
  Warnings:

  - You are about to drop the column `location` on the `OrderItem` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[order_id,product_id]` on the table `OrderItem` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "Payment_method" AS ENUM ('CASH', 'CARD');

-- AlterEnum
ALTER TYPE "Status" ADD VALUE 'PROCESSING';

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "icon" TEXT;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "contact_phone" TEXT,
ADD COLUMN     "delivery_location" TEXT,
ADD COLUMN     "payment_method" "Payment_method";

-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "location";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "average_rating" DOUBLE PRECISION NOT NULL DEFAULT 0,
ALTER COLUMN "is_active" SET DEFAULT true;

-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "rating" DOUBLE PRECISION NOT NULL,
    "product_id" INTEGER NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OrderItem_order_id_product_id_key" ON "OrderItem"("order_id", "product_id");

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
