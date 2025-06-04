"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePedido = void 0;
class CreatePedido {
    constructor(usuarioIngresa, estado, nombreUsuario, correoUsuario, telefonoUsuario, documentoUsuario, direccionUsuario, fechaEntrega, Total) {
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
    static create(props) {
        const { usuarioIngresa, estado, nombreUsuario, correoUsuario, telefonoUsuario, documentoUsuario, direccionUsuario, fechaEntrega, Total } = props;
        if (!usuarioIngresa)
            return ['usuarioIngresa is required', undefined];
        if (!estado)
            return ['estado is required', undefined];
        if (!nombreUsuario)
            return ['nombreUsuario is required', undefined];
        if (!correoUsuario)
            return ['correoUsuario is required', undefined];
        if (!telefonoUsuario)
            return ['telefonoUsuario is required', undefined];
        if (!documentoUsuario)
            return ['documentoUsuario is required', undefined];
        if (!direccionUsuario)
            return ['direccionUsuario is required', undefined];
        if (!fechaEntrega)
            return ['fechaEntrega is required', undefined];
        if (!Total)
            return ['Total is required', undefined];
        return [undefined, new CreatePedido(usuarioIngresa, estado, nombreUsuario, correoUsuario, telefonoUsuario, documentoUsuario, direccionUsuario, new Date(fechaEntrega), Total)];
    }
}
exports.CreatePedido = CreatePedido;
