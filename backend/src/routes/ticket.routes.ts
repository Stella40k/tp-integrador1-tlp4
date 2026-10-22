import { Router } from "express";
import { TicketController } from "../controllers/ticket.controller";

const router = Router();

router.post('/crearTicket', TicketController.create)
router.get('/Tickets', TicketController.getAll)
router.patch('/:id/statusTicket', TicketController.updateStatus)

export default router;