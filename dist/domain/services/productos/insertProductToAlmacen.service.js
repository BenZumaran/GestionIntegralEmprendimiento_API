"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsertProductoToAlmacen = void 0;
class InsertProductoToAlmacen {
    constructor(almacen, producto, cantidad, fechaIngreso) {
        this.almacen = almacen;
        this.producto = producto;
        this.cantidad = cantidad;
        this.fechaIngreso = fechaIngreso;
    }
    get values() {
        const returnObj = {};
        returnObj.almacen = this.almacen;
        returnObj.producto = this.producto;
        returnObj.cantidad = this.cantidad;
        returnObj.fechaIngreso && (returnObj.fechaIngreso = this.fechaIngreso);
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
        return [undefined, new InsertProductoToAlmacen(almacen, producto, cantidad, fechaIngreso)];
    }
}
exports.InsertProductoToAlmacen = InsertProductoToAlmacen;
