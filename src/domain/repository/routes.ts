import { Router } from "express";
import { ProductosRoutes } from "./productos/routes";
import { TipoRoutes } from "./tipos/routes";
import { CategoriasRoutes } from "./categorias/routes";
import { ProveedoresRoutes } from "./proveedores/routes";
import { InsumosRoutes } from "./insumos/routes";
import { ServiciosRoutes } from "./servicios/routes";
import { UsuariosRoutes } from "./usuarios/routes";
import { AlmacensRoutes } from "./almacen/routes";
import cors from 'cors';
import { PedidosRoutes } from "./pedidos/routes";

export class AppRoutes {

    static get routes():Router {
        const router= Router();

        const corsOptions = {
            origin: 'http://localhost:5173',
            optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
        
          }
          const corsOptions2 = {
            origin: 'http://localhost:8081',
            optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
        
          }
        router.use('/api/v1/tipos',[cors(corsOptions),cors(corsOptions2)], TipoRoutes.routes);
        router.use('/api/v1/categorias',[cors(corsOptions),cors(corsOptions2)], CategoriasRoutes.routes);
        router.use('/api/v1/proveedores',[cors(corsOptions),cors(corsOptions2)], ProveedoresRoutes.routes);
        router.use('/api/v1/insumos',[cors(corsOptions),cors(corsOptions2)], InsumosRoutes.routes);
        router.use('/api/v1/productos',[cors(corsOptions),cors(corsOptions2)], ProductosRoutes.routes);
        router.use('/api/v1/servicios',[cors(corsOptions),cors(corsOptions2)], ServiciosRoutes.routes);
        router.use('/api/v1/usuarios',[cors(corsOptions),cors(corsOptions2)], UsuariosRoutes.routes);
        router.use('/api/v1/almacen',[cors(corsOptions),cors(corsOptions2)], AlmacensRoutes.routes);
        router.use('/api/v1/pedidos',[cors(corsOptions),cors(corsOptions2)], PedidosRoutes.routes);

        return router;
    }
}