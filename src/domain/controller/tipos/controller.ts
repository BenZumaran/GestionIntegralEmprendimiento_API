import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { CreateTipo } from "../../services/tipos/create.service";
import { UpdateTipo } from "../../services/tipos/update.service";
import { getTiposByCategoria } from "@prisma/client/sql";

const prisma = new PrismaClient();

export class TiposController {
    //* DI
    // constructor(){}
    //Cubrir deuda técnica con adaptadores

    public getTipos = async (req:Request, res:Response):Promise<any> => {
        const tipos = await prisma.tipos.findMany({
            orderBy: {
                id: 'asc'
            }
        });
        return res.json(tipos);
    }

    public getTipoById = async (req:Request, res:Response):Promise<any> => {
        const id = +req.params.id;
        if(isNaN(id)) return res.status(400).json({error: 'Id is not a number'});
        const todo = await prisma.tipos.findFirst({
            where: { id }
        });

        (todo)
            ? res.json(todo)
            : res.status(404).json({error: `Todo with id ${id} not found`});
    }

    public getTipoByCategoria = async (req:Request, res:Response):Promise<any> => {
        const id = +req.params.id;
        if(isNaN(id)) return res.status(400).json({error: 'Id is not a number'});
        const todo = await prisma.$queryRawTyped(getTiposByCategoria(id));

        (todo)
            ? res.json(todo)
            : res.status(404).json({error: `Todo with id ${id} not found`});
    }

    public createTipo = async (req:Request, res:Response):Promise<any> => {
        const [error, createTipo] = CreateTipo.create(req.body);
        if(error) return res.status(400).json({error});

        const tipo = await prisma.tipos.create({
            data: createTipo!
        });
            
        res.json(tipo);
    }
    
    public updateTipo = async (req:Request, res:Response):Promise<any> => {
        const id = +req.params.id;
        const [error, updateTipo] = UpdateTipo.create({
            ...req.body,
            id
        });
        if(error) return res.status(400).json({error});        
        const updatedTodo = await prisma.tipos.update({
            where: { id },
            data: updateTipo!.values
        });
        if(!updatedTodo) return res.status(404).json({error: `Todo with id ${id} not found`});
        res.json(updatedTodo);
    }
}