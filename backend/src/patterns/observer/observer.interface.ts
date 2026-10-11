import { TicketStatus } from "../../types";

export interface ITicketChangeEvent {
  ticketId: number;
  title: string;
  previusStatus: TicketStatus;
  newStatus: TicketStatus;
  changeByUserId: number;
  timestamp: Date;
}

//interfaz a implementar en todos los observadores q escuchen el cambio de los tickets
export interface IObserver {
  update(event: ITicketChangeEvent): Promise<void> | void;
}

//interfaz para el observable (el q emite los eventos)
export interface ISubject {
  subscribe(observer: IObserver): void;
  unsubscribe(observer: IObserver): void;
  notify(event: ITicketChangeEvent): Promise<void>;
}
