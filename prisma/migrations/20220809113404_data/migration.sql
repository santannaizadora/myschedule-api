/*
  Warnings:

  - Changed the type of `date` on the `appointments` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `initial_time` on the `appointments` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `final_time` on the `appointments` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "appointments" DROP COLUMN "date",
ADD COLUMN     "date" DATE NOT NULL,
DROP COLUMN "initial_time",
ADD COLUMN     "initial_time" TIME NOT NULL,
DROP COLUMN "final_time",
ADD COLUMN     "final_time" TIME NOT NULL;
