/*
  Warnings:

  - Added the required column `current_page` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "current_page" INTEGER NOT NULL;
