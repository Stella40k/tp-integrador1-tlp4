import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import ticketRoutes from "./routes/ticket.routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/api/ticket', ticketRoutes)

app.get("/api/healt", (_req, res) => {
  // responde con un 200 (OK) y un objt JSON confirmando que la API esta activa con la fecha actual
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

async function bootstrap() {
  try {
    console.log("verificando inicializacion de la conexion singleton");
    //sin autenticate forxado para compilar y correr pq todavia no tengo levantado postgres
    app.listen(PORT, () => {
      console.log(`servidor back escuchando enhttp://localhost:${PORT}`);
    });
  } catch (error) {
    console.log("Error al iniciar el server", error);
    process.exit(1);
  }
}

bootstrap();
