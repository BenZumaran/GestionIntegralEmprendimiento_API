"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProductoToAlmacen = void 0;
class UpdateProductoToAlmacen {
    constructor(almacen, producto, cantidad, fechaIngreso) {
        this.almacen = almacen;
        this.producto = producto;
        this.cantidad = cantidad;
        this.fechaIngreso = fechaIngreso;
    }
    get values() {
        const returnObj = {};
        returnObj.cantidad = this.cantidad;
        return returnObj;
    }
    static create(props) {
        const { almacen, producto, cantidad, fechaIngreso } = props;
        if (!almacen)
            return ['almacen is required', undefined];
        if (!producto)
            return ['producto is required', undefined];
        if (!cantidad)
            return ['cantidad is required', undefined];
        return [undefined, new UpdateProductoToAlmacen(almacen, producto, cantidad, fechaIngreso)];
    }
}
exports.UpdateProductoToAlmacen = UpdateProductoToAlmacen;
