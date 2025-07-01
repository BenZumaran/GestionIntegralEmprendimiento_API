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
exports.UsuariosController = void 0;
const client_1 = require("@prisma/client");
const create_service_1 = require("../../services/usuarios/create.service");
const update_service_1 = require("../../services/usuarios/update.service");
const prisma = new client_1.PrismaClient();
class UsuariosController {
    constructor() {
        //* DI
        // constructor(){}
        this.getUsuarios = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const usuarios = yield prisma.usuarios.findMany({
                orderBy: {
                    createdAt: 'asc'
                }
            });
            return res.json(usuarios);
        });
        this.getUsuarioById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            if (!id)
                return res.status(400).json({ error: 'Id is required' });
            const usuario = yield prisma.usuarios.findFirst({
                where: { id }
            });
            (usuario)
                ? res.json(usuario)
                : res.status(404).json({ error: `usuario with id ${id} not found` });
        });
        this.createUsuario = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const [error, createUsuario] = create_service_1.CreateUsuario.create(req.body);
            if (error)
                return res.status(400).json({ error });
            const usuario = yield prisma.usuarios.create({
                data: createUsuario
            });
            res.json(usuario);
        });
        this.updateUsuario = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const [error, updateUsuario] = update_service_1.UpdateUsuario.create(Object.assign(Object.assign({}, req.body), { id }));
            if (error)
                return res.status(400).json({ error });
            const updatedusuario = yield prisma.usuarios.update({
                where: { id },
                data: updateUsuario.values
            });
            if (!updatedusuario)
                return res.status(404).json({ error: `usuario with id ${id} not found` });
            res.json(updatedusuario);
        });
        this.deleteUsuario = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            if (!id)
                return res.status(400).json({ error: 'Id is required' });
            const usuario = yield prisma.usuarios.delete({
                where: { id }
            });
            if (!usuario)
                return res.status(404).json({ error: `usuario with id ${id} not found` });
            res.json(usuario);
        });
        this.inicioSesion = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { usuario, clave } = req.body;
            if (!usuario)
                return res.status(400).json({ error: 'usuario is required' });
            if (!clave)
                return res.status(400).json({ error: 'clave is required' });
            const validacion = yield prisma.usuarios.findFirst({
                where: { nombreUsuario: usuario },
                select: {
                    id: true,
                    clave: true,
                    tipoUsuario: true,
                }
            });
            if (validacion)
                if (clave === validacion.clave)
                    res.json({ usuario: validacion.id, tipo: validacion.tipoUsuario });
                else
                    res.json({ error: 'clave incorrecta' });
            else
                res.status(404).json({ error: `usuario ${usuario} not found` });
        });
    }
}
exports.UsuariosController = UsuariosController;
