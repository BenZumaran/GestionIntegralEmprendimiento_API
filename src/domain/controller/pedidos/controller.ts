import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { CreatePedido } from "../../services/pedidos/create.service";
import { CreatePedidoDetalle } from "../../services/pedidos/createPedidoDetalle.service";
import { UpdatePedido } from "../../services/pedidos/update.service";
import { FilterPedido } from "../../services/pedidos/filter.service";
import { getPedidosByEstado } from "@prisma/client/sql"


const prisma = new PrismaClient();

export class PedidosController {
    //* DI
    // constructor(){}
    //Cubrir deuda técnica con adaptadores

    public getPedidos = async (req:Request, res:Response):Promise<any> => {
        const Pedido = await prisma.pedidos.findMany({
            orderBy: {
                createdAt: 'asc'
            }
        });
        return res.json(Pedido);
    }

    public getPedidoById = async (req:Request, res:Response):Promise<any> => {
        const id = req.params.id;
        if(!id) return res.status(400).json({error: 'Id is required'});
        const pedido = await prisma.pedidos.findFirst({
            where: { id },
            include: {
                PedidoProductos: true,
                PedidoServicios: true,
            }
        });
            (pedido) ? res.json(pedido)
            : res.status(404).json({error: `pedido with id ${id} not found`});
    }

    public getPedidosByEstado = async (req:Request, res:Response):Promise<any> => {
        const filtro= req.params.filtro;        
        const pedidos = await prisma.$queryRawTyped(getPedidosByEstado(filtro))
        res.json(pedidos);
    }

    public getPedidoWithDetalleById = async (req:Request, res:Response):Promise<any> => {
        const id = req.params.id;
        if(!id) return res.status(400).json({error: 'Id is required'});
        const pedido = await prisma.pedidos.findFirst({
            where: { id }
        });

        (pedido)
            ? res.json(pedido)
            : res.status(404).json({error: `pedido with id ${id} not found`});
    }

    public createPedido = async (req:Request, res:Response):Promise<any> => {
        
        const [error, createPedido] = CreatePedido.create(req.body.pedido);
        if(error) return res.status(400).json({error});

        const Pedido = await prisma.pedidos.create({
            data: createPedido!
        });
        let resDetalle = null;
        if(Pedido) {
            resDetalle = await this.createDetalle(req.body.detallePedido, Pedido.id);
            if(!resDetalle) {
                return res.status(400).json({error: 'Error al crear detalle'});
            }
        }
            
        res.json(Pedido);
    }
    
    
    private createDetalle = (detallePedido:[], pedido:string):Promise<any> => {
        let detalle:any = [];  
        detallePedido.forEach(async (detPedido:any) => {
            if(detPedido.tipo == 'producto'){
                detalle.push(await prisma.pedidoProductos.create({
                    data: {
                        cantidad: detPedido.cantidad,
                        producto: detPedido.producto,
                        pedido: pedido,
                    }
                }))
            }
            if(detPedido.tipo == 'servicio'){
                detalle.push (await prisma.pedidoServicios.create({
                    data: {
                        cantidad: detPedido.cantidad,
                        servicio: detPedido.servicio,
                        pedido: pedido,
                    }
                }))
            }
        });
        return detalle;
    }
    public addDetalle = async (req:Request, res:Response):Promise<any> => {
        const pedido = req.params.pedido;
        const {cantidad, producto, servicio} = req.body;
        let detalle:any = null;
            if(producto){
                detalle = await prisma.pedidoProductos.create({
                    data: {
                        cantidad: cantidad,
                        producto: producto,
                        pedido: pedido,
                    }
                })
            }
            if(servicio){
                const {cantidad, servicio} = req.body;
                detalle = await prisma.pedidoServicios.create({
                    data: {
                        cantidad: cantidad,
                        servicio: servicio,
                        pedido: pedido,
                    }
                });
            }
        detalle ? res.json(detalle) : res.status(400).json({error: 'Error al agregar'});
    }
    public updateDetalle = async (req:Request, res:Response):Promise<any> => {
        const {pedido, producto, servicio, cantidad}= req.body;
        const resPedido = null;
        if(producto !==null || producto !== undefined || producto !== ''){
            const resPedido = await prisma.pedidoProductos.updateMany({
                where: { pedido, producto },
                data: {
                    cantidad
                }
            });
            if(!resPedido) return res.status(404).json({error: `pedido with id ${pedido} not found`});
        }
        if(servicio !==null || servicio !== undefined || servicio !== ''){
            const resPedido = await prisma.pedidoServicios.updateMany({
                where: { pedido, servicio },
                data: {
                    cantidad
                }
            });
            if(!resPedido) return res.status(404).json({error: `pedido with id ${pedido} not found`});
        }
       
            
        res.json(resPedido);
    }

    public deleteDetalle = async (req:Request, res:Response):Promise<any> => {
        const pedido = req.params.pedido;
        const {producto, servicio}= req.body;
        const resPedido = null;

        if(producto){
            const resPedido = await prisma.pedidoProductos.deleteMany({
                where: { pedido, producto }
            });
            if(!resPedido) return res.status(404).json({error: `pedido with id ${pedido} not found`});
        }
        if(servicio){
            
            const resPedido = await prisma.pedidoServicios.deleteMany({
                where: { pedido, servicio }
            });
            if(!resPedido) return res.status(404).json({error: `pedido with id ${pedido} not found`});
        }
       
        res.json(resPedido);
    }
    
    public updatePedido = async (req:Request, res:Response):Promise<any> => {
        const id = req.params.id;
        const [error, updatePedido] = UpdatePedido.create({
            ...req.body,
            id
        });
        if(error) return res.status(400).json({error});        
        const updatedpedido = await prisma.pedidos.update({
            where: { id },
            data: updatePedido!.values
        });
        if(!updatedpedido) return res.status(404).json({error: `pedido with id ${id} not found`});
        res.json(updatedpedido);
    }

    public deletePedido = async (req:Request, res:Response):Promise<any> => {
        const id = req.params.id;

        const updatedpedido = await prisma.pedidos.delete({
            where: { id }
        });
        if(!updatedpedido) return res.status(404).json({error: `pedido with id ${id} not found`});
        res.json(updatedpedido);
    }
}