export class InsertInsumoToAlmacen {
    constructor(
        public readonly almacen:string,
        public readonly insumo:number,
        public readonly cantidad:number,
        public readonly fechaIngreso:string,
    ) {}

    get values(){
        const returnObj:{[key:string]:any} = {};

        returnObj.almacen = this.almacen;
        returnObj.insumo = this.insumo;
        returnObj.cantidad = this.cantidad;
        returnObj.fechaIngreso && (returnObj.fechaIngreso = this.fechaIngreso);

        return returnObj;

    }

    static create( props: {[key: string]: any} ): [string?, InsertInsumoToAlmacen?] {
        const { almacen, insumo, cantidad, fechaIngreso } = props;

        if (!almacen) return ['almacen is required', undefined];
        if (!insumo) return ['insumo is required', undefined];
        if (!cantidad) return ['cantidad is required', undefined];
        

        return [undefined, new InsertInsumoToAlmacen(almacen, insumo, cantidad, fechaIngreso)];
    }
}