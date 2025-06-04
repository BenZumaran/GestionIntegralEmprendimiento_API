"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsumosRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("../../controller/insumos/controller");
class InsumosRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const insumosController = new controller_1.InsumosController();
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
exports.InsumosRoutes = InsumosRoutes;
