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
exports.ServiciosController = void 0;
const client_1 = require("@prisma/client");
const create_service_1 = require("../../services/servicios/create.service");
const update_service_1 = require("../../services/servicios/update.service");
const insertProductToService_service_1 = require("../../services/servicios/insertProductToService.service");
const updateProductToService_service_1 = require("../../services/servicios/updateProductToService.service");
const prisma = new client_1.PrismaClient();
class ServiciosController {
    constructor() {
        //* DI
        // constructor(){}
        this.getServicios = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const servicios = yield prisma.servicios.findMany({
                orderBy: {
                    createdAt: 'asc'
                }
            });
            return res.json(servicios);
        });
        this.getServiciosInPedidos = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const servicios = yield prisma.pedidoServicios.findMany();
            return res.json(servicios);
        });
        this.getServicioById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            if (!id)
                return res.status(400).json({ error: "Id is required" });
            const servicio = yield prisma.servicios.findFirst({
                where: { id },
            });
            servicio
                ? res.json(servicio)
                : res.status(404).json({ error: `servicio with id ${id} not found` });
        });
        this.createServicio = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const [error, createservicio] = create_service_1.CreateServicio.create(req.body);
            if (error)
                return res.status(400).json({ error });
            if (yield prisma.tipos.findFirst({
                where: { id: createservicio.tipo },
            })) {
                const servicio = yield prisma.servicios.create({
                    data: createservicio,
                });
                res.json(servicio);
            }
            else {
                res
                    .status(404)
                    .json({ error: `tipo with id ${createservicio.tipo} not found` });
            }
        });
        this.updateServicio = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const [error, updateservicio] = update_service_1.UpdateServicio.create(Object.assign(Object.assign({}, req.body), { id }));
            if (error)
                return res.status(400).json({ error });
            const updatedservicio = yield prisma.servicios.update({
                where: { id },
                data: updateservicio.values,
            });
            if (!updatedservicio)
                return res
                    .status(404)
                    .json({ error: `servicio with id ${id} not found` });
            res.json(updatedservicio);
        });
        this.insertProductoToServicio = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const [error, insertProductToService] = insertProductToService_service_1.InsertProductToService.create(req.body);
            if (error)
                return res.status(400).json({ error });
            const productToService = yield prisma.productosServicio.create({
                data: insertProductToService,
            });
            res.json(productToService);
        });
        this.updateProductoInServicio = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const [error, updateProductToService] = updateProductToService_service_1.UpdateProductoToService.create(Object.assign(Object.assign({}, req.body), { id }));
            if (error)
                return res.status(400).json({ error });
            const updatedProducto = yield prisma.productosServicio.updateMany({
                where: {
                    servicio: id,
                    producto: updateProductToService.producto,
                },
                data: updateProductToService.values,
            });
            if (!updatedProducto)
                return res.status(404).json({
                    error: `producto with id ${updateProductToService.producto} not found in servicio with id ${id}`,
                });
            res.json(updatedProducto);
        });
        this.deleteProductoFromServicio = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const servicio = req.params.servicio;
            const producto = req.params.producto;
            if (!servicio)
                return res.status(400).json({ error: "servicio is required" });
            if (!producto)
                return res.status(400).json({ error: "producto is required" });
            const productoInServicio = yield prisma.productosServicio.deleteMany({
                where: { servicio, producto },
            });
            if (!servicio)
                return res.status(404).json({
                    error: `producto with id ${producto} not found servicio with id ${servicio}`,
                });
            res.json(productoInServicio);
        });
        this.getServiciosWithProductos = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const servicios = yield prisma.productosServicio.findMany();
            return res.json(servicios);
        });
        this.deleteServicio = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            if (!id)
                return res.status(400).json({ error: "Id is required" });
            const servicio = yield prisma.servicios.delete({
                where: { id },
            });
            if (!servicio)
                return res
                    .status(404)
                    .json({ error: `servicio with id ${id} not found` });
            res.json(servicio);
        });
    }
}
exports.ServiciosController = ServiciosController;
