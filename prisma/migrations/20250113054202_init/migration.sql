/*
  Warnings:

  - You are about to drop the column `tipo` on the `Categorias` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Categorias" DROP CONSTRAINT "Categorias_tipo_fkey";

-- AlterTable
ALTER TABLE "Categorias" DROP COLUMN "tipo";

-- CreateTable
CREATE TABLE "CategoriaTipos" (
    "categoria" INTEGER NOT NULL,
    "tipo" INTEGER NOT NULL,

    CONSTRAINT "CategoriaTipos_pkey" PRIMARY KEY ("categoria","tipo")
);

-- AddForeignKey
ALTER TABLE "CategoriaTipos" ADD CONSTRAINT "CategoriaTipos_categoria_fkey" FOREIGN KEY ("categoria") REFERENCES "Categorias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriaTipos" ADD CONSTRAINT "CategoriaTipos_tipo_fkey" FOREIGN KEY ("tipo") REFERENCES "Tipos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
