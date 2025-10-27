import express from "express";
const router = express.Router();

import { crearTarea, obtenerTareas, obtenerTarea, actualizarTarea, eliminarTarea } from "../controllers/taskControllers.js";
import { validateTask } from "../middlewares/validateMiddleware.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

// Todas las rutas de tareas requieren autenticación
router.use(authMiddleware);

// Rutas para tareas
router.post("/", validateTask, crearTarea);
router.get("/", obtenerTareas);
router.get("/:id", obtenerTarea);
router.put("/:id", validateTask, actualizarTarea);
router.delete("/:id", eliminarTarea);

export default router;
