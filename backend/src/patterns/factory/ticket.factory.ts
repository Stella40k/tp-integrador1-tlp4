import { TicketPriority } from "../../types";
import {
  ICreateTicketDTO,
  ITicketCreationResult,
} from "./ticket.factory.types";

//patron creacional = Factory Metod:
//encapsula la logica de la creacion y asignacion de prioridades ´por defecto segun la categoria

export class TicketFacktory {
  public static createTicketData(dto: ICreateTicketDTO): ITicketCreationResult {
    const priority =
      dto.priority ?? TicketFacktory.getDefaultPriority(dto.category);
    const formattedTitle = `[${dto.category}] ${dto.title.trim()}`;

    return {
      title: formattedTitle,
      description: dto.description.trim(),
      category: dto.category,
      priority,
      creatorId: dto.creatorId,
    };
  }

  private static getDefaultPriority(category: string): TicketPriority {
    switch (category) {
      case "ACCESS":
      case "NETWORK":
        return "HIGH" as TicketPriority;
      case "HARDWARE":
        return "MEDIUM" as TicketPriority;
      case "SOFTWARE":
      default:
        return "LOW" as TicketPriority;
    }
  }
}
