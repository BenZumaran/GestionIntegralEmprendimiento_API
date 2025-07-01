export class UpdateProducto {
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

        this.nombre && (returnObj.nombre = this.nombre);
        this.descripcion && (returnObj.descripcion = this.descripcion);
        this.precio && (returnObj.precio = this.precio);
        this.tipo && (returnObj.tipo = this.tipo);
        this.estado !== null && this.estado !== undefined && (returnObj.estado = this.estado);
        this.unidadMedida && (returnObj.unidadMedida = this.unidadMedida);
        this.rucProveedor && (returnObj.rucProveedor = this.rucProveedor);

        return returnObj;

    }

    static create( props: {[key: string]: any} ): [string?, UpdateProducto?] {
        const { id, nombre, descripcion, precio, tipo, estado, unidadMedida, rucProveedor } = props;
        if (!id) return ['id is required', undefined];
        

        return [undefined, new UpdateProducto(nombre, descripcion, precio, tipo, estado, unidadMedida, rucProveedor)];
    }
}