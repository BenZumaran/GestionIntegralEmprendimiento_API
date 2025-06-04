"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProveedor = void 0;
class CreateProveedor {
    constructor(ruc, razonSocial, tipo, telefono, direccion, cuentaCorriente) {
        this.ruc = ruc;
        this.razonSocial = razonSocial;
        this.tipo = tipo;
        this.telefono = telefono;
        this.direccion = direccion;
        this.cuentaCorriente = cuentaCorriente;
    }
    get values() {
        const returnObj = {};
        returnObj.ruc = this.ruc;
        returnObj.razonSocial = this.razonSocial;
        returnObj.tipo = this.tipo;
        this.telefono && (returnObj.telefono = this.telefono);
        this.direccion && (returnObj.direccion = this.direccion);
        this.cuentaCorriente && (returnObj.cuentaCorriente = this.cuentaCorriente);
        return returnObj;
    }
    static create(props) {
        const { ruc, razonSocial, telefono, direccion, tipo, cuentaCorriente } = props;
        if (!ruc)
            return ['ruc is required', undefined];
        if (!razonSocial)
            return ['razonSocial is required', undefined];
        if (!tipo)
            return ['tipo is required', undefined];
        return [undefined, new CreateProveedor(ruc, razonSocial, tipo, telefono, direccion, cuentaCorriente)];
    }
}
exports.CreateProveedor = CreateProveedor;
