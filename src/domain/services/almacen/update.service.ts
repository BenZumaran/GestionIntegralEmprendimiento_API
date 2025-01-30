export class UpdateAlmacen {
    constructor(
        public readonly id:string,
        public readonly nombre:string,
        public readonly capacidad:number,
        public readonly dimensiones:number,
        public readonly tipo:number,
        public readonly ubicacion:string,
    ) {}

    get values(){
        const returnObj:{[key:string]:any} = {};

        this.nombre && (returnObj.nombre = this.nombre);
        this.capacidad && (returnObj.capacidad = this.capacidad);
        this.dimensiones && (returnObj.dimensiones = this.dimensiones);
        this.tipo && (returnObj.tipo = this.tipo);
        this.ubicacion && (returnObj.ubicacion = this.ubicacion);

        return returnObj;

    }

    static create( props: {[key: string]: any} ): [string?, UpdateAlmacen?] {
        const { id, nombre, capacidad, dimensiones, tipo, ubicacion } = props;
        if (!id) return ['id is required', undefined];

        return [undefined, new UpdateAlmacen(id, nombre, capacidad, dimensiones, tipo, ubicacion)];
    }
}