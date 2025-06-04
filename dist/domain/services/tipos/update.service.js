"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTipo = void 0;
class UpdateTipo {
    constructor(id, nombre) {
        this.id = id;
        this.nombre = nombre;
    }
    get values() {
        const returnObj = {};
        this.nombre && (returnObj.nombre = this.nombre);
        return returnObj;
    }
    static create(props) {
        const { id, nombre } = props;
        if (!id || isNaN(id))
            return ['id must be a valid number'];
        if (!nombre)
            return ['nombre es requerido', undefined];
        return [undefined, new UpdateTipo(id, nombre)];
    }
}
exports.UpdateTipo = UpdateTipo;
