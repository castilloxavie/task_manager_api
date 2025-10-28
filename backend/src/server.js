import app from "./app.js"
import dotenv from "dotenv";
import { sequelize } from "./models/index.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

/**
La función `startserver` se conecta a una base de datos mediante Sequelize, 
sincroniza tablas e inicia un servidor en un puerto específico.
 **/
async function startserver() {
    try {
        await sequelize.authenticate()
        console.log("base de datos conectada, correctamente")

        await sequelize.sync()
        console.log("Tablas sincronizadas correctamente")

        app.listen(PORT, () => {
            console.log(`Servidor corriendo en el puerto: http://localhost:${PORT}`);

        })

    } catch (error) {
        console.error("No se pudo conectar a la base de datos:", error);
    }
}

startserver();
