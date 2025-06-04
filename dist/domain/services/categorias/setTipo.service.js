"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetTipoToCategoria = void 0;
class SetTipoToCategoria {
    constructor(tipo, categoria) {
        this.tipo = tipo;
        this.categoria = categoria;
    }
    static create(props) {
        const { tipo, categoria } = props;
        if (!tipo)
            return ['tipo is required', undefined];
        if (!categoria)
            return ['categoria is required', undefined];
        return [undefined, new SetTipoToCategoria(tipo, categoria)];
    }
}
exports.SetTipoToCategoria = SetTipoToCategoria;
