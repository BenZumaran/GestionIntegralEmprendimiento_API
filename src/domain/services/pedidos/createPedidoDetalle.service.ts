export class CreatePedidoDetalle {
    constructor(        
        public readonly cantidad: number,
        public readonly pedido: string,
        public readonly tipo: string,
        public readonly servicio?: string,
        public readonly producto?: string,
    ) {}
    get values(){

        const returnObj: {[key:string]:any} = {}
        if(this.tipo === 'servicio'){
            returnObj.servicio = this.servicio;
            returnObj.cantidad = this.cantidad;
            returnObj.pedido = this.pedido;
        }
        if(this.tipo === 'producto'){
            returnObj.producto = this.producto;
            returnObj.cantidad = this.cantidad;
            returnObj.pedido = this.pedido;
        }

        return returnObj;

    }
    static create( props: {[key: string]: any} ): [string?, CreatePedidoDetalle?] {
        const { cantidad, tipo, servicio, producto } = props;
        if (!cantidad) return ['cantidad is required', undefined];
        if (!tipo) return ['tipo is required', undefined];
        return [undefined, new CreatePedidoDetalle(cantidad, tipo, servicio, producto)];
    }
}