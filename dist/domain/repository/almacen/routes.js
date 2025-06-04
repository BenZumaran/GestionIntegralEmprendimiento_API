"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlmacensRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("../../controller/almacen/controller");
class AlmacensRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const almacenController = new controller_1.AlmacenController();
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
exports.AlmacensRoutes = AlmacensRoutes;
