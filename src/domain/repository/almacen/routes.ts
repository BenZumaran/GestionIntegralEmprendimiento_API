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

    router.get('/producto/all', almacenController.getProductosAlmacen);    
    router.get('/insumo/all', almacenController.getInsumosAlmacen);
    
    return router;
    }
}