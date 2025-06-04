import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { CreateProveedor } from "../../services/proveedores/create.service";
import { UpdateProveedor } from "../../services/proveedores/update.service";

const prisma = new PrismaClient();

export class ProveedoresController {
    //* DI
    // constructor(){}
    //Cubrir deuda técnica con adaptadores

    public getProveedores = async (req:Request, res:Response):Promise<any> => {
        const proveedores = await prisma.proveedores.findMany({
            orderBy: {
                createdAt: 'asc'
            }
        });
        return res.json(proveedores);
    }

    public getProveedorByRuc = async (req:Request, res:Response):Promise<any> => {
        const ruc = req.params.ruc;
        if(!ruc) return res.status(400).json({error: 'ruc is required'});
        const proveedor = await prisma.proveedores.findFirst({
            where: { ruc }
        });
 
        (proveedor)
            ? res.json(proveedor)
            : res.status(404).json({error: `Proveedor with ruc ${ruc} not found`});
    }

    public createProveedor = async (req:Request, res:Response):Promise<any> => {
        const [error, createProveedor] = CreateProveedor.create(req.body);
        if(error) return res.status(400).json({error});

        const proveedor = await prisma.proveedores.create({
            data: createProveedor!
        });
        
        res.json(proveedor);
    }
    
    public updateProveedor = async (req:Request, res:Response):Promise<any> => {
        const ruc = req.params.ruc;
        const [error, updateProveedor] = UpdateProveedor.create({
            ...req.body,
            ruc
        });
        if(error) return res.status(400).json({error});        
        const updatedproveedor = await prisma.proveedores.update({
            where: { ruc },
            data: updateProveedor!.values
        });
        if(!updatedproveedor) return res.status(404).json({error: `proveedor with ruc ${ruc} not found`});
        res.json(updatedproveedor);
    }
}