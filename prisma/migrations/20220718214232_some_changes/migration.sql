/*
  Warnings:

  - You are about to drop the `wifi` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `cvv` to the `card` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "wifi" DROP CONSTRAINT "wifi_userId_fkey";

-- AlterTable
ALTER TABLE "card" ADD COLUMN     "cvv" TEXT NOT NULL;

-- DropTable
DROP TABLE "wifi";

-- CreateTable
CREATE TABLE "wifis" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "wifis_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "wifis" ADD CONSTRAINT "wifis_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
