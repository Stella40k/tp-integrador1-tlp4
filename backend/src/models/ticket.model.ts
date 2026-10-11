import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";
import {
  ITicketAttributes,
  TicketCategory,
  ticketPriority,
  TicketStatus,
} from "../types";
import { User } from "./user.model";

type TicketCreationAttributes = Optional<
  ITicketAttributes,
  "id" | "assignedToId" | "status" | "createdAt" | "updatedAt"
>;

export class Ticket
  extends Model<ITicketAttributes, TicketCreationAttributes>
  implements ITicketAttributes
{
  public id!: number;
  public title!: string;
  public description!: string;
  public category!: TicketCategory;
  public priority!: ticketPriority;
  public status!: TicketStatus;
  public creatorId!: number;
  public assignedToId!: number | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Ticket.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    category: {
      type: DataTypes.ENUM("HARDWARE", "SOFTWARE", "NETWORK", "ACCESS"),
      allowNull: false,
    },
    priority: {
      type: DataTypes.ENUM("LOW", "MEDIUM", "HIGH", "CRITICAL"),
      allowNull: false,
      defaultValue: "MEDIUM",
    },
    status: {
      type: DataTypes.ENUM("OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"),
      allowNull: false,
      defaultValue: "OPEN",
    },
    creatorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    assignedToId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "users",
        key: "id",
      },
    },
  },
  {
    sequelize,
    tableName: "tickets",
    timestamps: true,
  },
);

// relaciones entre las entidades
User.hasMany(Ticket, { foreignKey: "creatorId", as: "createdTickets" });
User.hasMany(Ticket, { foreignKey: "assignedToId", as: "assignedTickets" });

Ticket.belongsTo(User, { foreignKey: "creatorId", as: "creator" });
Ticket.belongsTo(User, { foreignKey: "assignedToId", as: "assignee" });
