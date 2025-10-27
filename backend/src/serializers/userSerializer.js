/**
 $\text{serializeUser}$ toma un objeto completo de usuario (típicamente devuelto por una consulta a la base de datos) y 
 crea un nuevo objeto que solo contiene un subconjunto específico de datos, filtrando cualquier información sensible (como contraseñas o hashes).
 */
export const serializeUser = (user) => {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
    };
};

/**
 Esta función actúa como un wrapper o empaquetador para la respuesta de un inicio de sesión o registro exitoso. 
 Utiliza el resultado de $\text{serializeUser}$ (los datos públicos del usuario) y lo combina con el $\text{JSON Web Token}$ 
 generado, creando un único objeto listo para ser enviado al cliente.
 */
export const serializeUserWithToken = (user, token) => {
    return {
        user: serializeUser(user),
        token
    };
};
