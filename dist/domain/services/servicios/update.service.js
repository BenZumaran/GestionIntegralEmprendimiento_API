"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateServicio = void 0;
class UpdateServicio {
    constructor(nombre, descripcion, precio, tipo, estado) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.tipo = tipo;
        this.estado = estado;
    }
    get values() {
        const returnObj = {};
        this.nombre && (returnObj.nombre = this.nombre);
        this.descripcion && (returnObj.descripcion = this.descripcion);
        this.precio && (returnObj.precio = this.precio);
        this.tipo && (returnObj.tipo = this.tipo);
        this.estado && (returnObj.estado = this.estado);
        return returnObj;
    }
    static create(props) {
        const { id, nombre, descripcion, precio, tipo, estado } = props;
        if (!id)
            return ['id is required', undefined];
        return [undefined, new UpdateServicio(nombre, descripcion, precio, tipo, estado)];
    }
}
exports.UpdateServicio = UpdateServicio;
