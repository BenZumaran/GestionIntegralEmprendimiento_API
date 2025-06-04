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
exports.ProductosController = void 0;
const client_1 = require("@prisma/client");
const create_service_1 = require("../../services/productos/create.service");
const update_service_1 = require("../../services/productos/update.service");
const sql_1 = require("@prisma/client/sql");
const insertInsumoToProduct_service_1 = require("../../services/productos/insertInsumoToProduct.service");
const updateInsumoToProduct_service_1 = require("../../services/productos/updateInsumoToProduct.service");
const updateProductToAlmacen_service_1 = require("../../services/productos/updateProductToAlmacen.service");
const insertProductToAlmacen_service_1 = require("../../services/productos/insertProductToAlmacen.service");
const prisma = new client_1.PrismaClient();
class ProductosController {
    constructor() {
        //* DI
        // constructor(){}
        this.getProductos = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const productos = yield prisma.productos.findMany({
                orderBy: {
                    createdAt: 'asc'
                }
            });
            return res.json(productos);
        });
        this.getProductoById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            if (!id)
                return res.status(400).json({ error: 'Id is required' });
            const producto = yield prisma.productos.findFirst({
                where: { id }
            });
            (producto)
                ? res.json(producto)
                : res.status(404).json({ error: `producto with id ${id} not found` });
        });
        this.createProducto = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const [error, createProducto] = create_service_1.CreateProducto.create(req.body);
            if (error)
                return res.status(400).json({ error });
            const producto = yield prisma.productos.create({
                data: createProducto
            });
            res.json(producto);
        });
        this.updateProducto = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const [error, updateProducto] = update_service_1.UpdateProducto.create(Object.assign(Object.assign({}, req.body), { id }));
            if (error)
                return res.status(400).json({ error });
            const updatedproducto = yield prisma.productos.update({
                where: { id },
                data: updateProducto.values
            });
            if (!updatedproducto)
                return res.status(404).json({ error: `producto with id ${id} not found` });
            res.json(updatedproducto);
        });
        this.deleteProducto = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            if (!id)
                return res.status(400).json({ error: 'Id is required' });
            const producto = yield prisma.productos.delete({
                where: { id }
            });
            if (!producto)
                return res.status(404).json({ error: `producto with id ${id} not found` });
            res.json(producto);
        });
        this.getProductosInServicio = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            if (!id)
                return res.status(400).json({ error: "servicio id is required" });
            const productosInServicio = yield prisma.$queryRawTyped((0, sql_1.getProductosInServicio)(id));
            productosInServicio
                ? res.json(productosInServicio)
                : res.status(404).json({
                    error: `not found productos in servicio with id ${id}`,
                });
        });
        this.getProductosWithInsumos = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const insumos = yield prisma.insumosProducto.findMany();
            return res.json(insumos);
        });
        this.insertInsumoToProducto = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const [error, insertProductToService] = insertInsumoToProduct_service_1.InsertInsumoToProducto.create(req.body);
            if (error)
                return res.status(400).json({ error });
            const productToService = yield prisma.insumosProducto.create({
                data: insertProductToService,
            });
            res.json(productToService);
        });
        this.updateInsumosInProducto = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const [error, updateInsumoToProducto] = updateInsumoToProduct_service_1.UpdateInsumoToProducto.create(Object.assign(Object.assign({}, req.body), { id }));
            if (error)
                return res.status(400).json({ error });
            const updatedInsumo = yield prisma.insumosProducto.updateMany({
                where: {
                    producto: id,
                    insumo: updateInsumoToProducto.insumo,
                },
                data: updateInsumoToProducto.values,
            });
            if (!updatedInsumo)
                return res.status(404).json({
                    error: `insumo with id ${updateInsumoToProducto.insumo} not found in producto with id ${id}`,
                });
            res.json(updatedInsumo);
        });
        this.deleteInsumosFromProducto = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const producto = req.params.producto;
            const insumo = +req.params.insumo;
            if (!producto)
                return res.status(400).json({ error: "producto is required" });
            if (!insumo)
                return res.status(400).json({ error: "insumo is required" });
            const insumoInProducto = yield prisma.insumosProducto.deleteMany({
                where: { producto, insumo },
            });
            if (!producto)
                return res.status(404).json({
                    error: `insumo with id ${insumo} not found producto with id ${producto}`,
                });
            res.json(insumoInProducto);
        });
        /**
         * almacen
          producto
          cantidad
          fechaIngreso
         */
        this.insertProductoToAlmacen = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const [error, insertProductoToAlmacen] = insertProductToAlmacen_service_1.InsertProductoToAlmacen.create(req.body);
            if (error)
                return res.status(400).json({ error });
            const productoToAlmacen = yield prisma.almacenProductos.create({
                data: insertProductoToAlmacen,
            });
            res.json(productoToAlmacen);
        });
        this.updateProductoToAlmacen = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const [error, updateProductoToAlmacen] = updateProductToAlmacen_service_1.UpdateProductoToAlmacen.create(Object.assign({}, req.body));
            if (error)
                return res.status(400).json({ error });
            const updatedProducto = yield prisma.almacenProductos.updateMany({
                where: {
                    producto: updateProductoToAlmacen.producto,
                    almacen: updateProductoToAlmacen.almacen,
                },
                data: {
                    cantidad: updateProductoToAlmacen.cantidad,
                }
            });
            if (!updatedProducto)
                return res.status(404).json({ error: `producto with id ${updateProductoToAlmacen === null || updateProductoToAlmacen === void 0 ? void 0 : updateProductoToAlmacen.producto} not found` });
            res.json(updatedProducto);
        });
    }
}
exports.ProductosController = ProductosController;
