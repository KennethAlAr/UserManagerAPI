import express from "express";

const app = express();
const PORT = 3000;

type User = {
  id: number;
  name: string;
  email: string;
  role: "USER" | "ADMIN";
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

// Datos temporales en memoria. Más adelante se sustituirán por una base de datos.
const users: User[] = [
  {
    id: 1,
    name: "Ana García",
    email: "ana@email.com",
    role: "USER",
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 2,
    name: "Carlos Pérez",
    email: "carlos@email.com",
    role: "ADMIN",
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 3,
    name: "Laura Martínez",
    email: "laura@email.com",
    role: "USER",
    isActive: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 4,
    name: "Kenneth Alonso",
    email: "kenneth@email.com",
    role: "ADMIN",
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 5,
    name: "Sara Gómez",
    email: "sara@email.com",
    role: "USER",
    isActive: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

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
    total: users.length,
    data: users
  });
});

app.get("/api/users/count", (req,res) => {
  res.status(200).json({
    total: users.length
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

app.get("/api/users/search", (req,res) => {
  const query = req.query;

  res.status(200).json({
    message: "Búsqueda de usuarios",
    filters: query
  });
});

app.get("/api/users/active", (req,res) => {
  const activeUsers = users.filter((user) => user.isActive);

  if (activeUsers.length === 0) {
    return res.status(404).json({
      error: "No hay usuarios activos"
    })
  }

  res.status(200).json({
    message: "Lista de usuarios activos",
    data: activeUsers
  })
})

// Endpoint para ver un usuario por ID
app.get("/api/users/:id", (req,res) => {
  const idParam = req.params.id;
  const id = Number(idParam);

  if (Number.isNaN(id)) {
    return res.status(400).json({
      error: "El ID debe ser un número",
      received: idParam
    });
  }

  const user = users.find((user) => user.id === id);

  if (!user) {
    return res.status(404).json({
      error: "Usuario no encontrado",
      id
    });
  }

  res.status(200).json({
    message: "ID recibido correctamente",
    data: user
  });
});

// Endpoint para crear un nuevo usuario
app.post("/api/users/", (req,res) => {
  const userData = req.body;

  console.log("Body recibido en POST /api/users:", userData);

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

app.post("/api/debug/body", (req,res) => {
  res.status(200).json({
    message: "Body recibido correctamente",
    body: req.body
  });
});

app.get("/api/debug/params/:id", (req,res) => {
  res.status(200).json({
    message: "Params recibidos correctamente",
    params: req.params
  });
});

app.get("/api/debug/query", (req,res) => {
  res.status(200).json({
    message: "Query params recibidos correctamente",
    query: req.query
  });
});

app.get("/api/debug/headers", (req,res) => {
  res.status(200).json({
    message: "Headers recibidos correctamente",
    headers: req.headers
  });
});

app.patch("/api/debug/users/:id", (req,res) => {
  const { id } = req.params;
  const { notify } = req.query;
  const authorization = req.headers.authorization;
  const changes = req.body;

  res.status(200).json({
    message: "Datos combinados recibidos",
    id,
    notify,
    authorization,
    changes
  });
});

app.patch("/api/users/me/password", (req,res) => {
  const { currentPassword } = req.body;
  const { newPassword } = req.body;

  res.status(200).json({
    message: "Solicitud de cambio de contraseña recibida",
  });
});

app.get("/api/debug/client", (req,res) => {
  const client = req.headers["x-client-name"];

  res.status(200).json({
    client: client
  });
});

app.post("/api/debug/request", (req,res) => {
  res.status(200).json({
    message: "Información completa de la petición",
    method: req.method,
    path: req.path,
    params: req.params,
    query: req.query,
    headers: req.headers,
    body: req.body
  });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});