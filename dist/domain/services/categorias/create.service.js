"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCategoria = void 0;
class CreateCategoria {
    constructor(nombre) {
        this.nombre = nombre;
    }
    static create(props) {
        const { nombre } = props;
        if (!nombre)
            return ['nombre is required', undefined];
        return [undefined, new CreateCategoria(nombre)];
    }
}
exports.CreateCategoria = CreateCategoria;
