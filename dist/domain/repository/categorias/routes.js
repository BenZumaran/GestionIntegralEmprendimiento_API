"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriasRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("../../controller/categorias/controller");
class CategoriasRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const categoriasController = new controller_1.CategoriasController();
        router.get('/', categoriasController.getCategorias);
        router.get('/:id', categoriasController.getCategoriaById);
        router.post('/', categoriasController.createCategoria);
        router.put('/:id', categoriasController.updateCategoria);
        router.post('/setTipo', categoriasController.setTipoToCategoria);
        // router.delete('/:id', categoriasController.deleteCategorias);
        router.get('/tipos/all', categoriasController.getCategoriasTipo);
        return router;
    }
}
exports.CategoriasRoutes = CategoriasRoutes;
