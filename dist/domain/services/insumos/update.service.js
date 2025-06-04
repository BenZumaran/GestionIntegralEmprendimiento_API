"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateInsumo = void 0;
class UpdateInsumo {
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
        this.nombre && (returnObj.nombre = this.nombre);
        this.descripcion && (returnObj.descripcion = this.descripcion);
        this.tipoInsumo && (returnObj.tipoInsumo = this.tipoInsumo);
        this.unidadMedida && (returnObj.unidadMedida = this.unidadMedida);
        this.duracion && (returnObj.duracion = this.duracion);
        this.rucProveedor && (returnObj.direccion = this.rucProveedor);
        this.tipoAlmacen && (returnObj.cuentaCorriente = this.tipoAlmacen);
        return returnObj;
    }
    static create(props) {
        const { id, nombre, descripcion, precio, tipoInsumo, unidadMedida, duracion, rucProveedor, tipoAlmacen } = props;
        if (!id)
            return ['id is required', undefined];
        return [undefined, new UpdateInsumo(nombre, descripcion, precio, tipoInsumo, unidadMedida, duracion, rucProveedor, tipoAlmacen)];
    }
}
exports.UpdateInsumo = UpdateInsumo;
