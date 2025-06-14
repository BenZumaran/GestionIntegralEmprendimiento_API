/*
  Warnings:

  - You are about to alter the column `Total` on the `Pedidos` table. The data in that column could be lost. The data in that column will be cast from `Money` to `Decimal`.
  - A unique constraint covering the columns `[nombreUsuario]` on the table `Usuarios` will be added. If there are existing duplicate values, this will fail.
  - The required column `lote` was added to the `AlmacenInsumos` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `lote` was added to the `AlmacenProductos` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `precio` to the `Insumos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `correoUsuario` to the `Pedidos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `direccionUsuario` to the `Pedidos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `documentoUsuario` to the `Pedidos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nombreUsuario` to the `Pedidos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telefonoUsuario` to the `Pedidos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Insumos" DROP CONSTRAINT "Insumos_tipoAlmacen_fkey";

-- DropForeignKey
ALTER TABLE "Usuarios" DROP CONSTRAINT "Usuarios_tipoDocumento_fkey";

-- AlterTable
ALTER TABLE "AlmacenInsumos" ADD COLUMN     "fechaIngreso" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "lote" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "AlmacenProductos" ADD COLUMN     "fechaIngreso" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "lote" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Insumos" ADD COLUMN     "precio" DECIMAL NOT NULL,
ALTER COLUMN "tipoAlmacen" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Pedidos" ADD COLUMN     "correoUsuario" VARCHAR NOT NULL,
ADD COLUMN     "direccionUsuario" VARCHAR NOT NULL,
ADD COLUMN     "documentoUsuario" VARCHAR NOT NULL,
ADD COLUMN     "fechaEntrega" TIMESTAMP,
ADD COLUMN     "nombreUsuario" VARCHAR NOT NULL,
ADD COLUMN     "telefonoUsuario" VARCHAR NOT NULL,
ADD COLUMN     "usuarioIngresa" VARCHAR,
ALTER COLUMN "fechaCambio" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "Total" DROP NOT NULL,
ALTER COLUMN "Total" SET DATA TYPE DECIMAL;

-- AlterTable
ALTER TABLE "Proveedores" ALTER COLUMN "telefono" DROP NOT NULL,
ALTER COLUMN "direccion" DROP NOT NULL,
ALTER COLUMN "cuentaCorriente" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Usuarios" ALTER COLUMN "telefono" DROP NOT NULL,
ALTER COLUMN "direccion" DROP NOT NULL,
ALTER COLUMN "fechaNacimiento" DROP NOT NULL,
ALTER COLUMN "tipoDocumento" DROP NOT NULL,
ALTER COLUMN "numeroDocumento" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Usuarios_nombreUsuario_key" ON "Usuarios"("nombreUsuario");

-- AddForeignKey
ALTER TABLE "Insumos" ADD CONSTRAINT "Insumos_tipoAlmacen_fkey" FOREIGN KEY ("tipoAlmacen") REFERENCES "Tipos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pedidos" ADD CONSTRAINT "Pedidos_usuarioIngresa_fkey" FOREIGN KEY ("usuarioIngresa") REFERENCES "Usuarios"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Usuarios" ADD CONSTRAINT "Usuarios_tipoDocumento_fkey" FOREIGN KEY ("tipoDocumento") REFERENCES "Tipos"("id") ON DELETE SET NULL ON UPDATE CASCADE;
