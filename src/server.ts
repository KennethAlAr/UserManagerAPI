import express, { Request, Response, NextFunction } from "express";

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

class AppError extends Error {
  statusCode: number;
  details?: unknown;

  constructor(message: string, statusCode: number = 500, details?: unknown) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
  }
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

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isBoolean(value: unknown): value is Boolean {
  return typeof value === "boolean";
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function isValidBasicName(value: string): boolean {
  return value.trim().length >= 2;
}

function isValidBasicEmail(value: string): boolean {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;
  return emailRegex.test(value);
}

function isValidPassword(value: string): boolean {
  const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/;
  return regex.test(value);
}

function isEmailTaken(email: string, userIdToIgnore?: number): boolean {
  const normalizedEmail = normalizeEmail(email);

  return users.some(
    (user) => user.email === normalizedEmail && user.id !== userIdToIgnore
  );
}

app.use(express.json());

// Endpoint raíz para ver información de la aplicación ----------------------------------------------------------------
app.get("/", (req, res) => {
  res.json({
    name: "UserManager API",
    version: "1.0.0",
    status: "running",
    author: "Kenneth Alonso Arce"
  });
});

// Endpoint temporal para ver la información de la API ----------------------------------------------------------------
app.get("/api/info", (req,res) => {
  res.json({
    project: "UserManager API",
    description: "API REST para gestionar usuarios",
    day: 2,
    technologies: ["Node.js", "Express", "TypeScript"]
  });
});

// Endpoint para comprobar que la API está funcionando ----------------------------------------------------------------
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "UserManager API funcionando",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
    environment: "development"
  });
});

// Endpoint para comprobar la respuesta de la API ---------------------------------------------------------------------
app.get("/api/ping", (req,res) => {
  res.status(200).json({
    message: "pong"
  });
});

// Endpoint para ver la lista de todos los usuarios -------------------------------------------------------------------
app.get("/api/users", (req,res) => {
  res.status(200).json({
    message: "Listado de usuarios",
    total: users.length,
    data: users
  });
});

// Endpoint para contar el número de usuarios -------------------------------------------------------------------------
app.get("/api/users/count", (req,res) => {
  res.status(200).json({
    total: users.length
  });
});

// Endpoint para consultar el perfil de la persona conectada ----------------------------------------------------------
app.get("/api/users/me", (req,res) => {
  res.status(200).json({
    id: 1,
    name: "Usuario de prueba",
    email: "usuario@email.com",
    role: "USER",
    isActive: true
  });
});

// Endpoint para buscar a un usuario ----------------------------------------------------------------------------------
app.get("/api/users/search", (req,res) => {
  const query = req.query;
  
  res.status(200).json({
    message: "Búsqueda de usuarios",
    filters: query
  });
});

// Endpoint para buscar a un usuario por email-------------------------------------------------------------------------
app.get("/api/users/search/email", (req,res,next) => {
  const email = req.query.email;
  const data = users.find((user) => user.email === email)

  if(!data) {
    return next(
      new AppError("Usuario no encontrado", 404, {
        email: email
      })
    );
  }

  res.status(200).json({
    message: "Búsqueda de usuarios por email",
    data: data
  });
});

// Endpoint para ver la lista de usuarios activados -------------------------------------------------------------------
app.get("/api/users/active", (req,res, next) => {
  const activeUsers = users.filter((user) => user.isActive);

  if (activeUsers.length === 0) {
    return next(
      new AppError("No hay usuarios activos", 404)
    );
  }

  res.status(200).json({
    message: "Lista de usuarios activos",
    data: activeUsers
  });
});

// Endpoint para ver la lista de usuarios desactivados ----------------------------------------------------------------
app.get("/api/users/inactive", (req,res,next) => {
  const inactiveUsers = users.filter((user) => !user.isActive);

  if (inactiveUsers.length === 0) {
    return next(
      new AppError("No hay usuarios inactivos", 404)
    );
  }

  res.status(200).json({
    message: "Lista de usuarios inactivos",
    data: inactiveUsers
  })

});

// Endpoint para ver un usuario por ID --------------------------------------------------------------------------------
app.get("/api/users/:id", (req,res,next) => {
  const idParam = req.params.id;
  const id = Number(idParam);

  if (Number.isNaN(id)) {
    return next(
      new AppError("El ID debe ser un número", 400, {
        received: idParam
      })
    );
  }

  const user = users.find((user) => user.id === id);

  if (!user) {
    return next(
      new AppError("Usuario no encontrado", 404, {
        id
      })
    );
  }

  res.status(200).json({
    message: "ID recibido correctamente",
    data: user
  });
});

// Endpoint para crear un nuevo usuario -------------------------------------------------------------------------------
app.post("/api/users/", (req,res,next) => {
  const { name, email, password } = req.body;

  if (!isNonEmptyString(name)) {
    return next(
      new AppError("El nombre debe ser un texto no vacío", 400)
    );
  }

  if (!isNonEmptyString(email)) {
    return next(
      new AppError("El email debe ser un texto no vacío", 400)
    );
  }

  if (!isNonEmptyString(password)) {
    return next(
      new AppError("La contraseña debe ser un texto no vacío", 400)
    );
  }

  if(!isValidBasicName(name)) {
    return next(
      new AppError("El nombre debe tener al menos 2 caracteres", 400)
    );
  }

  const cleanName = name.trim();
  const cleanEmail = normalizeEmail(email);
  const cleanPassword = password.trim();

  if (!isValidPassword(cleanPassword)) {
    return next(
      new AppError("La contraseña debe tener al menos 8 caracteres e incluir al menos una letra, un número y un carácter especial", 400)
    );
  }

  if (!isValidBasicEmail(cleanEmail)) {
    return next(
      new AppError("El email no tiene un formato válido", 400)
    );
  }

  if (isEmailTaken(cleanEmail)) {
    return next(
      new AppError("El email ya está registrado", 409)
    );
  }

  const newId = users.length > 0
    ? Math.max(...users.map((user) => user.id)) + 1
    : 1;
  
  const newUser: User = {
    id: newId,
    name: cleanName,
    email: cleanEmail,
    role: "USER",
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  users.push(newUser);

  res.status(201).json({
    message: "Usuario creado correctamente",
    data: newUser
  });
});

// Endpoint para modificar un usuario ---------------------------------------------------------------------------------
app.patch("/api/users/:id", (req,res,next) => {
  const idParam = req.params.id;
  const id = Number(idParam);

  if (Number.isNaN(id)) {
    return next(
      new AppError("El ID debe ser un número", 400, {
        received: idParam
      })
    );
  }

  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex === -1) {
    return next(
      new AppError("Usuario no encontrado", 404, {
        id
      })
    );
  }

  const idBody = req.body.id;

  if (idBody !== undefined){
    return next(
      new AppError("No se puede modificar el ID de un usuario", 400)
    );
  }

  const { name, email, isActive, role } = req.body;

  if (role !== undefined){
    return next(
      new AppError("No se puede modificar el rol desde esta ruta", 400)
    );
  }

  if (isActive !== undefined){
    return next(
      new AppError("No se puede modificar el estado del usuario desde esta ruta", 400)
    );
  }

  const hasChanges =
    name !== undefined ||
    email !== undefined;

  if (!hasChanges) {
    return next(
      new AppError("Debes enviar al menos un campo para actualizar", 400)
    );
  }

  let cleanName: string | undefined;

  if (name !== undefined) {
    if (!isNonEmptyString(name)) {
      return next(
        new AppError("El nombre debe ser un texto no vacío", 400)
      );
    }

    if (!isValidBasicName(name)) {
      return next(
        new AppError("El nombre debe tener al menos 2 caracteres", 400)
      );
    }

    cleanName = name.trim();
  }

  let cleanEmail: string | undefined;

  if (email !== undefined) {
    if (!isNonEmptyString(email)) {
      return next(
        new AppError("El email debe ser un texto no vacío", 400)
      );
    }

    cleanEmail = normalizeEmail(email)

    if (!isValidBasicEmail(cleanEmail)) {
      return next(
        new AppError("El email no tiene un formato válido", 400)
      );
    }

    if (isEmailTaken(cleanEmail, id)) {
      return next(
        new AppError("El email ya está registrado", 409)
      );
    }
  }

  const currentUser = users[userIndex];

  const updatedUser : User = {
    ...currentUser,
    name: cleanName ?? currentUser.name,
    email: cleanEmail ?? currentUser.email,
    updatedAt: new Date().toISOString()
  }

  users[userIndex] = updatedUser;

  res.status(200).json({
    message: "Usuario actualizado correctamente",
    data: updatedUser
  });
});

// Endpoint para cambiar el estado de un usuario ----------------------------------------------------------------------
app.patch("/api/users/:id/status", (req,res,next) => {
  const idParam = req.params.id;
  const id = Number(idParam);

  if (Number.isNaN(id)) {
    return next(
      new AppError("El ID debe ser un número", 400, {
        received: idParam
      })
    );
  }

  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex === -1) {
    return next(
      new AppError("Usuario no encontrado", 404, {
        id
      })
    );
  }

  const { isActive } = req.body;

  if (isActive !== undefined && !isBoolean(isActive)) {
    return next(
      new AppError("isActive debe ser true o false", 400)
    );
  }

  const currentUser = users[userIndex];

  const updatedUser : User = {
    ...currentUser,
    isActive: isActive,
    updatedAt: new Date().toISOString()
  }

  users[userIndex] = updatedUser;

  res.status(200).json({
    message: "Estado del usuario actualizado correctamente",
    data: updatedUser
  });
});

// Endpoint para cambiar el rol de un usuario -------------------------------------------------------------------------
app.patch("/api/users/:id/role", (req,res,next) => {
  const idParam = req.params.id;
  const id = Number(idParam);

  if (Number.isNaN(id)) {
    return next(
      new AppError("El ID debe ser un número", 400, {
        received: idParam
      })
    );
  }

  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex === -1) {
    return next(
      new AppError("Usuario no encontrado", 404, {
        id
      })
    );
  }

  const { role } = req.body;

  if (!(role === "USER" || role === "ADMIN")) {
    return next(
      new AppError("Role debe ser USER o ADMIN", 400)
    );
  }

  const currentUser = users[userIndex];

  const updatedUser : User = {
    ...currentUser,
    role: role,
    updatedAt: new Date().toISOString()
  }

  users[userIndex] = updatedUser;

  res.status(200).json({
    message: "Estado del usuario actualizado correctamente",
    data: updatedUser
  });
});


// Endpoint para reactivar a un usuario -------------------------------------------------------------------------------
app.patch("/api/users/:id/reactivate", (req,res,next) => {
  const idParam = req.params.id;
  const id = Number(idParam);

  if(Number.isNaN(id)) {
    return next(
      new AppError("El ID debe ser un número", 400, {
        received: idParam
      })
    );
  }

  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex === -1) {
    return next(
      new AppError("Usuario no encontrado", 404, {
        id
      })
    );
  }

  const currentUser = users[userIndex];

  const userStatus = currentUser.isActive;

  if (userStatus) {
    return res.status(200).json({
      message: "El usuario ya estaba activado",
      data: {
        id,
        isActive: userStatus
      }
    });
  }

  const updatedUser: User = {
    ...currentUser,
    isActive: true,
    updatedAt: new Date().toISOString()
  };

  users[userIndex] = updatedUser;

  res.status(200).json({
    message: "Usuario activado correctamente",
    data: updatedUser
  });
});

// Endpoint para borrar un usuario ------------------------------------------------------------------------------------
app.delete("/api/users/:id", (req,res,next) => {
  const idParam = req.params.id;
  const id = Number(idParam);

  if(Number.isNaN(id)) {
    return next(
      new AppError("El ID debe ser un número", 400, {
        received: idParam
      })
    );
  }

  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex === -1) {
    return next(
      new AppError("Usuario no encontrado", 404, {
        id
      })
    );
  }

  const currentUser = users[userIndex];

  const userStatus = currentUser.isActive;

  if (!userStatus) {
    return res.status(200).json({
      message: "El usuario ya estaba desactivado",
      data: {
        id,
        isActive: userStatus
      }
    });
  }

  const updatedUser: User = {
    ...currentUser,
    isActive: false,
    updatedAt: new Date().toISOString()
  };

  users[userIndex] = updatedUser;

  res.status(200).json({
    message: "Usuario desactivado correctamente",
    data: updatedUser
  });
});

// Endpoints debug ----------------------------------------------------------------------------------------------------
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

// Endpoints temporal Error 500 ---------------------------------------------------------------------------------------
app.get("/api/debug/error", (req,res,next) => {
  next(new AppError("Error de prueba interno", 500));
});

function notFoundMiddleware(req: Request, res: Response, next: NextFunction) {
  next(
    new AppError(`No existe la ruta ${req.method} ${req.originalUrl}`, 404, {
      method: req.method,
      path: req.originalUrl
    })
  );
}

function errorMiddleware(
  err: AppError,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const statusCode = err.statusCode || 500;

  return res.status(statusCode).json({
    error: err.message || "Error interno del servidor",
    statusCode,
    details: err.details,
    path: req.originalUrl,
    method: req.method,
    timestamp: new Date().toISOString()
  });
}

app.use(notFoundMiddleware);
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});