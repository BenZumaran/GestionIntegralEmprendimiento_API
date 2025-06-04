"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUsuario = void 0;
class UpdateUsuario {
    constructor(id, correo, nombre, tipoUsuario, clave, nombreUsuario, telefono, direccion, fechaNacimiento, tipoDocumento, numeroDocumento) {
        this.id = id;
        this.correo = correo;
        this.nombre = nombre;
        this.tipoUsuario = tipoUsuario;
        this.clave = clave;
        this.nombreUsuario = nombreUsuario;
        this.telefono = telefono;
        this.direccion = direccion;
        this.fechaNacimiento = fechaNacimiento;
        this.tipoDocumento = tipoDocumento;
        this.numeroDocumento = numeroDocumento;
    }
    get values() {
        const returnObj = {};
        this.correo && (returnObj.correo = this.correo);
        this.nombre && (returnObj.nombre = this.nombre);
        this.tipoUsuario && (returnObj.tipoUsuario = this.tipoUsuario);
        this.clave && (returnObj.clave = this.clave);
        this.nombreUsuario && (returnObj.nombreUsuario = this.nombreUsuario);
        this.telefono && (returnObj.telefono = this.telefono);
        this.direccion && (returnObj.direccion = this.direccion);
        this.fechaNacimiento && (returnObj.fechaNacimiento = this.fechaNacimiento);
        this.tipoDocumento && (returnObj.tipoDocumento = this.tipoDocumento);
        this.numeroDocumento && (returnObj.numeroDocumento = this.numeroDocumento);
        return returnObj;
    }
    static create(props) {
        const { id, correo, nombre, tipoUsuario, clave, nombreUsuario, telefono, direccion, fechaNacimiento, tipoDocumento, numeroDocumento } = props;
        if (!id)
            return ['id is required', undefined];
        return [undefined, new UpdateUsuario(id, correo, nombre, tipoUsuario, clave, nombreUsuario, telefono, direccion, fechaNacimiento, tipoDocumento, numeroDocumento)];
    }
}
exports.UpdateUsuario = UpdateUsuario;
