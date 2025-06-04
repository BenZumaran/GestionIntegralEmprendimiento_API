"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuariosRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("../../controller/usuarios/controller");
class UsuariosRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const usuariosController = new controller_1.UsuariosController();
        router.get('/', usuariosController.getUsuarios);
        router.get('/:id', usuariosController.getUsuarioById);
        router.post('/', usuariosController.createUsuario);
        router.put('/:id', usuariosController.updateUsuario);
        router.post('/sesion', usuariosController.inicioSesion);
        return router;
    }
}
exports.UsuariosRoutes = UsuariosRoutes;
