"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProveedor = void 0;
class UpdateProveedor {
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
        this.razonSocial && (returnObj.razonSocial = this.razonSocial);
        this.tipo && (returnObj.tipo = this.tipo);
        this.telefono && (returnObj.telefono = this.telefono);
        this.direccion && (returnObj.direccion = this.direccion);
        this.cuentaCorriente && (returnObj.cuentaCorriente = this.cuentaCorriente);
        return returnObj;
    }
    static create(props) {
        const { ruc, razonSocial, telefono, direccion, tipo, cuentaCorriente } = props;
        if (!ruc)
            return ['ruc is required', undefined];
        return [undefined, new UpdateProveedor(ruc, razonSocial, tipo, telefono, direccion, cuentaCorriente)];
    }
}
exports.UpdateProveedor = UpdateProveedor;
