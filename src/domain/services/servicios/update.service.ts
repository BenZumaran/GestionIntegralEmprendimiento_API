export class UpdateServicio {
    constructor(
        public readonly nombre:string,
        public readonly descripcion:string,
        public readonly precio:number,
        public readonly tipo:number,
        public readonly estado:boolean,
    ) {}

    get values(){
        const returnObj:{[key:string]:any} = {};

        this.nombre && (returnObj.nombre = this.nombre);
        this.descripcion && (returnObj.descripcion = this.descripcion);
        this.precio && (returnObj.precio = this.precio);
        this.tipo && (returnObj.tipo = this.tipo);
        this.estado && (returnObj.estado = this.estado);

        return returnObj;

    }

    static create( props: {[key: string]: any} ): [string?, UpdateServicio?] {
        const { id, nombre, descripcion, precio, tipo, estado } = props;

        if (!id) return ['id is required', undefined];

        return [undefined, new UpdateServicio(nombre, descripcion, precio, tipo, estado)];
    }
}