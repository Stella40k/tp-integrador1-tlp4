export type UserRole = "CLIENT" | "SUPPORT" | "ADMIN";
export type TicketPriority = "LOW" | "MEDIUM" | "HIHG" | "CRITICAL";
export type TicketStatus = "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";
export type TicketCategory = "HARDWARE" | "SOFTWARE" | "NETWORK" | "ACCESS";

export interface IUserAttributes {
  id?: number;
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ITicketAttributes {
  id?: number;
  title: string;
  description: string;
  category: TicketCategory;
  priority: TicketPriority;
  status: TicketStatus;
  creatorId: number;
  assignedToId?: number | null;
  createdAt?: Date;
  updatedAt?: Date;
}
