import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/database.js";


/* Este fragmento de código define un modelo de Sequelize llamado `Task` que representa una tabla en una base de datos.
A continuación, se detalla lo que representa cada propiedad en la definición del modelo: */
const Task = sequelize.define("Task", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    status:{
        type: DataTypes.ENUM("pendiente", "en_progreso", "completada"),
        allowNull: false,
        defaultValue: "pendiente",
    },
    user_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id'
        }
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
    }
})

export default Task;
