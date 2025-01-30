export class CreateAlmacen {
    constructor(
        public readonly nombre:string,
        public readonly capacidad:number,
        public readonly dimensiones:number,
        public readonly tipo:number,
        public readonly ubicacion:string,
    ) {}

    get values(){
        const returnObj:{[key:string]:any} = {};

        returnObj.nombre = this.nombre;
        returnObj.capacidad = this.capacidad;
        returnObj.dimensiones = this.dimensiones;
        returnObj.tipo = this.tipo;
        returnObj.ubicacion = this.ubicacion;

        return returnObj;

    }

    static create( props: {[key: string]: any} ): [string?, CreateAlmacen?] {
        const { nombre, capacidad, dimensiones, tipo, ubicacion } = props;
        if (!nombre) return ['nombre is required', undefined];
        if (!capacidad) return ['capacidad is required', undefined];
        if (!dimensiones) return ['dimensiones is required', undefined];
        if (!tipo) return ['tipo is required', undefined];
        if (!ubicacion) return ['ubicacion is required', undefined];
        return [undefined, new CreateAlmacen(nombre, capacidad, dimensiones, tipo, ubicacion)];
    }
}