/*
  Warnings:

  - You are about to drop the `matchs` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "matchs";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "matches" (
    "_id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "amout_participants" INTEGER NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_participants_in_match" (
    "_id" TEXT NOT NULL PRIMARY KEY,
    "match_id" TEXT NOT NULL,
    "participant_id" TEXT NOT NULL,
    CONSTRAINT "participants_in_match_match_id_fkey" FOREIGN KEY ("match_id") REFERENCES "matches" ("_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "participants_in_match_participant_id_fkey" FOREIGN KEY ("participant_id") REFERENCES "participants" ("_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_participants_in_match" ("_id", "match_id", "participant_id") SELECT "_id", "match_id", "participant_id" FROM "participants_in_match";
DROP TABLE "participants_in_match";
ALTER TABLE "new_participants_in_match" RENAME TO "participants_in_match";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
