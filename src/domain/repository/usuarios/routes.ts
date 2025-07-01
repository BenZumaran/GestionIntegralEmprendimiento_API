import { Router } from "express";
import { UsuariosController } from "../../controller/usuarios/controller";


export class UsuariosRoutes {

    static get routes():Router {
    const router = Router();
    const usuariosController = new UsuariosController();
    router.get('/', usuariosController.getUsuarios);
    router.get('/:id', usuariosController.getUsuarioById);
    router.post('/', usuariosController.createUsuario);
    router.put('/:id', usuariosController.updateUsuario);
    router.post('/sesion', usuariosController.inicioSesionByUserName);
    router.post('/sesion/id', usuariosController.inicioSesionById);
    router.put('/datos/:id', usuariosController.updateDatosUsuario);
    router.put('/clave/:id', usuariosController.updateClaveUsuario);
    router.get('/filter/tipo/:tipo', usuariosController.getUsuariosByTipo);
    router.get('/filtro/texto/:filtro', usuariosController.getUsuariosByText);

    return router;
    }

}