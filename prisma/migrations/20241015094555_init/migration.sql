-- CreateTable
CREATE TABLE "Input" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "preference" TEXT NOT NULL,
    "output" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Input_pkey" PRIMARY KEY ("id")
);
