import { Router } from "express";
import { AlmacenController } from "../../controller/almacen/controller";


export class AlmacensRoutes {

    static get routes():Router {
    const router = Router();
    const almacenController = new AlmacenController();
    router.get('/', almacenController.getAlmacenes);
    router.get('/:id', almacenController.getAlmacenById);
    router.post('/', almacenController.createAlmacen);
    router.put('/:id', almacenController.updateAlmacen);
    router.get('/producto/id/:id', almacenController.getProductosAlmacenId);
    router.get('/insumo/id/:id', almacenController.getInsumosAlmacenId);
    router.get('/productos/all', almacenController.getProductosAlmacen);    
    router.get('/insumos/all', almacenController.getInsumosAlmacen);
    router.get('/contenido/all', almacenController.getContenidoAlmacen);
    router.get('/filtro/texto/:filtro', almacenController.getAlmacenesByText);
    
    return router;
    }
}