import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { CreateServicio } from "../../services/servicios/create.service";
import { UpdateServicio } from "../../services/servicios/update.service";
import { InsertProductToService } from "../../services/servicios/insertProductToService.service";
import { UpdateProductoToService } from "../../services/servicios/updateProductToService.service";
import { TiposController } from "../tipos/controller";

const prisma = new PrismaClient();

export class ServiciosController {
  //* DI
  // constructor(){}

  public getServicios = async (req: Request, res: Response): Promise<any> => {
    const servicios = await prisma.servicios.findMany({
      orderBy: {
          createdAt: 'asc'
      }
  });
    return res.json(servicios);
  };
  public getServiciosInPedidos = async (req: Request, res: Response): Promise<any> => {
    const servicios = await prisma.pedidoServicios.findMany();
    return res.json(servicios);
  };

  public getServicioById = async (
    req: Request,
    res: Response
  ): Promise<any> => {
    const id = req.params.id;
    if (!id) return res.status(400).json({ error: "Id is required" });
    const servicio = await prisma.servicios.findFirst({
      where: { id },
    });

    servicio
      ? res.json(servicio)
      : res.status(404).json({ error: `servicio with id ${id} not found` });
  };

  public createServicio = async (req: Request, res: Response): Promise<any> => {
    const [error, createservicio] = CreateServicio.create(req.body);
    if (error) return res.status(400).json({ error });

    if (
      await prisma.tipos.findFirst({
        where: { id: createservicio!.tipo },
      })
    ) {
      const servicio = await prisma.servicios.create({
        data: createservicio!,
      });
      res.json(servicio);
    } else {
      res
        .status(404)
        .json({ error: `tipo with id ${createservicio!.tipo} not found` });
    }
  };

  public updateServicio = async (req: Request, res: Response): Promise<any> => {
    const id = req.params.id;
    const [error, updateservicio] = UpdateServicio.create({
      ...req.body,
      id,
    });
    if (error) return res.status(400).json({ error });
    const updatedservicio = await prisma.servicios.update({
      where: { id },
      data: updateservicio!.values,
    });
    if (!updatedservicio)
      return res
        .status(404)
        .json({ error: `servicio with id ${id} not found` });
    res.json(updatedservicio);
  };

  
  public insertProductoToServicio = async (
    req: Request,
    res: Response
  ): Promise<any> => {
    const [error, insertProductToService] = InsertProductToService.create(
      req.body
    );
    if (error) return res.status(400).json({ error });
    
    const productToService = await prisma.productosServicio.create({
      data: insertProductToService!,
    });
    
    res.json(productToService);
  };
  
  public updateProductoInServicio = async (
    req: Request,
    res: Response
  ): Promise<any> => {
    const id = req.params.id;
    const [error, updateProductToService] = UpdateProductoToService.create({
      ...req.body,
      id,
    });
    if (error) return res.status(400).json({ error });
    const updatedProducto = await prisma.productosServicio.updateMany({
      where: {
        servicio: id,
        producto: updateProductToService!.producto,
      },
      data: updateProductToService!.values,
    });
    if (!updatedProducto)
      return res.status(404).json({
        error: `producto with id ${
          updateProductToService!.producto
        } not found in servicio with id ${id}`,
      });
      res.json(updatedProducto);
    };
    
    public deleteProductoFromServicio = async (
      req: Request,
      res: Response
    ): Promise<any> => {
      const servicio = req.params.servicio;
      const producto = req.params.producto;
      if (!servicio)
        return res.status(400).json({ error: "servicio is required" });
      if (!producto)
        return res.status(400).json({ error: "producto is required" });
      const productoInServicio = await prisma.productosServicio.deleteMany({
        where: { servicio, producto },
    });
    if (!servicio)
      return res.status(404).json({
    error: `producto with id ${producto} not found servicio with id ${servicio}`,
  });
  res.json(productoInServicio);
};

public getServiciosWithProductos = async (
  req: Request,
  res: Response
): Promise<any> => {
  const servicios = await prisma.productosServicio.findMany();
  return res.json(servicios);
};
public deleteServicio = async (req: Request, res: Response): Promise<any> => {
  const id = req.params.id;
  if (!id) return res.status(400).json({ error: "Id is required" });
  const servicio = await prisma.servicios.delete({
    where: { id },
  });
  if (!servicio)
      return res
        .status(404)
        .json({ error: `servicio with id ${id} not found` });
    res.json(servicio);
  };




}
