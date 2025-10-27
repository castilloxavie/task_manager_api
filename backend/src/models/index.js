import sequelize from "../config/database.js";
import User from "./userModels.js";
import Task from "./taskModel.js";

// Definir relaciones
/* Estas líneas de código definen las relaciones entre los modelos de Usuario y Tarea 
en una configuración ORM de Sequelize. */
User.hasMany(Task, {
    foreignKey: 'user_id',
    as: 'tasks'
});

Task.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user'
});

export { sequelize, User, Task };
