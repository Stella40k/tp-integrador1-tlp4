import { Request, Response } from "express";
import { TicketService } from "../services/ticket.service";
import { stat } from "node:fs";

const ticketService = new TicketService();

export class TicketController {
    public static async create(req: Request, res: Response): Promise<void> {
        try {
            const { title, description, category, creatorId, priority } = req.body;
            if (!title || !description || !category || !creatorId) {
                res.status(400).json({ error: 'Faltan campos obligatorios' })
                return;
            }
            const ticket = await ticketService.createTicket({
                title,
                description,
                category,
                creatorId: Number(creatorId),
                priority
            })
            res.status(201).json(ticket)
        } catch (error) {
            console.error('Error al crear el tickets', error)
            res.status(500).json({ error: 'Error al crear el ticket' })
        }
    }

    public static async getAll(_req: Request, res: Response): Promise<void> {
        try {
            const tickets = await ticketService.getAllTickets()
            res.status(200).json(tickets)
        } catch (error) {
            console.error('Error al obtener todos los tickets', error)
            res.status(500).json({ error: 'Error al obtener todos los tickets' })
        }
    }

    public static async updateStatus(req: Request, res: Response): Promise<void> {
        try {
            const ticketId = Number(req.params.id)
            const { status, changeByUserId } = req.body

            if (!status || !changeByUserId) {
                res.status(400).json({ error: 'Faltan campos obligatorios ( status o  changeByUserId)' })
                return
            }

            const updateTicket = await ticketService.updateStatus(
                ticketId,
                status,
                Number(changeByUserId)
            )
            if (!updateTicket) {
                res.status(404).json({ error: 'Ticket no encontrado' })
                return
            }
            res.status(200).json(updateTicket)

        } catch (error) {
            console.error('Error al actualizar el ticket', error)
            res.status(500).json({ error: 'Error al actualizar el ticket' })
        }
    }
}