import { IObserver, ISubject, ITicketChangeEvent } from "./observer.interface";

//sujeto concreto: mantiene la lista de obs y comparte los e
export class TicketStatusSubject implements ISubject {
  private observers: IObserver[] = [];

  public subscribe(observer: IObserver): void {
    const exists = this.observers.includes(observer);
    if (!exists) {
      this.observers.push(observer);
    }
  }
  public unsubscribe(observer: IObserver): void {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }
  public async notify(event: ITicketChangeEvent): Promise<void> {
    for (const observer of this.observers) {
      try {
        await observer.update(event);
      } catch (error) {
        console.error("Error al ejecutar el observador", error);
      }
    }
  }
}
