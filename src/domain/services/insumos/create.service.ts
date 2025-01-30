export class CreateInsumo {
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

        returnObj.nombre = this.nombre;
        returnObj.descripcion = this.descripcion;
        returnObj.tipoInsumo = this.tipoInsumo;
        returnObj.unidadMedida = this.unidadMedida;
        returnObj.duracion = this.duracion;
        this.rucProveedor && (returnObj.direccion = this.rucProveedor);
        this.tipoAlmacen && (returnObj.cuentaCorriente = this.tipoAlmacen);

        return returnObj;

    }

    static create( props: {[key: string]: any} ): [string?, CreateInsumo?] {
        const { nombre, descripcion,precio, tipoInsumo, unidadMedida, duracion, rucProveedor, tipoAlmacen } = props;
        if (!nombre) return ['nombre is required', undefined];
        if (!descripcion) return ['descripcion is required', undefined];
        if (!precio) return ['precio is required', undefined];
        if (!tipoInsumo) return ['tipoInsumo is required', undefined];
        if (!unidadMedida) return ['unidadMedida is required', undefined];
        if (!duracion) return ['duracion is required', undefined];
        return [undefined, new CreateInsumo(nombre, descripcion, precio, tipoInsumo, unidadMedida, duracion, rucProveedor, tipoAlmacen)];
    }
}