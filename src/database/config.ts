import { DataSource } from "typeorm";
import dotenv from "dotenv";
import * as models from "../models";
dotenv.config();

const pool: DataSource = new DataSource({
  type: "postgres",
  username: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT as string, 10),
  entities: Object.values(models),
  synchronize: true,
  logging: true,
  ssl: true, // Habilitar SSL
  extra: {
    ssl: {
      rejectUnauthorized: false, // Aceptar certificados no verificados
    },
  },
});

export default pool;
