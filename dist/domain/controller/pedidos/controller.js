"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PedidosController = void 0;
const client_1 = require("@prisma/client");
const create_service_1 = require("../../services/pedidos/create.service");
const update_service_1 = require("../../services/pedidos/update.service");
const prisma = new client_1.PrismaClient();
class PedidosController {
    constructor() {
        //* DI
        // constructor(){}
        //Cubrir deuda técnica con adaptadores
        this.getPedidos = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const Pedido = yield prisma.pedidos.findMany({
                orderBy: {
                    createdAt: 'asc'
                }
            });
            return res.json(Pedido);
        });
        this.getPedidoById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            if (!id)
                return res.status(400).json({ error: 'Id is required' });
            const pedido = yield prisma.pedidos.findFirst({
                where: { id }
            });
            const detalleProductos = yield prisma.pedidoProductos.findMany({
                where: { pedido: id }
            });
            const detalleServicios = yield prisma.pedidoServicios.findMany({
                where: { pedido: id }
            });
            const resObj = {};
            resObj.pedido = pedido;
            detalleProductos.length > 0 && (resObj.detalleProductos = detalleProductos);
            detalleServicios.length > 0 && (resObj.detalleServicios = detalleServicios);
            (pedido)
                ? res.json(resObj)
                : res.status(404).json({ error: `pedido with id ${id} not found` });
        });
        this.getPedidoWithDetalleById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            if (!id)
                return res.status(400).json({ error: 'Id is required' });
            const pedido = yield prisma.pedidos.findFirst({
                where: { id }
            });
            (pedido)
                ? res.json(pedido)
                : res.status(404).json({ error: `pedido with id ${id} not found` });
        });
        this.createPedido = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const [error, createPedido] = create_service_1.CreatePedido.create(req.body.pedido);
            if (error)
                return res.status(400).json({ error });
            const Pedido = yield prisma.pedidos.create({
                data: createPedido
            });
            let resDetalle = null;
            if (Pedido) {
                resDetalle = yield this.createDetalle(req.body.detallePedido, Pedido.id);
                if (!resDetalle) {
                    return res.status(400).json({ error: 'Error al crear detalle' });
                }
            }
            res.json(Pedido);
        });
        this.createDetalle = (detallePedido, pedido) => {
            let detalle = [];
            detallePedido.forEach((detPedido) => __awaiter(this, void 0, void 0, function* () {
                if (detPedido.tipo == 'producto') {
                    detalle.push(yield prisma.pedidoProductos.create({
                        data: {
                            cantidad: detPedido.cantidad,
                            producto: detPedido.producto,
                            pedido: pedido,
                        }
                    }));
                }
                if (detPedido.tipo == 'servicio') {
                    detalle.push(yield prisma.pedidoServicios.create({
                        data: {
                            cantidad: detPedido.cantidad,
                            servicio: detPedido.servicio,
                            pedido: pedido,
                        }
                    }));
                }
            }));
            return detalle;
        };
        this.addDetalle = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const pedido = req.params.pedido;
            const { cantidad, producto, servicio } = req.body;
            let detalle = null;
            if (producto) {
                detalle = yield prisma.pedidoProductos.create({
                    data: {
                        cantidad: cantidad,
                        producto: producto,
                        pedido: pedido,
                    }
                });
            }
            if (servicio) {
                const { cantidad, servicio } = req.body;
                detalle = yield prisma.pedidoServicios.create({
                    data: {
                        cantidad: cantidad,
                        servicio: servicio,
                        pedido: pedido,
                    }
                });
            }
            detalle ? res.json(detalle) : res.status(400).json({ error: 'Error al agregar' });
        });
        this.updateDetalle = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { pedido, producto, servicio, cantidad } = req.body;
            const resPedido = null;
            if (producto !== null || producto !== undefined || producto !== '') {
                const resPedido = yield prisma.pedidoProductos.updateMany({
                    where: { pedido, producto },
                    data: {
                        cantidad
                    }
                });
                if (!resPedido)
                    return res.status(404).json({ error: `pedido with id ${pedido} not found` });
            }
            if (servicio !== null || servicio !== undefined || servicio !== '') {
                const resPedido = yield prisma.pedidoServicios.updateMany({
                    where: { pedido, servicio },
                    data: {
                        cantidad
                    }
                });
                if (!resPedido)
                    return res.status(404).json({ error: `pedido with id ${pedido} not found` });
            }
            res.json(resPedido);
        });
        this.deleteDetalle = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const pedido = req.params.pedido;
            const { producto, servicio } = req.body;
            const resPedido = null;
            if (producto) {
                const resPedido = yield prisma.pedidoProductos.deleteMany({
                    where: { pedido, producto }
                });
                if (!resPedido)
                    return res.status(404).json({ error: `pedido with id ${pedido} not found` });
            }
            if (servicio) {
                const resPedido = yield prisma.pedidoServicios.deleteMany({
                    where: { pedido, servicio }
                });
                if (!resPedido)
                    return res.status(404).json({ error: `pedido with id ${pedido} not found` });
            }
            res.json(resPedido);
        });
        this.updatePedido = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const [error, updatePedido] = update_service_1.UpdatePedido.create(Object.assign(Object.assign({}, req.body), { id }));
            if (error)
                return res.status(400).json({ error });
            const updatedpedido = yield prisma.pedidos.update({
                where: { id },
                data: updatePedido.values
            });
            if (!updatedpedido)
                return res.status(404).json({ error: `pedido with id ${id} not found` });
            res.json(updatedpedido);
        });
        this.deletePedido = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const updatedpedido = yield prisma.pedidos.delete({
                where: { id }
            });
            if (!updatedpedido)
                return res.status(404).json({ error: `pedido with id ${id} not found` });
            res.json(updatedpedido);
        });
    }
}
exports.PedidosController = PedidosController;
