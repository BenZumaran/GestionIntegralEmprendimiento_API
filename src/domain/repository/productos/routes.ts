import { Router } from "express";
import { ProductosController } from "../../controller/productos/controller";


export class ProductosRoutes {

    static get routes():Router {
    const router = Router();
    const productosController = new ProductosController();
    router.get('/', productosController.getProductos);
    router.get('/:id', productosController.getProductoById);
    router.post('/', productosController.createProducto);
    router.put('/:id', productosController.updateProducto);
    router.delete('/:id', productosController.deleteProducto);
    
    router.get('/servicio/:id', productosController.getProductosInServicio);

    router.get('/insumo/all', productosController.getProductosWithInsumos);
    router.post('/insumo', productosController.insertInsumoToProducto);
    router.put('/insumo/:servicio', productosController.updateInsumosInProducto);
    router.delete('/insumo/:servicio/:producto', productosController.deleteInsumosFromProducto);
    
    router.post('/almacen', productosController.insertProductoToAlmacen);
    router.put('/almacen', productosController.updateProductoToAlmacen);


    return router;
    }

}