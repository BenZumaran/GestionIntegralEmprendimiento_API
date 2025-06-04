"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePedidoDetalle = void 0;
class CreatePedidoDetalle {
    constructor(cantidad, pedido, tipo, servicio, producto) {
        this.cantidad = cantidad;
        this.pedido = pedido;
        this.tipo = tipo;
        this.servicio = servicio;
        this.producto = producto;
    }
    get values() {
        const returnObj = {};
        if (this.tipo === 'servicio') {
            returnObj.servicio = this.servicio;
            returnObj.cantidad = this.cantidad;
            returnObj.pedido = this.pedido;
        }
        if (this.tipo === 'producto') {
            returnObj.producto = this.producto;
            returnObj.cantidad = this.cantidad;
            returnObj.pedido = this.pedido;
        }
        return returnObj;
    }
    static create(props) {
        const { cantidad, tipo, servicio, producto } = props;
        if (!cantidad)
            return ['cantidad is required', undefined];
        if (!tipo)
            return ['tipo is required', undefined];
        return [undefined, new CreatePedidoDetalle(cantidad, tipo, servicio, producto)];
    }
}
exports.CreatePedidoDetalle = CreatePedidoDetalle;
