"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAlmacen = void 0;
class UpdateAlmacen {
    constructor(nombre, capacidad, dimensiones, tipo, ubicacion) {
        this.nombre = nombre;
        this.capacidad = capacidad;
        this.dimensiones = dimensiones;
        this.tipo = tipo;
        this.ubicacion = ubicacion;
    }
    get values() {
        const returnObj = {};
        this.nombre && (returnObj.nombre = this.nombre);
        this.capacidad && (returnObj.capacidad = this.capacidad);
        this.dimensiones && (returnObj.dimensiones = this.dimensiones);
        this.tipo && (returnObj.tipo = this.tipo);
        this.ubicacion && (returnObj.ubicacion = this.ubicacion);
        return returnObj;
    }
    static create(props) {
        const { id, nombre, capacidad, dimensiones, tipo, ubicacion } = props;
        if (!id)
            return ['id is required', undefined];
        return [undefined, new UpdateAlmacen(nombre, capacidad, dimensiones, tipo, ubicacion)];
    }
}
exports.UpdateAlmacen = UpdateAlmacen;
