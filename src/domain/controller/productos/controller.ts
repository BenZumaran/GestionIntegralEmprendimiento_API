import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { CreateProducto } from "../../services/productos/create.service";
import { UpdateProducto } from "../../services/productos/update.service";
import { getProductosInServicio } from "@prisma/client/sql";
import { InsertInsumoToProducto } from "../../services/productos/insertInsumoToProduct.service";
import { UpdateInsumoToProducto } from "../../services/productos/updateInsumoToProduct.service";

const prisma = new PrismaClient();

export class ProductosController {
    //* DI
    // constructor(){}

    public getProductos = async (req:Request, res:Response):Promise<any> => {
        const productos = await prisma.productos.findMany();
        return res.json(productos);
    }

    public getProductoById = async (req:Request, res:Response):Promise<any> => {
        const id = req.params.id;
        if(!id) return res.status(400).json({error: 'Id is required'});
        const producto = await prisma.productos.findFirst({
            where: { id }
        });

        (producto)
            ? res.json(producto)
            : res.status(404).json({error: `producto with id ${id} not found`});
    }

    public createProducto = async (req:Request, res:Response):Promise<any> => {
        const [error, createProducto] = CreateProducto.create(req.body);
        if(error) return res.status(400).json({error});

        const producto = await prisma.productos.create({
            data: createProducto!
        });
            
        res.json(producto);
    }
    
    public updateProducto = async (req:Request, res:Response):Promise<any> => {
        const id = req.params.id;
        const [error, updateProducto] = UpdateProducto.create({
            ...req.body,
            id
        });
        if(error) return res.status(400).json({error});        
        const updatedproducto = await prisma.productos.update({
            where: { id },
            data: updateProducto!.values
        });
        if(!updatedproducto) return res.status(404).json({error: `producto with id ${id} not found`});
        res.json(updatedproducto);
    }

    public deleteProducto = async (req:Request, res:Response):Promise<any> => {
        const id = req.params.id;
        if(!id) return res.status(400).json({error: 'Id is required'});
        const producto = await prisma.productos.delete({
            where: { id }
        });
        if(!producto) return res.status(404).json({error: `producto with id ${id} not found`});
        res.json(producto);
    }

    public getProductosInServicio = async (
        req: Request,
        res: Response
      ): Promise<any> => {
        const id = req.params.id;
        if (!id)
          return res.status(400).json({ error: "servicio id is required" });
        const productosInServicio = await prisma.$queryRawTyped(getProductosInServicio(id));
    
        productosInServicio
          ? res.json(productosInServicio)
          : res.status(404).json({
              error: `not found productos in servicio with id ${id}`,
            });
      };


      public getProductosWithInsumos = async (
        req: Request,
        res: Response
      ): Promise<any> => {
        const insumos = await prisma.insumosProducto.findMany();
        return res.json(insumos);
      };

      public insertInsumoToServicio = async (
          req: Request,
          res: Response
        ): Promise<any> => {
          const [error, insertProductToService] = InsertInsumoToProducto.create(
            req.body
          );
          if (error) return res.status(400).json({ error });
          
          const productToService = await prisma.insumosProducto.create({
            data: insertProductToService!,
          });
          
          res.json(productToService);
        };
        
        public updateInsumosInProducto = async (
          req: Request,
          res: Response
        ): Promise<any> => {
          const id = req.params.id;
          const [error, updateInsumoToProducto] = UpdateInsumoToProducto.create({
            ...req.body,
            id,
          });
          if (error) return res.status(400).json({ error });
          const updatedInsumo = await prisma.insumosProducto.updateMany({
            where: {
                producto: id,
                insumo: updateInsumoToProducto!.insumo,
            },
            data: updateInsumoToProducto!.values,
          });
          if (!updatedInsumo)
            return res.status(404).json({
              error: `insumo with id ${
                updateInsumoToProducto!.insumo
              } not found in producto with id ${id}`,
            });
            res.json(updatedInsumo);
          };
          
          public deleteInsumosFromProducto = async (
            req: Request,
            res: Response
          ): Promise<any> => {
            const producto = req.params.producto;
            const insumo = +req.params.insumo;
            if (!producto)
              return res.status(400).json({ error: "producto is required" });
            if (!insumo)
              return res.status(400).json({ error: "insumo is required" });
            const insumoInProducto = await prisma.insumosProducto.deleteMany({
              where: { producto, insumo },
          });
          if (!producto)
            return res.status(404).json({
          error: `insumo with id ${insumo} not found producto with id ${producto}`,
        });
        res.json(insumoInProducto);
      };
}