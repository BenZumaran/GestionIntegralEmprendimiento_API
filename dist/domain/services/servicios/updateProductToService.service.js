"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProductoToService = void 0;
class UpdateProductoToService {
    constructor(servicio, producto, cantidad, tiempo) {
        this.servicio = servicio;
        this.producto = producto;
        this.cantidad = cantidad;
        this.tiempo = tiempo;
    }
    get values() {
        const returnObj = {};
        returnObj.cantidad = this.cantidad;
        returnObj.tiempo = this.tiempo;
        return returnObj;
    }
    static create(props) {
        const { servicio, producto, cantidad, tiempo } = props;
        if (!servicio)
            return ['servicio is required', undefined];
        if (!producto)
            return ['producto is required', undefined];
        if (!cantidad)
            return ['cantidad is required', undefined];
        if (!tiempo)
            return ['tiempo is required', undefined];
        return [undefined, new UpdateProductoToService(servicio, producto, cantidad, tiempo)];
    }
}
exports.UpdateProductoToService = UpdateProductoToService;
