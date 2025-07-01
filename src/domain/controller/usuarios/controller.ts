import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { CreateUsuario } from "../../services/usuarios/create.service";
import { UpdateUsuario } from "../../services/usuarios/update.service";
import { UpdateDatosUsuario } from "../../services/usuarios/updateDatos.service";
import { getFiltroTextoUsuario } from "@prisma/client/sql";

const prisma = new PrismaClient();

export class UsuariosController {
    //* DI
    // constructor(){}

    public getUsuarios = async (req:Request, res:Response):Promise<any> => {
        const usuarios = await prisma.usuarios.findMany({
            orderBy: {
                createdAt: 'asc'
            }
        });
        return res.json(usuarios);
    }

    public getUsuarioById = async (req:Request, res:Response):Promise<any> => {
        const id = req.params.id;
        if(!id) return res.status(400).json({error: 'Id is required'});
        const usuario = await prisma.usuarios.findFirst({
            where: { id }
        });

        (usuario)
            ? res.json(usuario)
            : res.status(404).json({error: `usuario with id ${id} not found`});
    }
    public getUsuariosByTipo = async (req:Request, res:Response):Promise<any> => {
        const tipo = +req.params.tipo;
        if(!tipo) return res.status(400).json({error: 'Tipo is required'});
        const usuario = await prisma.usuarios.findMany({
            where: {tipoUsuario: tipo},
            omit: {
                clave: true,
                createdAt: true,
            }

        });

        (usuario)
            ? res.json(usuario)
            : res.status(404).json({error: `usuario with tipo ${tipo} not found`});
    }

    public createUsuario = async (req:Request, res:Response):Promise<any> => {
        const [error, createUsuario] = CreateUsuario.create(req.body);
        if(error) return res.status(400).json({error});

        const usuario = await prisma.usuarios.create({
            data: createUsuario!
        });
            
        res.json(usuario);
    }
     
    public updateUsuario = async (req:Request, res:Response):Promise<any> => {
        const id = req.params.id;
        const [error, updateUsuario] = UpdateUsuario.create({
            ...req.body,
            id
        });
        if(error) return res.status(400).json({error});        
        const updatedusuario = await prisma.usuarios.update({
            where: { id },
            data: updateUsuario!.values
        });
        if(!updatedusuario) return res.status(404).json({error: `usuario with id ${id} not found`});
        res.json(updatedusuario);
    }
    public updateDatosUsuario = async (req:Request, res:Response):Promise<any> => {
        const id = req.params.id;
        const [error, updateUsuario] = UpdateDatosUsuario.create({
            ...req.body,
            id
        });
        if(error) return res.status(400).json({error});        
        const updatedusuario = await prisma.usuarios.update({
            where: { id },
            data: updateUsuario!.values,
            omit: {
                clave: true,
                createdAt: true,
            }
        });
        if(!updatedusuario) return res.status(404).json({error: `usuario with id ${id} not found`});
        res.json(updatedusuario);
    }
    public updateClaveUsuario = async (req:Request, res:Response):Promise<any> => {
        const id = req.params.id;
        const {claveActual, claveNueva} = req.body;
        if(!claveActual || !claveNueva) return res.status(400).json({error: 'Clave is required'});
        const usuario = await prisma.usuarios.findFirst({
            where: { id }
        });
        if(!usuario) return res.status(404).json({error: `usuario with id ${id} not found`});
        if(usuario.clave !== claveActual) return res.status(400).json({error: 'Clave incorrecta'});
        const updatedusuario = await prisma.usuarios.update({
            where: { id },
            data: {
                clave: claveNueva
            },
            omit: {
                clave: true,
                createdAt: true,
            }
        });
        res.json({message:"Clave actualizada"});
    }

    public deleteUsuario = async (req:Request, res:Response):Promise<any> => {
        const id = req.params.id;
        if(!id) return res.status(400).json({error: 'Id is required'});
        const usuario = await prisma.usuarios.delete({
            where: { id }
        });
        if(!usuario) return res.status(404).json({error: `usuario with id ${id} not found`});
        res.json(usuario);
    }

    public inicioSesionByUserName = async (req:Request, res:Response):Promise<any> => {
        const {usuario, clave} = req.body;
        if(!usuario) return res.status(400).json({error: 'usuario is required'});
        if(!clave) return res.status(400).json({error: 'clave is required'});
        const validacion = await prisma.usuarios.findFirst({
            where: { nombreUsuario: usuario },
            select:{
                id: true,
                clave: true,
                tipoUsuario: true,
            }
        });

        if(validacion)
            if (clave === validacion.clave) 
                res.json({usuario:validacion.id, tipo: validacion.tipoUsuario});
            else res.json({error: 'clave incorrecta'});
        else res.status(404).json({error: `usuario ${usuario} not found`});
    }
    public inicioSesionById = async (req:Request, res:Response):Promise<any> => {
        const {id, clave} = req.body;
        if(!id) return res.status(400).json({error: 'usuario is required'});
        if(!clave) return res.status(400).json({error: 'clave is required'});
        const validacion = await prisma.usuarios.findFirst({
            where: { id:id },
            select:{
                id: true,
                clave: true,
                tipoUsuario: true,
            }
        });

        if(validacion)
            if (clave === validacion.clave) 
                res.json({usuario:validacion.id, tipo: validacion.tipoUsuario});
            else res.json({error: 'clave incorrecta'});
        else res.status(404).json({error: `usuario with id ${id} not found`});
    }

    public getUsuariosByText = async (req:Request, res:Response):Promise<any> => {
        const filtro= req.params.filtro;        
        const usuarios = await prisma.$queryRawTyped(getFiltroTextoUsuario(filtro))
        res.json(usuarios);
    }

}