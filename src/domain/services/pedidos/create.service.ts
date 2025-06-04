export class CreatePedido {
    constructor(
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

    static create( props: {[key: string]: any} ): [string?, CreatePedido?] {
        const { usuarioIngresa, estado,nombreUsuario,correoUsuario,telefonoUsuario,documentoUsuario,direccionUsuario,
            fechaEntrega, Total } = props;
        if (!usuarioIngresa) return ['usuarioIngresa is required', undefined];
        if (!estado) return ['estado is required', undefined];
        if (!nombreUsuario) return ['nombreUsuario is required', undefined];
        if (!correoUsuario) return ['correoUsuario is required', undefined];
        if (!telefonoUsuario) return ['telefonoUsuario is required', undefined];
        if (!documentoUsuario) return ['documentoUsuario is required', undefined];
        if (!direccionUsuario) return ['direccionUsuario is required', undefined];
        if (!fechaEntrega) return ['fechaEntrega is required', undefined];
        if (!Total) return ['Total is required', undefined];
        return [undefined, new CreatePedido(usuarioIngresa,estado,nombreUsuario,correoUsuario,telefonoUsuario,documentoUsuario,direccionUsuario
            ,new Date(fechaEntrega),Total)];
    }
}