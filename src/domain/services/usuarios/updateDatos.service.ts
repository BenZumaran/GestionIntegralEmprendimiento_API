export class UpdateDatosUsuario {
    constructor(
        public readonly id:string,
        public readonly correo?:string,
        public readonly nombre?:string,
        public readonly nombreUsuario?:string,
        public readonly telefono?:string,
        public readonly direccion?:string,
        public readonly fechaNacimiento?:Date,
        public readonly numeroDocumento?:string,
    ) {}

    get values(){
        const returnObj:{[key:string]:any} = {};

        this.correo && (returnObj.correo = this.correo);
        this.nombre && (returnObj.nombre = this.nombre);
        this.nombreUsuario && (returnObj.nombreUsuario = this.nombreUsuario);
        this.telefono && (returnObj.telefono = this.telefono);
        this.direccion && (returnObj.direccion = this.direccion);
        this.fechaNacimiento && (returnObj.fechaNacimiento = this.fechaNacimiento);
        this.numeroDocumento && (returnObj.numeroDocumento = this.numeroDocumento);

        return returnObj;

    }

    static create( props: {[key: string]: any} ): [string?, UpdateDatosUsuario?] {
        const { id,correo,nombre,nombreUsuario,telefono,direccion,fechaNacimiento,numeroDocumento } = props;
        if (!id) return ['id is required', undefined];

        return [undefined, new UpdateDatosUsuario(id, correo,nombre,nombreUsuario,telefono,direccion,fechaNacimiento,numeroDocumento)];
    }
}