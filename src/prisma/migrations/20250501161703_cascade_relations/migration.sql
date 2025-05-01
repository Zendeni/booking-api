/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Host` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Host` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_email_key";

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Booking" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "checkinDate" DATETIME NOT NULL,
    "checkoutDate" DATETIME NOT NULL,
    "numberOfGuests" INTEGER NOT NULL DEFAULT 1,
    "totalPrice" REAL NOT NULL,
    "bookingStatus" TEXT NOT NULL DEFAULT 'pending'
);
INSERT INTO "new_Booking" ("bookingStatus", "checkinDate", "checkoutDate", "id", "numberOfGuests", "propertyId", "totalPrice", "userId") SELECT "bookingStatus", "checkinDate", "checkoutDate", "id", "numberOfGuests", "propertyId", "totalPrice", "userId" FROM "Booking";
DROP TABLE "Booking";
ALTER TABLE "new_Booking" RENAME TO "Booking";
CREATE TABLE "new_Host" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "profilePicture" TEXT,
    "aboutMe" TEXT
);
INSERT INTO "new_Host" ("aboutMe", "id", "password", "phoneNumber", "profilePicture", "userId", "username") SELECT "aboutMe", "id", "password", "phoneNumber", "profilePicture", "userId", "username" FROM "Host";
DROP TABLE "Host";
ALTER TABLE "new_Host" RENAME TO "Host";
CREATE UNIQUE INDEX "Host_userId_key" ON "Host"("userId");
CREATE UNIQUE INDEX "Host_username_key" ON "Host"("username");
CREATE TABLE "new_Property" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "pricePerNight" REAL NOT NULL,
    "bedroomCount" INTEGER NOT NULL,
    "bathRoomCount" INTEGER NOT NULL,
    "maxGuestCount" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 0,
    "hostId" TEXT NOT NULL
);
INSERT INTO "new_Property" ("bathRoomCount", "bedroomCount", "description", "hostId", "id", "location", "maxGuestCount", "pricePerNight", "rating", "title") SELECT "bathRoomCount", "bedroomCount", "description", "hostId", "id", "location", "maxGuestCount", "pricePerNight", "rating", "title" FROM "Property";
DROP TABLE "Property";
ALTER TABLE "new_Property" RENAME TO "Property";
CREATE TABLE "new_Review" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT NOT NULL
);
INSERT INTO "new_Review" ("comment", "id", "propertyId", "rating", "userId") SELECT "comment", "id", "propertyId", "rating", "userId" FROM "Review";
DROP TABLE "Review";
ALTER TABLE "new_Review" RENAME TO "Review";
CREATE TABLE "new__PropertyAmenities" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);
INSERT INTO "new__PropertyAmenities" ("A", "B") SELECT "A", "B" FROM "_PropertyAmenities";
DROP TABLE "_PropertyAmenities";
ALTER TABLE "new__PropertyAmenities" RENAME TO "_PropertyAmenities";
CREATE UNIQUE INDEX "_PropertyAmenities_AB_unique" ON "_PropertyAmenities"("A", "B");
CREATE INDEX "_PropertyAmenities_B_index" ON "_PropertyAmenities"("B");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
