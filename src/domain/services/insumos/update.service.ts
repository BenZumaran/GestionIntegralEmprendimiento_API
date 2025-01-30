export class UpdateInsumo {
    constructor(
        public readonly nombre:string,
        public readonly descripcion:string,
        public readonly precio:number,
        public readonly tipo:number,
        public readonly estado:boolean,
    ) {}

    get values(){
        const returnObj:{[key:string]:any} = {};

        returnObj.nombre = this.nombre;
        returnObj.descripcion = this.descripcion;
        returnObj.precio = this.precio;
        returnObj.tipo = this.tipo;
        returnObj.estado = this.estado;

        return returnObj;

    }

    static create( props: {[key: string]: any} ): [string?, UpdateInsumo?] {
        const { id, nombre, descripcion, precio, tipo, estado } = props;

        if (!id) return ['id is required', undefined];

        return [undefined, new UpdateInsumo(nombre, descripcion, precio, tipo, estado)];
    }
}