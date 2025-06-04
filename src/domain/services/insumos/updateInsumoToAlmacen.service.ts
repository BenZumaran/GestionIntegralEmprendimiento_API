export class UpdateInsumoToAlmacen {
    constructor(
        public readonly almacen:string,
        public readonly insumo:number,
        public readonly cantidad:number,
        public readonly fechaIngreso:string,
    ) {}

    get values(){
        const returnObj:{[key:string]:any} = {};

        returnObj.cantidad = this.cantidad;

        return returnObj;

    }

    static create( props: {[key: string]: any} ): [string?, UpdateInsumoToAlmacen?] {
        const { almacen, insumo, cantidad, fechaIngreso } = props;

        if (!almacen) return ['almacen is required', undefined];
        if (!insumo) return ['insumo is required', undefined];
        if (!cantidad) return ['cantidad is required', undefined];
        

        return [undefined, new UpdateInsumoToAlmacen(almacen, insumo, cantidad, fechaIngreso)];
    }
}