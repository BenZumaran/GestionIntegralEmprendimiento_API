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
exports.AlmacenController = void 0;
const client_1 = require("@prisma/client");
const create_service_1 = require("../../services/almacen/create.service");
const update_service_1 = require("../../services/almacen/update.service");
const prisma = new client_1.PrismaClient();
class AlmacenController {
    constructor() {
        //* DI
        // constructor(){}
        //Cubrir deuda técnica con adaptadores
        this.getAlmacenes = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const almacen = yield prisma.almacen.findMany({
                orderBy: {
                    nombre: 'asc'
                }
            });
            return res.json(almacen);
        });
        this.getAlmacenById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            if (!id)
                return res.status(400).json({ error: 'id is required' });
            const almacen = yield prisma.almacen.findFirst({
                where: { id }
            });
            (almacen)
                ? res.json(almacen)
                : res.status(404).json({ error: `Almacen with id ${id} not found` });
        });
        this.createAlmacen = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const [error, createAlmacen] = create_service_1.CreateAlmacen.create(req.body);
            if (error)
                return res.status(400).json({ error });
            const almacen = yield prisma.almacen.create({
                data: createAlmacen
            });
            res.json(almacen);
        });
        this.updateAlmacen = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const [error, updateAlmacen] = update_service_1.UpdateAlmacen.create(Object.assign(Object.assign({}, req.body), { id }));
            if (error)
                return res.status(400).json({ error });
            const updatedAlmacen = yield prisma.almacen.update({
                where: { id },
                data: updateAlmacen.values
            });
            if (!updatedAlmacen)
                return res.status(404).json({ error: `Almacen with id ${id} not found` });
            res.json(updatedAlmacen);
        });
        this.getProductosAlmacenId = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            if (!id)
                return res.status(400).json({ error: 'id is required' });
            const almacen = yield prisma.almacenProductos.findMany({
                where: { producto: id }, include: {
                    Producto: true,
                    Almacen: true
                }
            });
            res.json(almacen);
        });
        this.getInsumosAlmacenId = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = +req.params.id;
            if (!id)
                return res.status(400).json({ error: 'id is required' });
            const almacen = yield prisma.almacenInsumos.findMany({
                where: { insumo: id }
            });
            res.json(almacen);
        });
        this.getProductosAlmacen = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const almacen = yield prisma.almacenProductos.findMany({
                include: {
                    Producto: true,
                    Almacen: true
                }
            });
            res.json(almacen);
        });
        this.getInsumosAlmacen = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const almacen = yield prisma.almacenInsumos.findMany({
                orderBy: {
                    fechaIngreso: 'asc'
                }
            });
            res.json(almacen);
        });
    }
}
exports.AlmacenController = AlmacenController;
