import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { CreateAlmacen } from "../../services/almacen/create.service";
import { UpdateAlmacen } from "../../services/almacen/update.service";

const prisma = new PrismaClient();

export class AlmacenController {
    //* DI
    // constructor(){}
    //Cubrir deuda técnica con adaptadores

    public getAlmacenes = async (req:Request, res:Response):Promise<any> => {
        const almacen = await prisma.almacen.findMany({
            orderBy: {
                nombre: 'asc'
            }
        });
        return res.json(almacen);
    }

    public getAlmacenById = async (req:Request, res:Response):Promise<any> => {
        const id = req.params.id;
        if(!id) return res.status(400).json({error: 'id is required'});
        const almacen = await prisma.almacen.findFirst({
            where: { id }
        });

        (almacen)
            ? res.json(almacen)
            : res.status(404).json({error: `Almacen with id ${id} not found`});
    }

    public createAlmacen = async (req:Request, res:Response):Promise<any> => {
        const [error, createAlmacen] = CreateAlmacen.create(req.body);
        if(error) return res.status(400).json({error});

        const almacen = await prisma.almacen.create({
            data: createAlmacen!
        });
            
        res.json(almacen);
    }
    
    public updateAlmacen = async (req:Request, res:Response):Promise<any> => {
        const id = req.params.id;
        const [error, updateAlmacen] = UpdateAlmacen.create({
            ...req.body,
            id
        });
        if(error) return res.status(400).json({error});        
        const updatedAlmacen = await prisma.almacen.update({
            where: { id },
            data: updateAlmacen!.values
        });
        if(!updatedAlmacen) return res.status(404).json({error: `Almacen with id ${id} not found`});
        res.json(updatedAlmacen);
    }

    public getProductosAlmacenId = async (req:Request, res:Response):Promise<any> => {
        const id = req.params.id;
        if(!id) return res.status(400).json({error: 'id is required'});
        const almacen = await prisma.almacenProductos.findMany({
            where: { producto: id },include: {
                Producto: true,
                Almacen: true
            }
        });

        res.json(almacen);
    }
    
    public  getInsumosAlmacenId = async (req:Request, res:Response):Promise<any> => {
        const id =  +req.params.id;
        if(!id) return res.status(400).json({error: 'id is required'});
        const almacen = await prisma.almacenInsumos.findMany({
            where: { insumo: id }
        });
        res.json(almacen);
    }

    public getProductosAlmacen = async (req:Request, res:Response):Promise<any> => {
        const almacen = await prisma.almacenProductos.findMany({
            include: {
                Producto: true,
                Almacen: true
            }
        });
        res.json(almacen);
    }
    public  getInsumosAlmacen = async (req:Request, res:Response):Promise<any> => {
        const almacen = await prisma.almacenInsumos.findMany({
            orderBy: {
                fechaIngreso: 'asc'
            }
        });
        res.json(almacen);
    }
}