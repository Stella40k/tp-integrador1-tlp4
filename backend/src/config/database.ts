import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

//patron singleton
//unica instancia de conexion a la bd en toda la app

export class Database {
  private static instance: Sequelize | null = null;
  private constructor() {} //evita instancias directas con new

  public static getInstance(): Sequelize {
    if (!Database.instance) {
      const dbName = process.env.DB_NAME ?? "tp_integrador";
      const dbUser = process.env.DB_USER ?? "tlp4";
      const dbPass = process.env.DB_PASSWORD ?? "tlp4";
      const dbHost = process.env.DB_HOST ?? "localhost";
      const dbPORT = Number(process.env.DB_PORT) || 5432;

      Database.instance = new Sequelize(dbName, dbUser, dbPass, {
        host: dbHost,
        port: dbPORT,
        dialect: "postgres",
        logging: process.env.NODE_ENV === "development" ? console.log : false,
      });
    }
    return Database.instance;
  }
}
export const sequelize = Database.getInstance();
