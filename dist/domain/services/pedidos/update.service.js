"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePedido = void 0;
class UpdatePedido {
    constructor(fechaCambio, usuarioIngresa, estado, nombreUsuario, correoUsuario, telefonoUsuario, documentoUsuario, direccionUsuario, fechaEntrega, Total) {
        this.fechaCambio = fechaCambio;
        this.usuarioIngresa = usuarioIngresa;
        this.estado = estado;
        this.nombreUsuario = nombreUsuario;
        this.correoUsuario = correoUsuario;
        this.telefonoUsuario = telefonoUsuario;
        this.documentoUsuario = documentoUsuario;
        this.direccionUsuario = direccionUsuario;
        this.fechaEntrega = fechaEntrega;
        this.Total = Total;
    }
    get values() {
        const returnObj = {};
        this.fechaCambio && (returnObj.fechaCambio = this.fechaCambio);
        this.usuarioIngresa && (returnObj.usuarioIngresa = this.usuarioIngresa);
        this.estado && (returnObj.estado = this.estado);
        this.nombreUsuario && (returnObj.nombreUsuario = this.nombreUsuario);
        this.correoUsuario && (returnObj.correoUsuario = this.correoUsuario);
        this.telefonoUsuario && (returnObj.telefonoUsuario = this.telefonoUsuario);
        this.documentoUsuario && (returnObj.documentoUsuario = this.documentoUsuario);
        this.direccionUsuario && (returnObj.direccionUsuario = this.direccionUsuario);
        this.fechaEntrega && (returnObj.fechaEntrega = this.fechaEntrega);
        this.Total && (returnObj.Total = this.Total);
        return returnObj;
    }
    static create(props) {
        const { id, fechaCambio, usuarioIngresa, estado, nombreUsuario, correoUsuario, telefonoUsuario, documentoUsuario, direccionUsuario, fechaEntrega, Total } = props;
        if (!id)
            return ['id es requerido'];
        return [undefined, new UpdatePedido(new Date(fechaCambio), usuarioIngresa, estado, nombreUsuario, correoUsuario, telefonoUsuario, documentoUsuario, direccionUsuario, new Date(fechaEntrega), Total)];
    }
}
exports.UpdatePedido = UpdatePedido;
