import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { CreateCategoria } from "../../services/categorias/create.service";
import { UpdateCategoria } from "../../services/categorias/update.service";
import { SetTipoToCategoria } from "../../services/categorias/setTipo.service";

const prisma = new PrismaClient();

export class CategoriasController {
    //* DI
    // constructor(){}

    public getCategorias = async (req:Request, res:Response):Promise<any> => {
        const categorias = await prisma.categorias.findMany({
            orderBy: {
                id: 'asc'
            }
        });
        return res.json(categorias);
    }

    public getCategoriaById = async (req:Request, res:Response):Promise<any> => {
        const id = +req.params.id;
        if(isNaN(id)) return res.status(400).json({error: 'Id is not a number'});
        const categorias = await prisma.categorias.findFirst({
            where: { id }
        });

        (categorias)
            ? res.json(categorias)
            : res.status(404).json({error: `Todo with id ${id} not found`});
    }

    public createCategoria = async (req:Request, res:Response):Promise<any> => {
        const [error, createCategoria] = CreateCategoria.create(req.body);
        if(error) return res.status(400).json({error});

        const categoria = await prisma.categorias.create({
            data: createCategoria!
        });
            
        res.json(categoria);
    }
    
    public setTipoToCategoria = async (req:Request, res:Response):Promise<any> => {
        const [error, setTipoCategoria] = SetTipoToCategoria.create(req.body);
        if(error) return res.status(400).json({error});

        const tipoToCategoria = await prisma.categoriaTipos.create({
            data:setTipoCategoria!
        });
            
        res.json(tipoToCategoria);
    }

    public updateCategoria = async (req:Request, res:Response):Promise<any> => {
        const id = +req.params.id;
        const [error, updateCategoria] = UpdateCategoria.create({
            ...req.body,
            id
        });
        if(error) return res.status(400).json({error});        
        const updatedTodo = await prisma.categorias.update({
            where: { id },
            data: updateCategoria!.values
        });
        if(!updatedTodo) return res.status(404).json({error: `Todo with id ${id} not found`});
        res.json(updatedTodo);
    }

}