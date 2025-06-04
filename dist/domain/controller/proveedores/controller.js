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
exports.ProveedoresController = void 0;
const client_1 = require("@prisma/client");
const create_service_1 = require("../../services/proveedores/create.service");
const update_service_1 = require("../../services/proveedores/update.service");
const prisma = new client_1.PrismaClient();
class ProveedoresController {
    constructor() {
        //* DI
        // constructor(){}
        //Cubrir deuda técnica con adaptadores
        this.getProveedores = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const proveedores = yield prisma.proveedores.findMany({
                orderBy: {
                    createdAt: 'asc'
                }
            });
            return res.json(proveedores);
        });
        this.getProveedorByRuc = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const ruc = req.params.ruc;
            if (!ruc)
                return res.status(400).json({ error: 'ruc is required' });
            const proveedor = yield prisma.proveedores.findFirst({
                where: { ruc }
            });
            (proveedor)
                ? res.json(proveedor)
                : res.status(404).json({ error: `Proveedor with ruc ${ruc} not found` });
        });
        this.createProveedor = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const [error, createProveedor] = create_service_1.CreateProveedor.create(req.body);
            if (error)
                return res.status(400).json({ error });
            const proveedor = yield prisma.proveedores.create({
                data: createProveedor
            });
            res.json(proveedor);
        });
        this.updateProveedor = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const ruc = req.params.ruc;
            const [error, updateProveedor] = update_service_1.UpdateProveedor.create(Object.assign(Object.assign({}, req.body), { ruc }));
            if (error)
                return res.status(400).json({ error });
            const updatedproveedor = yield prisma.proveedores.update({
                where: { ruc },
                data: updateProveedor.values
            });
            if (!updatedproveedor)
                return res.status(404).json({ error: `proveedor with ruc ${ruc} not found` });
            res.json(updatedproveedor);
        });
    }
}
exports.ProveedoresController = ProveedoresController;
