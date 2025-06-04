"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProducto = void 0;
class CreateProducto {
    constructor(nombre, descripcion, precio, tipo, estado, unidadMedida, rucProveedor) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.tipo = tipo;
        this.estado = estado;
        this.unidadMedida = unidadMedida;
        this.rucProveedor = rucProveedor;
    }
    get values() {
        const returnObj = {};
        returnObj.nombre = this.nombre;
        returnObj.descripcion = this.descripcion;
        returnObj.precio = this.precio;
        returnObj.tipo = this.tipo;
        returnObj.estado = this.estado;
        returnObj.unidadMedida = this.unidadMedida;
        this.rucProveedor && (returnObj.rucProveedor = this.rucProveedor);
        return returnObj;
    }
    static create(props) {
        const { nombre, descripcion, precio, tipo, estado, unidadMedida, rucProveedor } = props;
        if (!nombre)
            return ['nombre is required', undefined];
        if (!descripcion)
            return ['descripcion is required', undefined];
        if (!precio)
            return ['precio is required', undefined];
        if (!tipo)
            return ['tipo is required', undefined];
        if (!unidadMedida)
            return ['unidadMedida is required', undefined];
        return [undefined, new CreateProducto(nombre, descripcion, precio, tipo, true, unidadMedida, rucProveedor)];
    }
}
exports.CreateProducto = CreateProducto;
