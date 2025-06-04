"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsertInsumoToProducto = void 0;
class InsertInsumoToProducto {
    constructor(producto, insumo, cantidad) {
        this.producto = producto;
        this.insumo = insumo;
        this.cantidad = cantidad;
    }
    get values() {
        const returnObj = {};
        returnObj.producto = this.producto;
        returnObj.insumo = this.insumo;
        returnObj.cantidad = this.cantidad;
        return returnObj;
    }
    static create(props) {
        const { producto, insumo, cantidad } = props;
        if (!producto)
            return ['producto is required', undefined];
        if (!insumo)
            return ['insumo is required', undefined];
        if (!cantidad)
            return ['cantidad is required', undefined];
        return [undefined, new InsertInsumoToProducto(producto, insumo, cantidad)];
    }
}
exports.InsertInsumoToProducto = InsertInsumoToProducto;
