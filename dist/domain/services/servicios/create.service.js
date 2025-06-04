"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateServicio = void 0;
class CreateServicio {
    constructor(nombre, descripcion, precio, tipo, estado) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.tipo = tipo;
        this.estado = estado;
    }
    get values() {
        const returnObj = {};
        returnObj.nombre = this.nombre;
        returnObj.descripcion = this.descripcion;
        returnObj.precio = this.precio;
        returnObj.tipo = this.tipo;
        returnObj.estado = this.estado;
        return returnObj;
    }
    static create(props) {
        const { nombre, descripcion, precio, tipo, estado } = props;
        if (!nombre)
            return ['nombre is required', undefined];
        if (!descripcion)
            return ['descripcion is required', undefined];
        if (!precio)
            return ['precio is required', undefined];
        if (!tipo)
            return ['tipo is required', undefined];
        return [undefined, new CreateServicio(nombre, descripcion, precio, tipo, true)];
    }
}
exports.CreateServicio = CreateServicio;
