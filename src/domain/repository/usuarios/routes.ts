import { Router } from "express";
import { UsuariosController } from "../../controller/usuarios/controller";


export class UsuariosRoutes {

    static get routes():Router {
    const router = Router();
    const usuariosController = new UsuariosController();
    router.get('/', usuariosController.getUsuarios);
    router.get('/:ruc', usuariosController.getUsuarioById);
    router.post('/', usuariosController.createUsuario);
    router.put('/:ruc', usuariosController.updateUsuario);
    
    return router;
    }

}