export class UpdateProductoToService {
    constructor(
        public readonly servicio:string,
        public readonly producto:string,
        public readonly cantidad:number,
        public readonly tiempo:number,
    ) {}

    get values(){
        const returnObj:{[key:string]:any} = {};

        returnObj.cantidad = this.cantidad;
        returnObj.tiempo = this.tiempo;

        return returnObj;

    }

    static create( props: {[key: string]: any} ): [string?, UpdateProductoToService?] {
        const { servicio, producto, cantidad, tiempo } = props;

        if (!servicio) return ['servicio is required', undefined];
        if (!producto) return ['producto is required', undefined];
        if (!cantidad) return ['cantidad is required', undefined];
        if (!tiempo) return ['tiempo is required', undefined];
        

        return [undefined, new UpdateProductoToService(servicio, producto, cantidad, tiempo)];
    }
}