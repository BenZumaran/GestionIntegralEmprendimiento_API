import { Router } from "express";
import { TiposController } from "../../controller/tipos/controller";


export class TipoRoutes {

    static get routes():Router {
    const router = Router();
    const tiposController = new TiposController();
    router.get('/', tiposController.getTipos);
    router.get('/:id', tiposController.getTipoById);
    router.post('/', tiposController.createTipo);
    router.put('/:id', tiposController.updateTipo);
    router.get('/categoria/:id', tiposController.getTipoByCategoria);
    
    return router;
    }

}