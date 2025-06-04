"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsertInsumoToAlmacen = void 0;
class InsertInsumoToAlmacen {
    constructor(almacen, insumo, cantidad, fechaIngreso) {
        this.almacen = almacen;
        this.insumo = insumo;
        this.cantidad = cantidad;
        this.fechaIngreso = fechaIngreso;
    }
    get values() {
        const returnObj = {};
        returnObj.almacen = this.almacen;
        returnObj.insumo = this.insumo;
        returnObj.cantidad = this.cantidad;
        returnObj.fechaIngreso && (returnObj.fechaIngreso = this.fechaIngreso);
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
        return [undefined, new InsertInsumoToAlmacen(almacen, insumo, cantidad, fechaIngreso)];
    }
}
exports.InsertInsumoToAlmacen = InsertInsumoToAlmacen;
