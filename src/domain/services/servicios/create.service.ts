export class CreateServicio {
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

    static create( props: {[key: string]: any} ): [string?, CreateServicio?] {
        const { nombre, descripcion, precio, tipo, estado } = props;

        if (!nombre) return ['nombre is required', undefined];
        if (!descripcion) return ['descripcion is required', undefined];
        if (!precio) return ['precio is required', undefined];
        if (!tipo) return ['tipo is required', undefined];
        

        return [undefined, new CreateServicio(nombre, descripcion, precio, tipo, true)];
    }
}