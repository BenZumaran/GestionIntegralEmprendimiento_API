export class InsertProductoToAlmacen {
    constructor(
        public readonly almacen:string,
        public readonly producto:string,
        public readonly cantidad:number,
        public readonly fechaIngreso:string,
    ) {}

    get values(){
        const returnObj:{[key:string]:any} = {};

        returnObj.almacen = this.almacen;
        returnObj.producto = this.producto;
        returnObj.cantidad = this.cantidad;
        returnObj.fechaIngreso && (returnObj.fechaIngreso = this.fechaIngreso);

        return returnObj;

    }

    static create( props: {[key: string]: any} ): [string?, InsertProductoToAlmacen?] {
        const { almacen, producto, cantidad, fechaIngreso } = props;

        if (!almacen) return ['almacen is required', undefined];
        if (!producto) return ['producto is required', undefined];
        if (!cantidad) return ['cantidad is required', undefined];
        

        return [undefined, new InsertProductoToAlmacen(almacen, producto, cantidad, fechaIngreso)];
    }
}