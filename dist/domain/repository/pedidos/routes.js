"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PedidosRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("../../controller/pedidos/controller");
class PedidosRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const pedidosController = new controller_1.PedidosController();
        router.get('/', pedidosController.getPedidos);
        router.get('/:id', pedidosController.getPedidoById);
        router.post('/', pedidosController.createPedido);
        router.put('/:id', pedidosController.updatePedido);
        router.delete('/:id', pedidosController.deletePedido);
        router.get('/detalle/:id', pedidosController.getPedidoWithDetalleById);
        router.post('/detalle/:pedido', pedidosController.addDetalle);
        router.put('/detalle/', pedidosController.updateDetalle);
        router.delete('/detalle/:pedido', pedidosController.deleteDetalle);
        router.get('/filtro/estado/:filtro', pedidosController.getPedidosByEstado);
        return router;
    }
}
exports.PedidosRoutes = PedidosRoutes;
