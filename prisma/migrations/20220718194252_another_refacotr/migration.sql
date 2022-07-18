/*
  Warnings:

  - Changed the type of `type` on the `card` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "CardTypes" AS ENUM ('debito', 'credito', 'ambos');

-- AlterTable
ALTER TABLE "card" DROP COLUMN "type",
ADD COLUMN     "type" "CardTypes" NOT NULL;

-- DropEnum
DROP TYPE "Card";
