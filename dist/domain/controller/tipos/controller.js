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
exports.TiposController = void 0;
const client_1 = require("@prisma/client");
const create_service_1 = require("../../services/tipos/create.service");
const update_service_1 = require("../../services/tipos/update.service");
const sql_1 = require("@prisma/client/sql");
const prisma = new client_1.PrismaClient();
class TiposController {
    constructor() {
        //* DI
        // constructor(){}
        //Cubrir deuda técnica con adaptadores
        this.getTipos = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const tipos = yield prisma.tipos.findMany({
                orderBy: {
                    id: 'asc'
                }
            });
            return res.json(tipos);
        });
        this.getTipoById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = +req.params.id;
            if (isNaN(id))
                return res.status(400).json({ error: 'Id is not a number' });
            const todo = yield prisma.tipos.findFirst({
                where: { id }
            });
            (todo)
                ? res.json(todo)
                : res.status(404).json({ error: `Todo with id ${id} not found` });
        });
        this.getTipoByCategoria = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = +req.params.id;
            if (isNaN(id))
                return res.status(400).json({ error: 'Id is not a number' });
            const todo = yield prisma.$queryRawTyped((0, sql_1.getTiposByCategoria)(id));
            (todo)
                ? res.json(todo)
                : res.status(404).json({ error: `Todo with id ${id} not found` });
        });
        this.createTipo = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const [error, createTipo] = create_service_1.CreateTipo.create(req.body);
            if (error)
                return res.status(400).json({ error });
            const tipo = yield prisma.tipos.create({
                data: createTipo
            });
            res.json(tipo);
        });
        this.updateTipo = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = +req.params.id;
            const [error, updateTipo] = update_service_1.UpdateTipo.create(Object.assign(Object.assign({}, req.body), { id }));
            if (error)
                return res.status(400).json({ error });
            const updatedTodo = yield prisma.tipos.update({
                where: { id },
                data: updateTipo.values
            });
            if (!updatedTodo)
                return res.status(404).json({ error: `Todo with id ${id} not found` });
            res.json(updatedTodo);
        });
    }
}
exports.TiposController = TiposController;
