import { Router } from "express";
import { InsumosController } from "../../controller/insumos/controller";


export class InsumosRoutes {

    static get routes():Router {
    const router = Router();
    const insumosController = new InsumosController();
    router.get('/', insumosController.getInsumos);
    router.get('/:id', insumosController.getInsumosById);
    router.post('/', insumosController.createInsumos);
    router.put('/:id', insumosController.updateInsumos);
    // router.delete('/:id', insumosController.deleteInsumos);

    router.get('/producto/:id', insumosController.getInsumosInProducto);

    router.post('/almacen', insumosController.insertInsumoToAlmacen);
    router.put('/almacen', insumosController.updateInsumoToAlmacen);

    return router;
    }

}