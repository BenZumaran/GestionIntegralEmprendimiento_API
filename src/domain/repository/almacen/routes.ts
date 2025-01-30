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
    
    return router;
    }

}