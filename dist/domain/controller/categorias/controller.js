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
exports.CategoriasController = void 0;
const client_1 = require("@prisma/client");
const create_service_1 = require("../../services/categorias/create.service");
const update_service_1 = require("../../services/categorias/update.service");
const setTipo_service_1 = require("../../services/categorias/setTipo.service");
const prisma = new client_1.PrismaClient();
class CategoriasController {
    constructor() {
        //* DI
        // constructor(){}
        this.getCategorias = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const categorias = yield prisma.categorias.findMany({
                orderBy: {
                    id: 'asc'
                }
            });
            return res.json(categorias);
        });
        this.getCategoriaById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = +req.params.id;
            if (isNaN(id))
                return res.status(400).json({ error: 'Id is not a number' });
            const categorias = yield prisma.categorias.findFirst({
                where: { id }
            });
            (categorias)
                ? res.json(categorias)
                : res.status(404).json({ error: `Todo with id ${id} not found` });
        });
        this.createCategoria = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const [error, createCategoria] = create_service_1.CreateCategoria.create(req.body);
            if (error)
                return res.status(400).json({ error });
            const categoria = yield prisma.categorias.create({
                data: createCategoria
            });
            res.json(categoria);
        });
        this.setTipoToCategoria = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const [error, setTipoCategoria] = setTipo_service_1.SetTipoToCategoria.create(req.body);
            if (error)
                return res.status(400).json({ error });
            const tipoToCategoria = yield prisma.categoriaTipos.create({
                data: setTipoCategoria
            });
            res.json(tipoToCategoria);
        });
        this.updateCategoria = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = +req.params.id;
            const [error, updateCategoria] = update_service_1.UpdateCategoria.create(Object.assign(Object.assign({}, req.body), { id }));
            if (error)
                return res.status(400).json({ error });
            const updatedTodo = yield prisma.categorias.update({
                where: { id },
                data: updateCategoria.values
            });
            if (!updatedTodo)
                return res.status(404).json({ error: `Todo with id ${id} not found` });
            res.json(updatedTodo);
        });
    }
}
exports.CategoriasController = CategoriasController;
