"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateInsumo = void 0;
class CreateInsumo {
    constructor(nombre, descripcion, precio, tipoInsumo, unidadMedida, duracion, rucProveedor, tipoAlmacen) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.tipoInsumo = tipoInsumo;
        this.unidadMedida = unidadMedida;
        this.duracion = duracion;
        this.rucProveedor = rucProveedor;
        this.tipoAlmacen = tipoAlmacen;
    }
    get values() {
        const returnObj = {};
        returnObj.nombre = this.nombre;
        returnObj.descripcion = this.descripcion;
        returnObj.tipoInsumo = this.tipoInsumo;
        returnObj.unidadMedida = this.unidadMedida;
        returnObj.duracion = this.duracion;
        this.rucProveedor && (returnObj.direccion = this.rucProveedor);
        this.tipoAlmacen && (returnObj.cuentaCorriente = this.tipoAlmacen);
        return returnObj;
    }
    static create(props) {
        const { nombre, descripcion, precio, tipoInsumo, unidadMedida, duracion, rucProveedor, tipoAlmacen } = props;
        if (!nombre)
            return ['nombre is required', undefined];
        if (!descripcion)
            return ['descripcion is required', undefined];
        if (!precio)
            return ['precio is required', undefined];
        if (!tipoInsumo)
            return ['tipoInsumo is required', undefined];
        if (!unidadMedida)
            return ['unidadMedida is required', undefined];
        if (!duracion)
            return ['duracion is required', undefined];
        return [undefined, new CreateInsumo(nombre, descripcion, precio, tipoInsumo, unidadMedida, duracion, rucProveedor, tipoAlmacen)];
    }
}
exports.CreateInsumo = CreateInsumo;
