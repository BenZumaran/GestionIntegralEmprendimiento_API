"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductosRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("../../controller/productos/controller");
class ProductosRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const productosController = new controller_1.ProductosController();
        router.get('/', productosController.getProductos);
        router.get('/:id', productosController.getProductoById);
        router.post('/', productosController.createProducto);
        router.put('/:id', productosController.updateProducto);
        router.delete('/:id', productosController.deleteProducto);
        router.get('/servicio/:id', productosController.getProductosInServicio);
        router.get('/insumo/all', productosController.getProductosWithInsumos);
        router.post('/insumo', productosController.insertInsumoToProducto);
        router.put('/insumo/:servicio', productosController.updateInsumosInProducto);
        router.delete('/insumo/:servicio/:producto', productosController.deleteInsumosFromProducto);
        router.post('/almacen', productosController.insertProductoToAlmacen);
        router.put('/almacen', productosController.updateProductoToAlmacen);
        return router;
    }
}
exports.ProductosRoutes = ProductosRoutes;
