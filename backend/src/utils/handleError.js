/**
 * Esta función centraliza el manejo de errores en Express. Su propósito es garantizar que, 
 * cuando ocurre un fallo, se envíe una respuesta $\text{JSON}$ consistente al cliente. Esto 
 * facilita el manejo de errores tanto en el backend como en el frontend.
 */
export const handleError = (res, status, message) => {
    return res.status(status).json({error: message});
}