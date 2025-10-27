import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config();

/**
 Esta función se encarga de generar un nuevo token de autenticación. Utiliza el $\text{ID}$ 
 de usuario proporcionado para crear la carga útil (payload) del token y luego lo firma 
 digitalmente usando una clave secreta almacenada en las variables de entorno ($\text{JWT\_SECRET}$).
 */
export const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: "24h"
    })
}
