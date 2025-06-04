"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRoutes = void 0;
const express_1 = require("express");
const routes_1 = require("./productos/routes");
const routes_2 = require("./tipos/routes");
const routes_3 = require("./categorias/routes");
const routes_4 = require("./proveedores/routes");
const routes_5 = require("./insumos/routes");
const routes_6 = require("./servicios/routes");
const routes_7 = require("./usuarios/routes");
const routes_8 = require("./almacen/routes");
const cors_1 = __importDefault(require("cors"));
const routes_9 = require("./pedidos/routes");
class AppRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const corsOptions = {
            origin: 'http://localhost:5173',
            optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
        };
        const corsOptions2 = {
            origin: 'http://localhost:8081',
            optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
        };
        router.use('/api/v1/tipos', [(0, cors_1.default)(corsOptions), (0, cors_1.default)(corsOptions2)], routes_2.TipoRoutes.routes);
        router.use('/api/v1/categorias', [(0, cors_1.default)(corsOptions), (0, cors_1.default)(corsOptions2)], routes_3.CategoriasRoutes.routes);
        router.use('/api/v1/proveedores', [(0, cors_1.default)(corsOptions), (0, cors_1.default)(corsOptions2)], routes_4.ProveedoresRoutes.routes);
        router.use('/api/v1/insumos', [(0, cors_1.default)(corsOptions), (0, cors_1.default)(corsOptions2)], routes_5.InsumosRoutes.routes);
        router.use('/api/v1/productos', [(0, cors_1.default)(corsOptions), (0, cors_1.default)(corsOptions2)], routes_1.ProductosRoutes.routes);
        router.use('/api/v1/servicios', [(0, cors_1.default)(corsOptions), (0, cors_1.default)(corsOptions2)], routes_6.ServiciosRoutes.routes);
        router.use('/api/v1/usuarios', [(0, cors_1.default)(corsOptions), (0, cors_1.default)(corsOptions2)], routes_7.UsuariosRoutes.routes);
        router.use('/api/v1/almacen', [(0, cors_1.default)(corsOptions), (0, cors_1.default)(corsOptions2)], routes_8.AlmacensRoutes.routes);
        router.use('/api/v1/pedidos', [(0, cors_1.default)(corsOptions), (0, cors_1.default)(corsOptions2)], routes_9.PedidosRoutes.routes);
        return router;
    }
}
exports.AppRoutes = AppRoutes;
