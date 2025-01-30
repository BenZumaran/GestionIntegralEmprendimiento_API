-- CreateTable
CREATE TABLE "Tipos" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(25) NOT NULL,
    "createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Tipos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categorias" (
    "id" SERIAL NOT NULL,
    "tipo" INTEGER NOT NULL,
    "createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nombre" VARCHAR(25) NOT NULL,

    CONSTRAINT "Categorias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Proveedores" (
    "ruc" VARCHAR(11) NOT NULL,
    "razonSocial" VARCHAR(255) NOT NULL,
    "telefono" VARCHAR(11) NOT NULL,
    "direccion" VARCHAR(255) NOT NULL,
    "createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tipo" INTEGER NOT NULL,
    "cuentaCorriente" VARCHAR(25) NOT NULL,

    CONSTRAINT "Proveedores_pkey" PRIMARY KEY ("ruc")
);

-- CreateTable
CREATE TABLE "Insumos" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(25) NOT NULL,
    "descripcion" VARCHAR(255) NOT NULL,
    "tipoInsumo" INTEGER NOT NULL,
    "unidadMedida" VARCHAR(25) NOT NULL,
    "rucProveedor" VARCHAR(11),
    "duracion" INTEGER NOT NULL,
    "tipoAlmacen" INTEGER NOT NULL,
    "createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Insumos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Productos" (
    "id" TEXT NOT NULL,
    "nombre" VARCHAR(25) NOT NULL,
    "descripcion" VARCHAR(255) NOT NULL,
    "createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "precio" INTEGER NOT NULL,
    "tipo" INTEGER NOT NULL,
    "estado" BOOLEAN NOT NULL DEFAULT true,
    "rucProveedor" VARCHAR(11),
    "unidadMedida" VARCHAR(25) NOT NULL,

    CONSTRAINT "Productos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Servicios" (
    "id" TEXT NOT NULL,
    "nombre" VARCHAR(25) NOT NULL,
    "descripcion" VARCHAR(255) NOT NULL,
    "createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "precio" INTEGER NOT NULL,
    "tipo" INTEGER NOT NULL,
    "estado" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Servicios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductosServicio" (
    "servicio" VARCHAR NOT NULL,
    "producto" VARCHAR NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "tiempo" DECIMAL NOT NULL,

    CONSTRAINT "ProductosServicio_pkey" PRIMARY KEY ("servicio","producto")
);

-- CreateTable
CREATE TABLE "InsumosProducto" (
    "insumo" INTEGER NOT NULL,
    "producto" VARCHAR NOT NULL,
    "cantidad" INTEGER NOT NULL,

    CONSTRAINT "InsumosProducto_pkey" PRIMARY KEY ("insumo","producto")
);

-- CreateTable
CREATE TABLE "Pedidos" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaCambio" TIMESTAMP NOT NULL,
    "estado" INTEGER NOT NULL,
    "Total" MONEY NOT NULL,

    CONSTRAINT "Pedidos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PedidoProductos" (
    "pedido" VARCHAR NOT NULL,
    "producto" VARCHAR NOT NULL,
    "cantidad" INTEGER NOT NULL,

    CONSTRAINT "PedidoProductos_pkey" PRIMARY KEY ("pedido","producto")
);

-- CreateTable
CREATE TABLE "PedidoServicios" (
    "pedido" VARCHAR NOT NULL,
    "servicio" VARCHAR NOT NULL,
    "cantidad" INTEGER NOT NULL,

    CONSTRAINT "PedidoServicios_pkey" PRIMARY KEY ("pedido","servicio")
);

-- CreateTable
CREATE TABLE "Usuarios" (
    "id" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "nombre" VARCHAR(150) NOT NULL,
    "nombreUsuario" VARCHAR(150),
    "telefono" VARCHAR(11) NOT NULL,
    "direccion" VARCHAR(255) NOT NULL,
    "fechaNacimiento" DATE NOT NULL,
    "tipoDocumento" INTEGER NOT NULL,
    "numeroDocumento" VARCHAR(11) NOT NULL,
    "tipoUsuario" INTEGER NOT NULL,
    "clave" VARCHAR(150) NOT NULL,
    "createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Almacen" (
    "id" TEXT NOT NULL,
    "nombre" VARCHAR(25) NOT NULL,
    "capacidad" DECIMAL NOT NULL,
    "dimensiones" DECIMAL NOT NULL,
    "tipo" INTEGER NOT NULL,
    "ubicacion" VARCHAR(255) NOT NULL,

    CONSTRAINT "Almacen_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AlmacenProductos" (
    "almacen" VARCHAR NOT NULL,
    "producto" VARCHAR NOT NULL,
    "cantidad" INTEGER NOT NULL,

    CONSTRAINT "AlmacenProductos_pkey" PRIMARY KEY ("almacen","producto")
);

-- CreateTable
CREATE TABLE "AlmacenInsumos" (
    "almacen" VARCHAR NOT NULL,
    "insumo" INTEGER NOT NULL,
    "cantidad" INTEGER NOT NULL,

    CONSTRAINT "AlmacenInsumos_pkey" PRIMARY KEY ("almacen","insumo")
);

-- CreateIndex
CREATE UNIQUE INDEX "Productos_nombre_key" ON "Productos"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Servicios_nombre_key" ON "Servicios"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Usuarios_correo_key" ON "Usuarios"("correo");

-- CreateIndex
CREATE UNIQUE INDEX "Almacen_nombre_key" ON "Almacen"("nombre");

-- AddForeignKey
ALTER TABLE "Categorias" ADD CONSTRAINT "Categorias_tipo_fkey" FOREIGN KEY ("tipo") REFERENCES "Tipos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proveedores" ADD CONSTRAINT "Proveedores_tipo_fkey" FOREIGN KEY ("tipo") REFERENCES "Tipos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Insumos" ADD CONSTRAINT "Insumos_tipoInsumo_fkey" FOREIGN KEY ("tipoInsumo") REFERENCES "Tipos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Insumos" ADD CONSTRAINT "Insumos_rucProveedor_fkey" FOREIGN KEY ("rucProveedor") REFERENCES "Proveedores"("ruc") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Insumos" ADD CONSTRAINT "Insumos_tipoAlmacen_fkey" FOREIGN KEY ("tipoAlmacen") REFERENCES "Tipos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Productos" ADD CONSTRAINT "Productos_tipo_fkey" FOREIGN KEY ("tipo") REFERENCES "Tipos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Productos" ADD CONSTRAINT "Productos_rucProveedor_fkey" FOREIGN KEY ("rucProveedor") REFERENCES "Proveedores"("ruc") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Servicios" ADD CONSTRAINT "Servicios_tipo_fkey" FOREIGN KEY ("tipo") REFERENCES "Tipos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductosServicio" ADD CONSTRAINT "ProductosServicio_servicio_fkey" FOREIGN KEY ("servicio") REFERENCES "Servicios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductosServicio" ADD CONSTRAINT "ProductosServicio_producto_fkey" FOREIGN KEY ("producto") REFERENCES "Productos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InsumosProducto" ADD CONSTRAINT "InsumosProducto_insumo_fkey" FOREIGN KEY ("insumo") REFERENCES "Insumos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InsumosProducto" ADD CONSTRAINT "InsumosProducto_producto_fkey" FOREIGN KEY ("producto") REFERENCES "Productos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pedidos" ADD CONSTRAINT "Pedidos_estado_fkey" FOREIGN KEY ("estado") REFERENCES "Tipos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PedidoProductos" ADD CONSTRAINT "PedidoProductos_pedido_fkey" FOREIGN KEY ("pedido") REFERENCES "Pedidos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PedidoProductos" ADD CONSTRAINT "PedidoProductos_producto_fkey" FOREIGN KEY ("producto") REFERENCES "Productos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PedidoServicios" ADD CONSTRAINT "PedidoServicios_pedido_fkey" FOREIGN KEY ("pedido") REFERENCES "Pedidos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PedidoServicios" ADD CONSTRAINT "PedidoServicios_servicio_fkey" FOREIGN KEY ("servicio") REFERENCES "Servicios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Usuarios" ADD CONSTRAINT "Usuarios_tipoDocumento_fkey" FOREIGN KEY ("tipoDocumento") REFERENCES "Tipos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Usuarios" ADD CONSTRAINT "Usuarios_tipoUsuario_fkey" FOREIGN KEY ("tipoUsuario") REFERENCES "Tipos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Almacen" ADD CONSTRAINT "Almacen_tipo_fkey" FOREIGN KEY ("tipo") REFERENCES "Tipos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlmacenProductos" ADD CONSTRAINT "AlmacenProductos_almacen_fkey" FOREIGN KEY ("almacen") REFERENCES "Almacen"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlmacenProductos" ADD CONSTRAINT "AlmacenProductos_producto_fkey" FOREIGN KEY ("producto") REFERENCES "Productos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlmacenInsumos" ADD CONSTRAINT "AlmacenInsumos_almacen_fkey" FOREIGN KEY ("almacen") REFERENCES "Almacen"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlmacenInsumos" ADD CONSTRAINT "AlmacenInsumos_insumo_fkey" FOREIGN KEY ("insumo") REFERENCES "Insumos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
