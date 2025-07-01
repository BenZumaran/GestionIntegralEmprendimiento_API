"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiciosRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("../../controller/servicios/controller");
class ServiciosRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const serviciosController = new controller_1.ServiciosController();
        router.get('/', serviciosController.getServicios);
        router.get('/:id', serviciosController.getServicioById);
        router.post('/', serviciosController.createServicio);
        router.put('/:id', serviciosController.updateServicio);
        router.delete('/:id', serviciosController.deleteServicio);
        router.get('/producto/all', serviciosController.getServiciosWithProductos);
        router.post('/producto', serviciosController.insertProductoToServicio);
        router.put('/producto/:servicio', serviciosController.updateProductoInServicio);
        router.delete('/producto/:servicio/:producto', serviciosController.deleteProductoFromServicio);
        router.get('/pedidos/all', serviciosController.getServiciosInPedidos);
        return router;
    }
}
exports.ServiciosRoutes = ServiciosRoutes;
