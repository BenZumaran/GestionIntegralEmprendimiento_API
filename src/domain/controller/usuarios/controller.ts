import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { CreateUsuario } from "../../services/usuarios/create.service";
import { UpdateUsuario } from "../../services/usuarios/update.service";

const prisma = new PrismaClient();

export class UsuariosController {
    //* DI
    // constructor(){}

    public getUsuarios = async (req:Request, res:Response):Promise<any> => {
        const usuarios = await prisma.usuarios.findMany();
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

    public deleteUsuario = async (req:Request, res:Response):Promise<any> => {
        const id = req.params.id;
        if(!id) return res.status(400).json({error: 'Id is required'});
        const usuario = await prisma.usuarios.delete({
            where: { id }
        });
        if(!usuario) return res.status(404).json({error: `usuario with id ${id} not found`});
        res.json(usuario);
    }
}