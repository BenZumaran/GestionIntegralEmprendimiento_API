export class UpdateProductoToAlmacen {
    constructor(
        public readonly almacen:string,
        public readonly producto:string,
        public readonly cantidad:number,
        public readonly fechaIngreso:string,
    ) {}

    get values(){
        const returnObj:{[key:string]:any} = {};

        returnObj.cantidad = this.cantidad;

        return returnObj;

    }

    static create( props: {[key: string]: any} ): [string?, UpdateProductoToAlmacen?] {
        const { almacen, producto, cantidad, fechaIngreso } = props;

        if (!almacen) return ['almacen is required', undefined];
        if (!producto) return ['producto is required', undefined];
        if (!cantidad) return ['cantidad is required', undefined];
        

        return [undefined, new UpdateProductoToAlmacen(almacen, producto, cantidad, fechaIngreso)];
    }
}