"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUsuario = void 0;
class CreateUsuario {
    constructor(correo, nombre, tipoUsuario, clave, nombreUsuario, telefono, direccion, fechaNacimiento, tipoDocumento, numeroDocumento) {
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
        returnObj.correo = this.correo;
        returnObj.nombre = this.nombre;
        returnObj.tipoUsuario = this.tipoUsuario;
        returnObj.clave = this.clave;
        this.nombreUsuario && (returnObj.nombreUsuario = this.nombreUsuario);
        this.telefono && (returnObj.telefono = this.telefono);
        this.direccion && (returnObj.direccion = this.direccion);
        this.fechaNacimiento && (returnObj.fechaNacimiento = this.fechaNacimiento);
        this.tipoDocumento && (returnObj.tipoDocumento = this.tipoDocumento);
        this.numeroDocumento && (returnObj.numeroDocumento = this.numeroDocumento);
        return returnObj;
    }
    static create(props) {
        const { correo, nombre, tipoUsuario, clave, nombreUsuario, telefono, direccion, fechaNacimiento, tipoDocumento, numeroDocumento } = props;
        if (!correo)
            return ['correo is required', undefined];
        if (!nombre)
            return ['nombre is required', undefined];
        if (!tipoUsuario)
            return ['tipoUsuario is required', undefined];
        if (!clave)
            return ['clave is required', undefined];
        return [undefined, new CreateUsuario(correo, nombre, tipoUsuario, clave, nombreUsuario, telefono, direccion, new Date(fechaNacimiento), tipoDocumento, numeroDocumento)];
    }
}
exports.CreateUsuario = CreateUsuario;
