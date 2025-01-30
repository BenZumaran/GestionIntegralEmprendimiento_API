import { Router } from "express";
import { ProductosRoutes } from "./productos/routes";
import { TipoRoutes } from "./tipos/routes";
import { CategoriasRoutes } from "./categorias/routes";
import { ProveedoresRoutes } from "./proveedores/routes";
import { InsumosRoutes } from "./insumos/routes";
import { ServiciosRoutes } from "./servicios/routes";
import { UsuariosRoutes } from "./usuarios/routes";
import { AlmacensRoutes } from "./almacen/routes";


export class AppRoutes {

    static get routes():Router {
        const router= Router();

        router.use('/api/v1/tipos', TipoRoutes.routes);
        router.use('/api/v1/categorias', CategoriasRoutes.routes);
        router.use('/api/v1/proveedores', ProveedoresRoutes.routes);
        router.use('/api/v1/insumos', InsumosRoutes.routes);
        router.use('/api/v1/productos', ProductosRoutes.routes);
        router.use('/api/v1/servicios', ServiciosRoutes.routes);
        router.use('/api/v1/usuarios', UsuariosRoutes.routes);
        router.use('/api/v1/almacen', AlmacensRoutes.routes);

        return router;
    }
}