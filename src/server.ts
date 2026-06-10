import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    name: "UserManager API",
    version: "1.0.0",
    status: "running",
    author: "Kenneth Alonso Arce"
  });
});

// Endpoint temporal para ver la información de la API
app.get("/api/info", (req,res) => {
  res.json({
    project: "UserManager API",
    description: "API REST para gestionar usuarios",
    day: 2,
    technologies: ["Node.js", "Express", "TypeScript"]
  });
});

// Endpoint para comprobar que la API está funcionando
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "UserManager API funcionando",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
    environment: "development"
  });
});

app.get("/api/ping", (req,res) => {
  res.status(200).json({
    message: "pong"
  });
});

// Endpoint para ver la lista de todos los usuarios
app.get("/api/users", (req,res) => {
  res.status(200).json({
    message: "Listado de usuarios",
    data: []
  });
});

// Endpoint para consultar el perfil de la persona conectada
app.get("/api/users/me", (req,res) => {
  res.status(200).json({
    id: 1,
    name: "Usuario de prueba",
    email: "usuario@email.com",
    role: "USER",
    isActive: true
  });
});

// Endpoint para ver un usuario por ID
app.get("/api/users/:id", (req,res) => {
  const { id } = req.params;
  res.status(200).json({
    message: "Detalle de usuario",
    id: id
  });
});

// Endpoint para crear un nuevo usuario
app.post("/api/users/", (req,res) => {
  const userData = req.body;
  res.status(201).json({
    message: "Usuario recibido para crear",
    data: userData
  });
});

// Endpoint para modificar un usuario
app.patch("/api/users/:id", (req,res) => {
  const { id } = req.params;
  const changes = req.body;
  res.status(200).json({
    message: "Usuario recibido para actualizar",
    id: id,
    changes: changes
  });
});

// Endpoint para borrar un usuario
app.delete("/api/users/:id", (req,res) => {
  const { id } = req.params;
  res.status(200).json({
    message: "Usuario recibido para eliminar o desactivar",
    id: id
  });
});

// Endpoint para cambiar el estado de un usuario
app.patch("/api/users/:id/status", (req,res) => {
  const { id } = req.params;
  const { isActive } = req.body;
  res.status(200).json({
    message: "Estado de usuario recibido para actualizar",
    id: id,
    isActive: isActive
  });
});

// Endpoint para cambiar el rol de un usuario
app.patch("/api/users/:id/role", (req,res) => {
  const { id } = req.params;
  const { role } = req.body;
  res.status(200).json({
    message: "Rol de usuario recibido para actualizar",
    id: id,
    role: role
  });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});