"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTipo = void 0;
class CreateTipo {
    constructor(nombre) {
        this.nombre = nombre;
    }
    static create(props) {
        const { nombre } = props;
        if (!nombre)
            return ['nombre es requerido', undefined];
        return [undefined, new CreateTipo(nombre)];
    }
}
exports.CreateTipo = CreateTipo;
