-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "aadhaar" TEXT NOT NULL,
    "otp" TEXT,
    "otpValid" BOOLEAN NOT NULL DEFAULT false,
    "pan" TEXT,
    "pin" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_aadhaar_key" ON "User"("aadhaar");

-- CreateIndex
CREATE UNIQUE INDEX "User_pan_key" ON "User"("pan");
