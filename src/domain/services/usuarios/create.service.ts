export class CreateUsuario {
    constructor(
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

    static create( props: {[key: string]: any} ): [string?, CreateUsuario?] {
        const { correo,nombre,tipoUsuario,clave,nombreUsuario,telefono,direccion,fechaNacimiento,tipoDocumento,numeroDocumento } = props;
        if (!correo) return ['correo is required', undefined];
        if (!nombre) return ['nombre is required', undefined];
        if (!tipoUsuario) return ['tipoUsuario is required', undefined];
        if (!clave) return ['clave is required', undefined];

        return [undefined, new CreateUsuario(correo,nombre,tipoUsuario,clave,nombreUsuario,telefono,direccion,new Date(fechaNacimiento),tipoDocumento,numeroDocumento)];
    }
}