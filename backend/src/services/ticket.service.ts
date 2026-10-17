import { Ticket, User } from "../models";
import { TicketFacktory } from "../patterns/factory/ticket.factory";
import { ICreateTicketDTO } from "../patterns/factory/ticket.factory.types";
import { TicketStatusSubject } from "../patterns/observer/ticket.subject";
import {
  AuditLogObserver,
  EmailNotification,
} from "../patterns/observer/observers";
import { SmsAdapater } from "../patterns/adapter/sms.adapter";
import { SmsService } from "../patterns/adapter/sms.service";
import { TicketStatus } from "../types";

export class TicketService {
  private statusSubject: TicketStatusSubject;
  private smsNotifier: SmsAdapater;

  constructor() {
    //inicio el observafor y le subscribo los observadores
    this.statusSubject = new TicketStatusSubject();
    this.statusSubject.subscribe(new AuditLogObserver());
    this.statusSubject.subscribe(new EmailNotification());

    //ahora inicializo el adapter para notificaciones por sms
    this.smsNotifier = new SmsAdapater(new SmsService());
  }

  //creo el ticket aplicando el metodo factory
  public async createTicket(dto: ICreateTicketDTO): Promise<Ticket> {
    const ticketData = TicketFacktory.createTicketData(dto);

    const newTicket = await Ticket.create({
      ...ticketData,
      status: "OPEN",
    });
    return newTicket;
  }

  //obtengo todos los tickets con datos del q lo creo
  public async getAllTickets(): Promise<Ticket[]> {
    return await Ticket.findAll({
      include: [
        { model: User, as: "creator", attributes: ["id", "name", "email"] },
      ],
      order: [["createdAt", "DESC"]],
    });
  }

  //actualizacion del estado apluicando el patron observador y adapter
  public async updateStatus(
    ticketId: number,
    newStatus: TicketStatus,
    changedByUserId: number,
  ): Promise<Ticket | null> {
    //busca el ticket en la bd
    const ticket = await Ticket.findByPk(ticketId);
    if (!ticket) return null;

    //guarda el estado viejo y actualiza el nuevo
    const previusStatus = ticket.status;
    ticket.status = newStatus;
    await ticket.save();

    //dispara dispara el evento del observer
    await this.statusSubject.notify({
      ticketId: ticket.id,
      title: ticket.title,
      previusStatus: previusStatus,
      newStatus,
      changeByUserId: changedByUserId,
      timestamp: new Date(),
    });

    //dispara el adapter del sms en casos criticos
    if (ticket.priority === "CRITICAL" || newStatus === "RESOLVED") {
      await this.smsNotifier.sendNotification(
        "+5493718537071",
        `El ticket #${ticket.id} cambio a ${newStatus}`,
      );
    }
    //devuewlvp eñ ticket actualizadp
    return ticket;
  }
}
