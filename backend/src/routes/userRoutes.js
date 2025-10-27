import express from "express";
import {loginUsuario, registrarUsuario} from "../controllers/userControllers.js"
import { validateRegister, validateLogin } from "../middlewares/validateMiddleware.js";
const router = express.Router();

/* Estas líneas de código configuran rutas POST para registrar e iniciar sesión en una aplicación Express.*/
router.post("/registro", validateRegister, registrarUsuario);
router.post("/login", validateLogin, loginUsuario);

export default router;
