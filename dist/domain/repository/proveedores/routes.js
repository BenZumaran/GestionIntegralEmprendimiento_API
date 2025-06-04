"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProveedoresRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("../../controller/proveedores/controller");
class ProveedoresRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const proveedoresController = new controller_1.ProveedoresController();
        router.get('/', proveedoresController.getProveedores);
        router.get('/:ruc', proveedoresController.getProveedorByRuc);
        router.post('/', proveedoresController.createProveedor);
        router.put('/:ruc', proveedoresController.updateProveedor);
        return router;
    }
}
exports.ProveedoresRoutes = ProveedoresRoutes;
