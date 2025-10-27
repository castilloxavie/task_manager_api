# Task Manager API

Una API RESTful para gestión de tareas construida con Node.js, Express, Sequelize y MySQL. Permite a los usuarios registrarse, autenticarse y gestionar sus tareas personales con operaciones CRUD completas.

## Características

- **Autenticación JWT**: Registro y login de usuarios con tokens JWT
- **Gestión de tareas**: Crear, leer, actualizar y eliminar tareas
- **Validación de datos**: Validaciones robustas con express-validator
- **ORM Sequelize**: Modelado de datos con relaciones
- **Base de datos MySQL**: Persistencia de datos
- **Middleware de autenticación**: Protección de rutas sensibles
- **Serialización de respuestas**: Formato consistente de datos JSON

## Tecnologías utilizadas

- **Node.js** - Entorno de ejecución
- **Express.js** - Framework web
- **Sequelize** - ORM para bases de datos
- **MySQL** - Base de datos relacional
- **JWT** - Autenticación basada en tokens
- **bcrypt** - Hashing de contraseñas
- **express-validator** - Validación de datos
- **CORS** - Manejo de solicitudes cross-origin
- **Morgan** - Logging de requests

## Estructura del proyecto

```
backend/
├── src/
│   ├── app.js                 # Configuración principal de Express
│   ├── server.js              # Punto de entrada del servidor
│   ├── config/
│   │   └── database.js        # Configuración de Sequelize
│   ├── controllers/
│   │   ├── userControllers.js # Controladores de usuarios
│   │   └── taskControllers.js # Controladores de tareas
│   ├── middlewares/
│   │   ├── authMiddleware.js  # Middleware de autenticación
│   │   └── validateMiddleware.js # Middleware de validación
│   ├── models/
│   │   ├── userModels.js      # Modelo de Usuario
│   │   └── taskModel.js       # Modelo de Tarea
│   ├── routes/
│   │   ├── userRoutes.js      # Rutas de usuarios
│   │   └── taskRoutes.js      # Rutas de tareas
│   ├── serializers/
│   │   ├── userSerializer.js  # Serializador de usuarios
│   │   └── taskSerializer.js  # Serializador de tareas
│   ├── services/
│   │   ├── userServices.js    # Servicios de usuarios
│   │   └── taskServices.js    # Servicios de tareas
│   └── utils/
│       ├── generateToken.js   # Generación de tokens JWT
│       └── handleError.js     # Manejo de errores
├── package.json
└── .env                       # Variables de entorno (no incluido)
```

## Instalación

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/castilloxavie/task_manager_api.git
   cd task_manager_api/backend
   ```

2. **Instala las dependencias:**
   ```bash
   npm install
   ```

3. **Configura las variables de entorno:**
   Crea un archivo `.env` en la carpeta `backend/` con las siguientes variables:
   ```env
   PORT=3000
   DB_HOST=localhost
   DB_USER=tu_usuario_mysql
   DB_PASSWORD=tu_contraseña_mysql
   DB_NAME=task_manager_db
   JWT_SECRET=tu_clave_secreta_jwt
   ```

4. **Configura la base de datos:**
   - Crea una base de datos MySQL llamada `task_manager_db`
   - Las tablas se crearán automáticamente con Sequelize

## Ejecución

### Modo desarrollo
```bash
npm run dev
```
El servidor se iniciará en `http://localhost:3000` con nodemon para recarga automática.

### Modo producción
```bash
npm start
```

## API Endpoints

### Autenticación

#### Registro de usuario
- **POST** `/api/users/registro`
- **Body:**
  ```json
  {
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "password": "123456"
  }
  ```
- **Respuesta exitosa:**
  ```json
  {
    "message": "Usuario registrado correctamente",
    "user": {
      "id": 1,
      "name": "Juan Pérez",
      "email": "juan@example.com"
    },
    "token": "jwt_token_aqui"
  }
  ```

#### Login de usuario
- **POST** `/api/users/login`
- **Body:**
  ```json
  {
    "email": "juan@example.com",
    "password": "123456"
  }
  ```
- **Respuesta exitosa:**
  ```json
  {
    "message": "Login exitoso",
    "user": {
      "id": 1,
      "name": "Juan Pérez",
      "email": "juan@example.com"
    },
    "token": "jwt_token_aqui"
  }
  ```

### Tareas (requieren autenticación - incluir Bearer token en headers)

#### Crear tarea
- **POST** `/api/tasks`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "title": "Mi primera tarea",
    "description": "Descripción detallada de la tarea",
    "status": "pendiente"
  }
  ```
- **Respuesta exitosa:**
  ```json
  {
    "message": "Tarea creada correctamente",
    "task": {
      "id": 1,
      "title": "Mi primera tarea",
      "description": "Descripción detallada de la tarea",
      "status": "pendiente",
      "user_id": 1,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  }
  ```

#### Obtener todas las tareas del usuario
- **GET** `/api/tasks`
- **Headers:** `Authorization: Bearer <token>`
- **Respuesta exitosa:**
  ```json
  {
    "message": "Tareas obtenidas correctamente",
    "tasks": [
      {
        "id": 1,
        "title": "Mi primera tarea",
        "description": "Descripción detallada",
        "status": "pendiente",
        "user_id": 1,
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-01T00:00:00.000Z"
      }
    ]
  }
  ```

#### Obtener tarea específica
- **GET** `/api/tasks/:id`
- **Headers:** `Authorization: Bearer <token>`
- **Respuesta exitosa:** Similar a crear tarea pero para una tarea específica

#### Actualizar tarea
- **PUT** `/api/tasks/:id`
- **Headers:** `Authorization: Bearer <token>`
- **Body:** (campos opcionales)
  ```json
  {
    "title": "Tarea actualizada",
    "status": "en_progreso"
  }
  ```

#### Eliminar tarea
- **DELETE** `/api/tasks/:id`
- **Headers:** `Authorization: Bearer <token>`
- **Respuesta exitosa:**
  ```json
  {
    "message": "Tarea eliminada correctamente"
  }
  ```

## Estados de tareas

- `pendiente`: Tarea pendiente
- `en_progreso`: Tarea en progreso
- `completada`: Tarea completada

## Validaciones

### Usuario
- **Nombre:** Requerido, 2-50 caracteres
- **Email:** Requerido, formato válido
- **Contraseña:** Requerida, mínimo 6 caracteres

### Tarea
- **Título:** Requerido, 1-100 caracteres
- **Descripción:** Requerida, 1-500 caracteres
- **Estado:** Opcional, debe ser uno de: pendiente, en_progreso, completada

## Manejo de errores

La API devuelve errores en formato JSON:
```json
{
  "error": "Mensaje de error descriptivo"
}
```

Códigos de estado HTTP comunes:
- `200`: Éxito
- `201`: Recurso creado
- `400`: Datos inválidos
- `401`: No autorizado
- `404`: Recurso no encontrado
- `500`: Error interno del servidor

## Testing con Postman

1. **Registra un usuario** usando el endpoint POST `/api/users/registro`
2. **Haz login** con POST `/api/users/login` y guarda el token
3. **Configura el token** en los headers de las demás requests: `Authorization: Bearer <token>`
4. **Prueba las operaciones CRUD** de tareas

## Scripts disponibles

- `npm run dev`: Inicia el servidor en modo desarrollo con nodemon
- `npm start`: Inicia el servidor en modo producción
- `npm test`: Ejecuta tests (no implementados aún)

## Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia ISC.

## Autor

Desarrollado por Xavier Castillo
