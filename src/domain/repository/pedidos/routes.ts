import { Router } from "express";
import { PedidosController } from "../../controller/pedidos/controller";


export class PedidosRoutes {

    static get routes():Router {
    const router = Router();
    const pedidosController = new PedidosController();
    router.get('/', pedidosController.getPedidos);
    router.get('/:id', pedidosController.getPedidoById);
    router.post('/', pedidosController.createPedido);
    router.put('/:id', pedidosController.updatePedido);
     router.delete('/:id', pedidosController.deletePedido);
    
    router.get('/detalle/:id', pedidosController.getPedidoWithDetalleById);
    router.post('/detalle/:pedido', pedidosController.addDetalle);
    router.put('/detalle/', pedidosController.updateDetalle);
    router.delete('/detalle/:pedido', pedidosController.deleteDetalle);
    


    return router;
    }

}