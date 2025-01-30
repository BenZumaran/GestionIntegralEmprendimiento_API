import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { CreateInsumo } from "../../services/insumos/create.service";
import { UpdateInsumo } from "../../services/insumos/update.service";
import { getInsumosInProducto } from "@prisma/client/sql";

const prisma = new PrismaClient();

export class InsumosController {
    //* DI
    // constructor(){}
    //Cubrir deuda técnica con adaptadores

    public getInsumos = async (req:Request, res:Response):Promise<any> => {
        const Insumos = await prisma.insumos.findMany();
        return res.json(Insumos);
    }

    public getInsumosById = async (req:Request, res:Response):Promise<any> => {
        const id = +req.params.id;
        if(!id) return res.status(400).json({error: 'id is required'});
        const Insumos = await prisma.insumos.findFirst({
            where: { id }
        });

        (Insumos)
            ? res.json(Insumos)
            : res.status(404).json({error: `Insumos with id ${id} not found`});
    }

    public createInsumos = async (req:Request, res:Response):Promise<any> => {
        const [error, createInsumos] = CreateInsumo.create(req.body);
        if(error) return res.status(400).json({error});

        const Insumos = await prisma.insumos.create({
            data: createInsumos!
        });
            
        res.json(Insumos);
    }
    
    public updateInsumos = async (req:Request, res:Response):Promise<any> => {
        const id = +req.params.id;
        const [error, updateInsumos] = UpdateInsumo.create({
            ...req.body,
            id
        });
        if(error) return res.status(400).json({error});        
        const updatedInsumos = await prisma.insumos.update({
            where: { id },
            data: updateInsumos!.values
        });
        if(!updatedInsumos) return res.status(404).json({error: `Insumos with id ${id} not found`});
        res.json(updatedInsumos);
    }

    public getInsumosInProducto = async (
        req: Request,
        res: Response
      ): Promise<any> => {
        const id = req.params.id;
        if (!id)
          return res.status(400).json({ error: "prodcuto id is required" });
        const insumosInProducto = await prisma.$queryRawTyped(getInsumosInProducto(id));
    
        insumosInProducto
          ? res.json(insumosInProducto)
          : res.status(404).json({
              error: `not found insumos in prodcuto with id ${id}`,
            });
      };

}