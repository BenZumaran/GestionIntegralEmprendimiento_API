export class InsertInsumoToProducto {
    constructor(
        public readonly producto:string,
        public readonly insumo:number,
        public readonly cantidad:number,
    ) {}

    get values(){
        const returnObj:{[key:string]:any} = {};

        returnObj.producto = this.producto;
        returnObj.insumo = this.insumo;
        returnObj.cantidad = this.cantidad;

        return returnObj;

    }

    static create( props: {[key: string]: any} ): [string?, InsertInsumoToProducto?] {
        const { producto, insumo, cantidad } = props;

        if (!producto) return ['producto is required', undefined];
        if (!insumo) return ['insumo is required', undefined];
        if (!cantidad) return ['cantidad is required', undefined];
        

        return [undefined, new InsertInsumoToProducto(producto, insumo, cantidad)];
    }
}