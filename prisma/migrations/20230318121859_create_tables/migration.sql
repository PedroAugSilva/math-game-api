-- CreateTable
CREATE TABLE "participants" (
    "_id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "participants_in_match" (
    "_id" TEXT NOT NULL PRIMARY KEY,
    "match_id" TEXT NOT NULL,
    "participant_id" TEXT NOT NULL,
    CONSTRAINT "participants_in_match_match_id_fkey" FOREIGN KEY ("match_id") REFERENCES "matchs" ("_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "participants_in_match_participant_id_fkey" FOREIGN KEY ("participant_id") REFERENCES "participants" ("_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "matchs" (
    "_id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "amout_participants" INTEGER NOT NULL
);
