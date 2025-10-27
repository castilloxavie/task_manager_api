import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/database.js";


/* Este fragmento de código define un modelo Sequelize para una entidad Usuario en una aplicación Node.js 
mediante el ORM (Mapeo Objeto-Relacional) de Sequelize.*/
const User = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,

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

export default User;
