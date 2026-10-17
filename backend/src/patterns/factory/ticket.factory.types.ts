import { TicketCategory, TicketPriority } from "../../types";

//DTO (Objeto de transferencia de Datos): patron usado para definir estructura exacta de
//de los datos q viajan entre capas de la app
export interface ICreateTicketDTO {
  title: string;
  description: string;
  category: TicketCategory;
  creatorId: number;
  priority?: TicketPriority;
}
export interface ITicketCreationResult {
  title: string;
  description: string;
  category: TicketCategory;
  priority: TicketPriority;
  creatorId: number;
}
