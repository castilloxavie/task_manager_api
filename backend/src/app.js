import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import userRutes from "./routes/userRoutes.js"
// import taskRutes from "./routes/taskRoutes.js"

dotenv.config();

const app = express();

// Middlewares
/* `app.use(express.json());` configura el middleware para analizar las solicitudes entrantes con cargas útiles JSON.
Esto permite que la aplicación gestione los datos JSON enviados en el cuerpo de la solicitud. */
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));


// Rutas
/* Los códigos `app.use("/api/users", userRutes);` y `app.use("/api/tasks", taskRutes);`
configuran rutas en la aplicación Express. */
app.use("/api/users", userRutes);
// app.use("/api/tasks", taskRutes);

export default app;
