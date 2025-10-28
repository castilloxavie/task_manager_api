# Task Manager - Full Stack Application

Una aplicación completa de gestión de tareas construida con Node.js, Express, React y MySQL. Incluye autenticación JWT, interfaz de usuario moderna y operaciones CRUD completas para tareas.

## 🚀 Características

### Backend (API REST)
- **Autenticación JWT**: Registro y login de usuarios con tokens JWT seguros
- **Gestión de tareas**: CRUD completo (Crear, Leer, Actualizar, Eliminar) de tareas
- **Validación robusta**: Validaciones de datos con express-validator
- **ORM Sequelize**: Modelado de datos relacional con MySQL
- **Middleware de seguridad**: Protección de rutas y manejo de CORS
- **Serialización de respuestas**: Formato JSON consistente
- **Logging**: Morgan para registro de requests HTTP

### Frontend (React + Vite)
- **Interfaz moderna**: React 19 con Vite para desarrollo rápido
- **Autenticación completa**: Login y registro con manejo de tokens
- **Gestión de tareas**: UI intuitiva para todas las operaciones CRUD
- **Diseño responsivo**: Interfaz adaptativa con Tailwind CSS
- **Estado global**: Context API para manejo de autenticación y tareas
- **Rutas protegidas**: Navegación basada en estado de autenticación
- **Feedback de usuario**: Estados de carga, errores y confirmaciones
- **Optimización de iconos**: Emojis nativos en lugar de SVGs pesados

## 🛠️ Tecnologías Utilizadas

### Backend
- **Node.js** - Entorno de ejecución JavaScript del lado servidor
- **Express.js** - Framework web minimalista y flexible
- **Sequelize** - ORM para Node.js con soporte para MySQL
- **MySQL** - Sistema de gestión de bases de datos relacional
- **JWT** - JSON Web Tokens para autenticación
- **bcrypt** - Hashing seguro de contraseñas
- **express-validator** - Middleware de validación de datos
- **CORS** - Manejo de solicitudes cross-origin
- **Morgan** - Middleware de logging HTTP
- **nodemon** - Reinicio automático del servidor en desarrollo

### Frontend
- **React 19** - Biblioteca para interfaces de usuario
- **Vite** - Herramienta de construcción rápida y moderna
- **React Router DOM** - Enrutamiento declarativo para React
- **Axios** - Cliente HTTP basado en promesas
- **Tailwind CSS** - Framework CSS utilitario
- **Context API** - Manejo de estado global en React
- **ESLint** - Linting de código JavaScript/React

## 📁 Estructura del Proyecto

```
task_manager_api/
├── backend/
│   ├── src/
│   │   ├── app.js                 # Configuración principal de Express
│   │   ├── server.js              # Punto de entrada del servidor
│   │   ├── config/
│   │   │   └── database.js        # Configuración de Sequelize/MySQL
│   │   ├── controllers/
│   │   │   ├── userControllers.js # Lógica de usuarios (registro/login)
│   │   │   └── taskControllers.js # Lógica de tareas (CRUD)
│   │   ├── middlewares/
│   │   │   ├── authMiddleware.js  # Middleware de autenticación JWT
│   │   │   └── validateMiddleware.js # Middleware de validación
│   │   ├── models/
│   │   │   ├── index.js           # Configuración de modelos Sequelize
│   │   │   ├── userModels.js      # Modelo de Usuario
│   │   │   └── taskModel.js       # Modelo de Tarea
│   │   ├── routes/
│   │   │   ├── userRoutes.js      # Rutas de autenticación
│   │   │   └── taskRoutes.js      # Rutas de tareas
│   │   ├── serializers/
│   │   │   ├── userSerializer.js  # Formateo de respuestas de usuario
│   │   │   └── taskSerializer.js  # Formateo de respuestas de tarea
│   │   ├── services/
│   │   │   ├── userServices.js    # Servicios de negocio para usuarios
│   │   │   └── taskServices.js    # Servicios de negocio para tareas
│   │   └── utils/
│   │       ├── generateToken.js   # Generación de tokens JWT
│   │       └── handleError.js     # Manejo centralizado de errores
│   ├── package.json
│   ├── .env                       # Variables de entorno (no incluido)
│   └── .gitignore
├── frontend/
│   ├── src/
│   │   ├── components/            # Componentes reutilizables
│   │   │   ├── Login.jsx & Login.css      # Componente de login
│   │   │   ├── Register.jsx & Register.css # Componente de registro
│   │   │   ├── TaskForm.jsx & TaskForm.css # Formulario de tareas
│   │   │   └── TaskList.jsx & TaskList.css # Lista de tareas
│   │   ├── context/               # Context providers de React
│   │   │   ├── AuthContext.jsx    # Contexto de autenticación
│   │   │   └── TaskContext.jsx    # Contexto de tareas
│   │   ├── pages/                 # Páginas/componentes de ruta
│   │   │   ├── LoginPage.jsx      # Página de login
│   │   │   ├── RegisterPage.jsx   # Página de registro
│   │   │   └── TasksPage.jsx      # Página principal de tareas
│   │   ├── App.jsx & App.css      # Componente raíz de la aplicación
│   │   ├── index.css              # Estilos globales
│   │   └── main.jsx               # Punto de entrada de React
│   ├── public/                    # Archivos estáticos
│   ├── index.html                 # HTML principal
│   ├── package.json
│   ├── vite.config.js             # Configuración de Vite
│   ├── .gitignore
│   └── eslint.config.js           # Configuración de ESLint
└── README.md                      # Este archivo
```

## 🚀 Instalación y Configuración

### Prerrequisitos
- **Node.js** (versión 18 o superior)
- **MySQL** (versión 8.0 o superior)
- **Git** para control de versiones

### 1. Clonar el repositorio
```bash
git clone https://github.com/castilloxavie/task_manager_api.git
cd task_manager_api
```

### 2. Configurar el Backend

#### Instalar dependencias
```bash
cd backend
npm install
```

#### Configurar la base de datos
1. Crear una base de datos MySQL llamada `task_manager_db`
2. Crear archivo `.env` en la carpeta `backend/`:
```env
PORT=3000
DB_HOST=localhost
DB_USER=tu_usuario_mysql
DB_PASSWORD=tu_contraseña_mysql
DB_NAME=task_manager_db
JWT_SECRET=tu_clave_secreta_muy_segura_aqui
```

#### Ejecutar el backend
```bash
# Modo desarrollo (con nodemon)
npm run dev

# Modo producción
npm start
```
El servidor se ejecutará en `http://localhost:3000`

### 3. Configurar el Frontend

#### Instalar dependencias
```bash
cd ../frontend
npm install
```

#### Ejecutar el frontend
```bash
npm run dev
```
La aplicación React se ejecutará en `http://localhost:5173`

## 📡 API Endpoints

### Autenticación

#### Registro de usuario
```http
POST /api/users/registro
Content-Type: application/json

{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "password": "123456"
}
```

#### Login de usuario
```http
POST /api/users/login
Content-Type: application/json

{
  "email": "juan@example.com",
  "password": "123456"
}
```

### Tareas (requieren Bearer token)

#### Crear tarea
```http
POST /api/tasks
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Mi primera tarea",
  "description": "Descripción detallada",
  "status": "pendiente"
}
```

#### Obtener tareas del usuario
```http
GET /api/tasks
Authorization: Bearer <token>
```

#### Obtener tarea específica
```http
GET /api/tasks/:id
Authorization: Bearer <token>
```

#### Actualizar tarea
```http
PUT /api/tasks/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Tarea actualizada",
  "status": "en_progreso"
}
```

#### Eliminar tarea
```http
DELETE /api/tasks/:id
Authorization: Bearer <token>
```

## 🎯 Estados de Tareas

- `pendiente` - 📋 Tarea pendiente
- `en_progreso` - ⚡ Tarea en progreso
- `completada` - ✅ Tarea completada

## ✅ Validaciones

### Usuario
- **Nombre**: 2-50 caracteres, requerido
- **Email**: Formato válido, único en la base de datos
- **Contraseña**: Mínimo 6 caracteres, requerida

### Tarea
- **Título**: 1-100 caracteres, requerido
- **Descripción**: 1-500 caracteres, requerida
- **Estado**: Opcional, debe ser uno de los estados válidos

## 🔧 Scripts Disponibles

### Backend
```bash
npm run dev    # Inicia servidor en modo desarrollo
npm start      # Inicia servidor en modo producción
```

### Frontend
```bash
npm run dev      # Inicia servidor de desarrollo
npm run build    # Construye para producción
npm run preview  # Vista previa de la build
npm run lint     # Ejecuta ESLint
```

## 🧪 Testing con Postman

1. **Registrar usuario**: `POST /api/users/registro`
2. **Hacer login**: `POST /api/users/login` (guardar token)
3. **Configurar token**: En headers: `Authorization: Bearer <token>`
4. **Probar operaciones CRUD** de tareas

## 🔒 Variables de Entorno

### Backend (.env)
```env
PORT=3000
DB_HOST=localhost
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=task_manager_db
JWT_SECRET=clave_super_secreta
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea tu rama de feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia ISC.

## 👨‍💻 Autor

**Xavier Castillo**
- GitHub: [@castilloxavie](https://github.com/castilloxavie)

---

⭐ Si este proyecto te resulta útil, ¡dale una estrella en GitHub!
