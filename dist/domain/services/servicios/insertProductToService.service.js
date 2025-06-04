"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsertProductToService = void 0;
class InsertProductToService {
    constructor(servicio, producto, cantidad, tiempo) {
        this.servicio = servicio;
        this.producto = producto;
        this.cantidad = cantidad;
        this.tiempo = tiempo;
    }
    get values() {
        const returnObj = {};
        returnObj.servicio = this.servicio;
        returnObj.producto = this.producto;
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
        return [undefined, new InsertProductToService(servicio, producto, cantidad, tiempo)];
    }
}
exports.InsertProductToService = InsertProductToService;
