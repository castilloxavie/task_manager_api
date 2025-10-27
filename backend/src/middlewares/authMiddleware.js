import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config();

//verificar el token de usuario 

export const authMiddleware = (req, res, next) => {
    const encabezadoAutorizado = req.headers.authorization;

    if(!encabezadoAutorizado || !encabezadoAutorizado.startsWith("Bearer ")){
        return res.status(401).json({error: "No autorizado, token faltante"})
    }

    const token = encabezadoAutorizado.split(" ")[1];

    try {
        const decifrado = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {id: decifrado.id};
        next();
    } catch (error) {
        return res.status(401).json({error: "No autorizado, token inválido"})
    }
}