"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAlmacen = void 0;
class CreateAlmacen {
    constructor(nombre, capacidad, dimensiones, tipo, ubicacion) {
        this.nombre = nombre;
        this.capacidad = capacidad;
        this.dimensiones = dimensiones;
        this.tipo = tipo;
        this.ubicacion = ubicacion;
    }
    get values() {
        const returnObj = {};
        returnObj.nombre = this.nombre;
        returnObj.capacidad = this.capacidad;
        returnObj.dimensiones = this.dimensiones;
        returnObj.tipo = this.tipo;
        returnObj.ubicacion = this.ubicacion;
        return returnObj;
    }
    static create(props) {
        const { nombre, capacidad, dimensiones, tipo, ubicacion } = props;
        if (!nombre)
            return ['nombre is required', undefined];
        if (!capacidad)
            return ['capacidad is required', undefined];
        if (!dimensiones)
            return ['dimensiones is required', undefined];
        if (!tipo)
            return ['tipo is required', undefined];
        if (!ubicacion)
            return ['ubicacion is required', undefined];
        return [undefined, new CreateAlmacen(nombre, capacidad, dimensiones, tipo, ubicacion)];
    }
}
exports.CreateAlmacen = CreateAlmacen;
