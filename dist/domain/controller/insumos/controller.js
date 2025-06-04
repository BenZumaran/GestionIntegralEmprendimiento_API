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
exports.InsumosController = void 0;
const client_1 = require("@prisma/client");
const create_service_1 = require("../../services/insumos/create.service");
const update_service_1 = require("../../services/insumos/update.service");
const sql_1 = require("@prisma/client/sql");
const insertInsumoToAlmacen_service_1 = require("../../services/insumos/insertInsumoToAlmacen.service");
const updateInsumoToAlmacen_service_1 = require("../../services/insumos/updateInsumoToAlmacen.service");
const prisma = new client_1.PrismaClient();
class InsumosController {
    constructor() {
        //* DI
        // constructor(){}
        //Cubrir deuda técnica con adaptadores
        this.getInsumos = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const Insumos = yield prisma.insumos.findMany({
                orderBy: {
                    createdAt: 'asc'
                }
            });
            return res.json(Insumos);
        });
        this.getInsumosById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = +req.params.id;
            if (!id)
                return res.status(400).json({ error: 'id is required' });
            const Insumos = yield prisma.insumos.findFirst({
                where: { id }
            });
            (Insumos)
                ? res.json(Insumos)
                : res.status(404).json({ error: `Insumos with id ${id} not found` });
        });
        this.createInsumos = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const [error, createInsumos] = create_service_1.CreateInsumo.create(req.body);
            if (error)
                return res.status(400).json({ error });
            const Insumos = yield prisma.insumos.create({
                data: createInsumos
            });
            res.json(Insumos);
        });
        this.updateInsumos = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = +req.params.id;
            const [error, updateInsumos] = update_service_1.UpdateInsumo.create(Object.assign(Object.assign({}, req.body), { id }));
            if (error)
                return res.status(400).json({ error });
            const updatedInsumos = yield prisma.insumos.update({
                where: { id },
                data: updateInsumos.values
            });
            if (!updatedInsumos)
                return res.status(404).json({ error: `Insumos with id ${id} not found` });
            res.json(updatedInsumos);
        });
        this.getInsumosInProducto = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            if (!id)
                return res.status(400).json({ error: "prodcuto id is required" });
            const insumosInProducto = yield prisma.$queryRawTyped((0, sql_1.getInsumosInProducto)(id));
            insumosInProducto
                ? res.json(insumosInProducto)
                : res.status(404).json({
                    error: `not found insumos in prodcuto with id ${id}`,
                });
        });
        this.insertInsumoToAlmacen = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const [error, insertInsumoToAlmacen] = insertInsumoToAlmacen_service_1.InsertInsumoToAlmacen.create(req.body);
            if (error)
                return res.status(400).json({ error });
            const insumoToAlmacen = yield prisma.almacenInsumos.create({
                data: insertInsumoToAlmacen,
            });
            res.json(insumoToAlmacen);
        });
        this.updateInsumoToAlmacen = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const [error, updateInsumotoToAlmacen] = updateInsumoToAlmacen_service_1.UpdateInsumoToAlmacen.create(Object.assign({}, req.body));
            if (error)
                return res.status(400).json({ error });
            const updatedProducto = yield prisma.almacenInsumos.updateMany({
                where: {
                    insumo: updateInsumotoToAlmacen.insumo,
                    almacen: updateInsumotoToAlmacen.almacen,
                },
                data: {
                    cantidad: updateInsumotoToAlmacen.cantidad,
                }
            });
            if (!updatedProducto)
                return res.status(404).json({ error: `insumo with id ${updateInsumotoToAlmacen === null || updateInsumotoToAlmacen === void 0 ? void 0 : updateInsumotoToAlmacen.insumo} not found` });
            res.json(updatedProducto);
        });
    }
}
exports.InsumosController = InsumosController;
