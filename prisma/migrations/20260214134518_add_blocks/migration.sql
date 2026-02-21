/*
  Warnings:

  - The values [OWNER] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `authorId` on the `Page` table. All the data in the column will be lost.
  - Added the required column `createdById` to the `Page` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."BlockType" AS ENUM ('paragraph', 'heading1', 'heading2', 'heading3', 'bulleted_list', 'numbered_list', 'todo', 'toggle', 'quote', 'divider', 'image', 'code');

-- AlterEnum
BEGIN;
CREATE TYPE "public"."Role_new" AS ENUM ('EDITOR', 'VIEWER');
ALTER TABLE "public"."WorkspaceMember" ALTER COLUMN "role" TYPE "public"."Role_new" USING ("role"::text::"public"."Role_new");
ALTER TYPE "public"."Role" RENAME TO "Role_old";
ALTER TYPE "public"."Role_new" RENAME TO "Role";
DROP TYPE "public"."Role_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "public"."Page" DROP CONSTRAINT "Page_authorId_fkey";

-- AlterTable
ALTER TABLE "public"."Page" DROP COLUMN "authorId",
ADD COLUMN     "createdById" TEXT NOT NULL,
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "lastEditedById" TEXT,
ALTER COLUMN "title" SET DEFAULT 'Untitled';

-- CreateTable
CREATE TABLE "public"."Block" (
    "id" TEXT NOT NULL,
    "pageId" TEXT NOT NULL,
    "parentBlockId" TEXT,
    "type" "public"."BlockType" NOT NULL,
    "data" JSONB NOT NULL DEFAULT '{}',
    "position" DOUBLE PRECISION NOT NULL,
    "createdById" TEXT NOT NULL,
    "lastEditedById" TEXT,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Block_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Block_pageId_idx" ON "public"."Block"("pageId");

-- CreateIndex
CREATE INDEX "Block_parentBlockId_idx" ON "public"."Block"("parentBlockId");

-- CreateIndex
CREATE INDEX "Block_createdById_idx" ON "public"."Block"("createdById");

-- CreateIndex
CREATE INDEX "Block_lastEditedById_idx" ON "public"."Block"("lastEditedById");

-- CreateIndex
CREATE INDEX "Block_type_idx" ON "public"."Block"("type");

-- CreateIndex
CREATE INDEX "Page_workspaceId_idx" ON "public"."Page"("workspaceId");

-- CreateIndex
CREATE INDEX "Page_parentId_idx" ON "public"."Page"("parentId");

-- CreateIndex
CREATE INDEX "Page_createdById_idx" ON "public"."Page"("createdById");

-- CreateIndex
CREATE INDEX "Page_lastEditedById_idx" ON "public"."Page"("lastEditedById");

-- CreateIndex
CREATE INDEX "Workspace_ownerId_idx" ON "public"."Workspace"("ownerId");

-- CreateIndex
CREATE INDEX "WorkspaceMember_userId_idx" ON "public"."WorkspaceMember"("userId");

-- AddForeignKey
ALTER TABLE "public"."Page" ADD CONSTRAINT "Page_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Page" ADD CONSTRAINT "Page_lastEditedById_fkey" FOREIGN KEY ("lastEditedById") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Block" ADD CONSTRAINT "Block_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "public"."Page"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Block" ADD CONSTRAINT "Block_parentBlockId_fkey" FOREIGN KEY ("parentBlockId") REFERENCES "public"."Block"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Block" ADD CONSTRAINT "Block_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Block" ADD CONSTRAINT "Block_lastEditedById_fkey" FOREIGN KEY ("lastEditedById") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
