"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipoRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("../../controller/tipos/controller");
class TipoRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const tiposController = new controller_1.TiposController();
        router.get('/', tiposController.getTipos);
        router.get('/:id', tiposController.getTipoById);
        router.post('/', tiposController.createTipo);
        router.put('/:id', tiposController.updateTipo);
        router.get('/categoria/:id', tiposController.getTipoByCategoria);
        return router;
    }
}
exports.TipoRoutes = TipoRoutes;
