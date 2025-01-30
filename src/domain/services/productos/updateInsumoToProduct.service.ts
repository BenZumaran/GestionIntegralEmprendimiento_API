export class UpdateInsumoToProducto {
    constructor(
        public readonly producto:string,
        public readonly insumo:number,
        public readonly cantidad:number,
    ) {}

    get values(){
        const returnObj:{[key:string]:any} = {};

        returnObj.cantidad = this.cantidad;

        return returnObj;

    }

    static create( props: {[key: string]: any} ): [string?, UpdateInsumoToProducto?] {
        const { producto, insumo, cantidad } = props;

        if (!producto) return ['producto is required', undefined];
        if (!insumo) return ['insumo is required', undefined];
        if (!cantidad) return ['cantidad is required', undefined];
        

        return [undefined, new UpdateInsumoToProducto(producto, insumo, cantidad)];
    }
}