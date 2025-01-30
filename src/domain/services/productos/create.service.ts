export class CreateProducto {
    constructor(
        public readonly nombre :string,
        public readonly descripcion :string,
        public readonly precio :number,
        public readonly tipo :number,
        public readonly estado :boolean,
        public readonly unidadMedida :string,
        public readonly rucProveedor? :string,
    ) {}

    get values(){
        const returnObj:{[key:string]:any} = {};

        returnObj.nombre = this.nombre;
        returnObj.descripcion = this.descripcion;
        returnObj.precio = this.precio;
        returnObj.tipo = this.tipo;
        returnObj.estado = this.estado;
        returnObj.unidadMedida = this.unidadMedida;
        this.rucProveedor && (returnObj.rucProveedor = this.rucProveedor);

        return returnObj;

    }

    static create( props: {[key: string]: any} ): [string?, CreateProducto?] {
        const { nombre, descripcion, precio, tipo, estado, unidadMedida, rucProveedor } = props;
        if (!nombre) return ['nombre is required', undefined];
        if (!descripcion) return ['descripcion is required', undefined];
        if (!precio) return ['precio is required', undefined];
        if (!tipo) return ['tipo is required', undefined];
        if (!unidadMedida) return ['unidadMedida is required', undefined];
        

        return [undefined, new CreateProducto(nombre, descripcion, precio, tipo, true, unidadMedida, rucProveedor)];
    }
}