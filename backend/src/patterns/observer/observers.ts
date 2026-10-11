import { IObserver, ITicketChangeEvent } from "./observer.interface";

//primer observador: registra logs de auditorias en sistema/consola
export class AuditLogObserver implements IObserver {
  public update(event: ITicketChangeEvent): Promise<void> | void {
    console.log(
      `[AUDITORA] [${event.timestamp.toISOString()}] ticket #${event.ticketId} `,
    );
    console.log(
      `cambio de ${event.previusStatus} a ${event.newStatus} (Usuario #${event.changeByUserId})`,
    );
  }
}

//segundo observadpr: simula el envio de notis por mail al creasr del ticket
export class EmailNotification implements IObserver {
  public update(event: ITicketChangeEvent): void {
    console.log(
      `[NOTIFICACIION EMAIL] Enviando email para ticket "${event.title}" (#${event.ticketId}): `,
    );
    console.log(`Tu ticket ahora se encuentra en estado "${event.newStatus}".`);
  }
}
