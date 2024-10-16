/*
  Warnings:

  - You are about to drop the column `preference` on the `Input` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Input" DROP COLUMN "preference",
ADD COLUMN     "preferenceId" TEXT;

-- CreateTable
CREATE TABLE "Preference" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Preference_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Input" ADD CONSTRAINT "Input_preferenceId_fkey" FOREIGN KEY ("preferenceId") REFERENCES "Preference"("id") ON DELETE SET NULL ON UPDATE CASCADE;
