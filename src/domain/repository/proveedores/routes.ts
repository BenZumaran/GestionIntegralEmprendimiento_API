import { Router } from "express";
import { ProveedoresController } from "../../controller/proveedores/controller";


export class ProveedoresRoutes {

    static get routes():Router {
    const router = Router();
    const proveedoresController = new ProveedoresController();
    router.get('/', proveedoresController.getProveedores);
    router.get('/:ruc', proveedoresController.getProveedorByRuc);
    router.post('/', proveedoresController.createProveedor);
    router.put('/:ruc', proveedoresController.updateProveedor);
    
    return router;
    }

}