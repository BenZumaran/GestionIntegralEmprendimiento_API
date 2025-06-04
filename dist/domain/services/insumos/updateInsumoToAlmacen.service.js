"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateInsumoToAlmacen = void 0;
class UpdateInsumoToAlmacen {
    constructor(almacen, insumo, cantidad, fechaIngreso) {
        this.almacen = almacen;
        this.insumo = insumo;
        this.cantidad = cantidad;
        this.fechaIngreso = fechaIngreso;
    }
    get values() {
        const returnObj = {};
        returnObj.cantidad = this.cantidad;
        return returnObj;
    }
    static create(props) {
        const { almacen, insumo, cantidad, fechaIngreso } = props;
        if (!almacen)
            return ['almacen is required', undefined];
        if (!insumo)
            return ['insumo is required', undefined];
        if (!cantidad)
            return ['cantidad is required', undefined];
        return [undefined, new UpdateInsumoToAlmacen(almacen, insumo, cantidad, fechaIngreso)];
    }
}
exports.UpdateInsumoToAlmacen = UpdateInsumoToAlmacen;
