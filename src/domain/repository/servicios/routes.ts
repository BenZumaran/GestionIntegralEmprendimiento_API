import { Router } from "express";
import { ServiciosController } from "../../controller/servicios/controller";


export class ServiciosRoutes {

    static get routes():Router {
    const router = Router();
    const serviciosController = new ServiciosController();
    router.get('/', serviciosController.getServicios);
    router.get('/:id', serviciosController.getServicioById);
    router.post('/', serviciosController.createServicio);
    router.put('/:id', serviciosController.updateServicio);
    router.delete('/:id', serviciosController.deleteServicio);

    router.get('/producto/all', serviciosController.getServiciosWithProductos);
    router.post('/producto', serviciosController.insertProductoToServicio);
    router.put('/producto/:servicio', serviciosController.updateProductoInServicio);
    router.delete('/producto/:servicio/:producto', serviciosController.deleteProductoFromServicio);

    return router;
    }

}