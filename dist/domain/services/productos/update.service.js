"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProducto = void 0;
class UpdateProducto {
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
        this.nombre && (returnObj.nombre = this.nombre);
        this.descripcion && (returnObj.descripcion = this.descripcion);
        this.precio && (returnObj.precio = this.precio);
        this.tipo && (returnObj.tipo = this.tipo);
        this.estado && (returnObj.estado = this.estado);
        this.unidadMedida && (returnObj.unidadMedida = this.unidadMedida);
        this.rucProveedor && (returnObj.rucProveedor = this.rucProveedor);
        return returnObj;
    }
    static create(props) {
        const { id, nombre, descripcion, precio, tipo, estado, unidadMedida, rucProveedor } = props;
        if (!id)
            return ['id is required', undefined];
        return [undefined, new UpdateProducto(nombre, descripcion, precio, tipo, estado, unidadMedida, rucProveedor)];
    }
}
exports.UpdateProducto = UpdateProducto;
