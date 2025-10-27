import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config();

//verificar el token de usuario 

/**
 Esta función se encarga de verificar que la solicitud entrante contenga un Bearer Token válido en el encabezado $\text{Authorization}$. Si el token es válido, decodifica los datos del usuario y permite que la solicitud continúe. Si falla la autenticación, detiene el flujo de ejecución y responde con un error $\text{401 Unauthorized}$.
 */
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