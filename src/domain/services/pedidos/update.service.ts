

export class UpdatePedido {
    constructor(
        public readonly fechaCambio:Date,
        public readonly usuarioIngresa:string,
        public readonly estado:number,
        public readonly nombreUsuario:string,
        public readonly correoUsuario:string,
        public readonly telefonoUsuario:string,
        public readonly documentoUsuario:string,
        public readonly direccionUsuario:string,        
        public readonly fechaEntrega:Date,
        public readonly Total:number,
    ) {}

    get values(){

        const returnObj: {[key:string]:any} = {}

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

    static create( props: {[key: string]: any} ): [string?, UpdatePedido?] {
        const { id,fechaCambio, usuarioIngresa, estado,nombreUsuario,correoUsuario,telefonoUsuario,documentoUsuario,direccionUsuario,
            fechaEntrega, Total } = props;
        
        if(!id) return ['id es requerido'];

        return [undefined, new UpdatePedido(new Date(fechaCambio),usuarioIngresa,estado,nombreUsuario,correoUsuario,telefonoUsuario,documentoUsuario,direccionUsuario
            ,new Date(fechaEntrega),Total)];
    }
}