export class UpdateUsuario {
    constructor(
        public readonly id:string,
        public readonly correo:string,
        public readonly nombre:string,
        public readonly tipoUsuario:number,
        public readonly clave:string,
        public readonly nombreUsuario?:string,
        public readonly telefono?:string,
        public readonly direccion?:string,
        public readonly fechaNacimiento?:Date,
        public readonly tipoDocumento?:number,
        public readonly numeroDocumento?:string,
    ) {}

    get values(){
        const returnObj:{[key:string]:any} = {};

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

    static create( props: {[key: string]: any} ): [string?, UpdateUsuario?] {
        const { id,correo,nombre,tipoUsuario,clave,nombreUsuario,telefono,direccion,fechaNacimiento,tipoDocumento,numeroDocumento } = props;
        if (!id) return ['id is required', undefined];

        return [undefined, new UpdateUsuario(id, correo,nombre,tipoUsuario,clave,nombreUsuario,telefono,direccion,fechaNacimiento,tipoDocumento,numeroDocumento)];
    }
}