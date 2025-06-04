"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateInsumoToProducto = void 0;
class UpdateInsumoToProducto {
    constructor(producto, insumo, cantidad) {
        this.producto = producto;
        this.insumo = insumo;
        this.cantidad = cantidad;
    }
    get values() {
        const returnObj = {};
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
        return [undefined, new UpdateInsumoToProducto(producto, insumo, cantidad)];
    }
}
exports.UpdateInsumoToProducto = UpdateInsumoToProducto;
