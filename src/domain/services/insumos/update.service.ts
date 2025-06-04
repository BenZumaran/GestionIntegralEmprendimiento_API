export class UpdateInsumo {
    constructor(
        public readonly nombre :string ,
        public readonly descripcion :string,
        public readonly precio :number,
        public readonly tipoInsumo :number ,
        public readonly unidadMedida :string ,
        public readonly duracion :number ,
        public readonly rucProveedor? :string,
        public readonly tipoAlmacen? :number,
    ) {}

    get values(){
        const returnObj:{[key:string]:any} = {};

        this.nombre && (returnObj.nombre = this.nombre);
        this.descripcion && (returnObj.descripcion = this.descripcion);
        this.tipoInsumo && (returnObj.tipoInsumo = this.tipoInsumo);
        this.unidadMedida && (returnObj.unidadMedida = this.unidadMedida);
        this.duracion && (returnObj.duracion = this.duracion);
        this.rucProveedor && (returnObj.direccion = this.rucProveedor);
        this.tipoAlmacen && (returnObj.cuentaCorriente = this.tipoAlmacen);

        return returnObj;

    }

    static create( props: {[key: string]: any} ): [string?, UpdateInsumo?] {
        const { id, nombre, descripcion,precio, tipoInsumo, unidadMedida, duracion, rucProveedor, tipoAlmacen } = props;

        if (!id) return ['id is required', undefined];

        return [undefined, new UpdateInsumo(nombre, descripcion, precio, tipoInsumo, unidadMedida, duracion, rucProveedor, tipoAlmacen)];
    }
}