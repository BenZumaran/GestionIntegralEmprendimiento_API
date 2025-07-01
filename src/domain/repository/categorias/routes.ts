import { Router } from "express";
import { ProductosController } from "../../controller/productos/controller";
import { CategoriasController } from "../../controller/categorias/controller";


export class CategoriasRoutes {

    static get routes():Router {
    const router = Router();
    const categoriasController = new CategoriasController();
    router.get('/', categoriasController.getCategorias);
    router.get('/:id', categoriasController.getCategoriaById);
    router.post('/', categoriasController.createCategoria);
    router.put('/:id', categoriasController.updateCategoria);
    router.post('/setTipo', categoriasController.setTipoToCategoria);
    router.get('/tipos/all', categoriasController.getCategoriasTipo);
    router.get('/filtro/texto/:filtro', categoriasController.getCategoriasByText);
    
    // router.delete('/:id', categoriasController.deleteCategorias);
    return router;
    }

}