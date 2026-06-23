# UserManager API

Reto opcional de construcción de una API REST de gestión de usuarios.

## Descripción

Este proyecto tiene como objetivo construir paso a paso una API REST capaz de gestionar usuarios, autenticación, roles, seguridad, base de datos e integración con un frontend.

## Instalación

Instalar dependencias:

```bash
npm install
```

Arrancar en modo desarrollo:

```bash
npm run dev
```

La API se ejecutará inicialmente en:

```text
http://localhost:3000
```
## Endpoints disponibles

### GET /

```http
GET /
```

Respuesta esperada:

```json
{
  "name": "UserManager API",
  "version": "1.0.0",
  "status": "running",
  "author": "Kenneth Alonso Arce"
}
```
### GET /api/info

```http
GET /api/info
```

Respuesta esperada:

```json
{
  "project": "UserManager API",
  "description": "API REST para gestionar usuarios",
  "day": 2,
  "technologies": [
    "Node.js",
    "Express",
    "TypeScript"
  ]
}
```
### GET /api/health

```http
GET /api/health
```

Respuesta esperada:

```json
{
  "status": "ok",
  "message": "UserManager API funcionando",
  "timestamp": "2026-01-01T10:00:00.000Z"
}
```
### GET /api/ping

```http
GET /api/ping
```

Respuesta esperada:

```json
{
  "message": "pong"
}
```

## Endpoints de usuarios

```http
GET /api/users
GET /api/users/:id
GET /api/users/active
GET /api/users/search/email
```

### GET /api/users
```http
GET /api/users
```

Respuesta esperada:
```json
{
  "message": "Listado de usuarios",
  "total": 3,
  "data": []
}
```

### GET /api/users/:id
```http
GET /api/users/:id
```

Devuelve un usuario concreto a partir de su ID.

Respuesta correcta:

```json
{
  "message": "ID recibido correctamente",
  "data": {
    "id": 1,
    "name": "Ana García",
    "email": "ana@email.com",
    "role": "USER",
    "isActive": true,
    "createdAt": "2026-06-16T13:12:53.504Z",
    "updatedAt": "2026-06-16T13:12:53.504Z"
  }
}
```

Posibles errores:

```json
{
  "error": "El ID debe ser un número",
  "received": "abc"
}
```

```json
{
  "error": "Usuario no encontrado",
  "id": 999
}
```

### GET /api/users/active
```http
GET /api/users/active
```
Devuelve una lista de los usuarios activos.

Respuesta correcta:

```json
{
  "message": "Lista de usuarios activos",
  "data": [
    {
      "id": 1,
      "name": "Ana García",
      "email": "ana@email.com",
      "role": "USER",
      "isActive": true,
      "createdAt": "2026-06-16T13:38:51.251Z",
      "updatedAt": "2026-06-16T13:38:51.251Z"
    },
    {
      "id": 2,
      "name": "Carlos Pérez",
      "email": "carlos@email.com",
      "role": "ADMIN",
      "isActive": true,
      "createdAt": "2026-06-16T13:38:51.251Z",
      "updatedAt": "2026-06-16T13:38:51.251Z"
    },
    {
      "id": 4,
      "name": "Kenneth Alonso",
      "email": "kenneth@email.com",
      "role": "ADMIN",
      "isActive": true,
      "createdAt": "2026-06-16T13:38:51.251Z",
      "updatedAt": "2026-06-16T13:38:51.251Z"
    }
  ]
}
```
Posibles errores:

```json
{
  "error": "No hay usuarios activos"
}
```

### GET /api/users/search/email
```http
GET /api/users/search/email
```
Devuelve el usuario con el email de la query.

Ejemplo de búsqueda:
```http
http://localhost:3000/api/users/search/email?email=ana@email.com
```

Respuesta correcta:

```json
{
    "message": "Búsqueda de usuarios por email",
    "data": {
        "id": 1,
        "name": "Ana García",
        "email": "ana@email.com",
        "role": "USER",
        "isActive": true,
        "createdAt": "2026-06-23T09:20:23.241Z",
        "updatedAt": "2026-06-23T09:20:23.241Z"
    }
}
```
Posibles errores:

```json
{
    "error": "Usuario no encontrado",
    "email": "pedro@email.com"
}
```

## Endpoint para crear usuario

### POST /api/users
```http
POST /api/users
```

Body:

```json
{
  "name": "María López",
  "email": "maria@email.com",
  "password": "123456"
}
```

Respuesta correcta:

```json
{
  "message": "Usuario creado correctamente",
  "data": {
    "id": 6,
    "name": "María López",
    "email": "maria@email.com",
    "role": "USER",
    "isActive": true,
    "createdAt": "2026-06-17T10:56:36.738Z",
    "updatedAt": "2026-06-17T10:56:36.738Z"
  }
}
```

Posibles errores:

```json
{
  "error": "name, email y password son obligatorios"
}
```

```json
{
  "error": "La contraseña debe tener al menos 6 caracteres"
}
```

```json
{
  "error": "El email ya está registrado"
}
```
## Actualizar usuario

### PATCH /api/users/:id
```http
PATCH /api/users/:id
```

Permite modificar parcialmente los datos de un usuario.

Campos permitidos:

```text
name
email
isActive
```

Body de ejemplo:

```json
{
  "name": "Ana Martínez"
}
```

Respuesta correcta:

```json
{
  "message": "Usuario actualizado correctamente",
  "data": {
    "id": 1,
    "name": "Ana Martínez",
    "email": "ana@email.com",
    "role": "USER",
    "isActive": true,
    "createdAt": "2026-06-19T09:44:13.843Z",
    "updatedAt": "2026-06-19T09:44:47.518Z"
  }
}
```

Posibles errores:

```json
{
  "error": "El ID debe ser un número",
  "received": "abc"
}
```

```json
{
  "error": "Usuario no encontrado",
  "id": 999
}
```

```json
{
  "error": "Debes enviar al menos un campo para actualizar"
}
```

```json
{
  "error": "El nombre no puede estar vacío"
}
```

```json
{
  "error": "El email no tiene un formato válido"
}
```

```json
{
  "error": "El email ya está registrado"
}
```

```json
{
  "error": "isActive debe ser true o false"
}
```

### PATCH /api/users/:id/status
```http
PATCH /api/users/:id/status
```

Permite modificar el estado de un usuario.

Campos permitidos:

```text
isActive
```

Body de ejemplo:

```json
{
  "isActive": false
}
```

Respuesta correcta:

```json
{
  "message": "Estado del usuario actualizado correctamente",
  "data": {
    "id": 1,
    "name": "Ana García",
    "email": "ana@email.com",
    "role": "USER",
    "isActive": false,
    "createdAt": "2026-06-19T11:02:47.070Z",
    "updatedAt": "2026-06-19T11:06:24.988Z"
  }
}
```

Posibles errores:

```json
{
  "error": "El ID debe ser un número",
  "received": "abc"
}
```

```json
{
  "error": "Usuario no encontrado",
  "id": 999
}
```

```json
{
  "error": "isActive debe ser true o false"
}
```
### PATCH /api/users/:id/role
```http
PATCH /api/users/:id/role
```

Permite modificar el rol de un usuario.

Campos permitidos:

```text
role
```

Body de ejemplo:

```json
{
  "role": "ADMIN"
}
```

Respuesta correcta:

```json
{
  "message": "Estado del usuario actualizado correctamente",
  "data": {
    "id": 1,
    "name": "Ana García",
    "email": "ana@email.com",
    "role": "ADMIN",
    "isActive": false,
    "createdAt": "2026-06-19T11:02:47.070Z",
    "updatedAt": "2026-06-19T11:06:24.988Z"
  }
}
```

Posibles errores:

```json
{
  "error": "El ID debe ser un número",
  "received": "abc"
}
```

```json
{
  "error": "Usuario no encontrado",
  "id": 999
}
```

```json
{
  "error": "Role debe ser 'USER' o 'ADMIN'"
}
```

## Eliminar o desactivar usuario

### DELETE /api/users/:id
```http
DELETE /api/users/:id
```

En este proyecto, esta ruta no borra físicamente el usuario. Realiza un borrado
lógico marcando:

```text
isActive = false
```

Respuesta correcta:

```json
{
  "message": "Usuario desactivado correctamente",
  "data": {
    "id": 1,
    "name": "Ana García",
    "email": "ana@email.com",
    "role": "USER",
    "isActive": false,
    "createdAt": "2026-06-19T15:36:03.396Z",
    "updatedAt": "2026-06-19T15:36:12.985Z"
  }
}
```

Posibles errores:

```json
{
  "error": "El ID debe ser un número",
  "received": "abc"
}
```

```json
{
  "error": "Usuario no encontrado",
  "id": 999
}
```

## Endpoints simulados de usuarios

```http
GET /api/users/me
```

Estos endpoints todavía no trabajan con datos reales. De momento sirven para
practicar métodos HTTP, rutas, parámetros y body.

## Rutas temporales de debug

Estas rutas se han creado para practicar cómo leer datos de una petición HTTP.

```http
POST /api/debug/body
GET /api/debug/params/:id
GET /api/debug/query
GET /api/debug/headers
PATCH /api/debug/users/:id
```

Más adelante estas rutas podrán eliminarse, ya que no forman parte de la API final.

## Validaciones básicas

La API realiza validaciones manuales antes de crear o actualizar usuarios.

Validaciones principales:

- `name` debe ser un texto no vacío.
- `name` debe tener al menos dos caracteres.
- `email` debe ser un texto no vacío.
- `email` debe contener una dirección de correo con un formato válido estándar.
- `password` debe ser un texto no vacío.
- `password` debe tener al menos 8 caracteres e incluir al menos una letra, un número y un carácter especial.
- `isActive` debe ser boolean.

Ejemplo de error:

```json
{
  "error": "El nombre debe ser un texto no vacío"
}
```
## Validación de email

La API normaliza los emails antes de guardarlos o compararlos.

Proceso aplicado:

- `trim()`
- `toLowerCase()`
- Validación básica de formato.
- Comprobación de duplicados.

Ejemplo:

```text
"  USUARIO@EMAIL.COM  " -> "usuario@email.com"
```

Si se intenta crear o actualizar un usuario con un email ya existente, la API
responde:

```json
{
  "error": "El email ya está registrado"
}
```

Código:

```http
409 Conflict
```

## Documentación del reto

- [Día 1 - Diseño inicial](/docs/dia-01-diseno-inicial-usermanager.md)
- [Día 2 - Preparación del proyecto](/docs/dia-02-preparacion-proyecto.md)
- [Día 3 - Primer endpoint](/docs/dia-03-primer-endpoint.md)
- [Día 4 - Métodos HTTP](docs/dia-04-metodos-http.md)
- [Día 5 - JSON, body, params y headers](docs/dia-05-json-body-params-headers.md)
- [Día 6 - Cliente HTTP y depuración](docs/dia-06-cliente-http-depuracion.md)
- [Día 7 - Listado de usuarios en memoria](docs/dia-07-listado-usuarios.md)
- [Día 8 - Consultar usuario por ID](docs/dia-08-consultar-usuario-id.md)
- [Día 9 - Crear usuarios en memoria](docs/dia-09-crear-usuarios.md)
- [Día 10 - Actualizar usuarios en memoria](docs/dia-10-actualizar-usuarios.md)
- [Día 11 - Eliminar o desactivar usuarios en memoria](docs/dia-11-eliminar-desactivar-usuarios.md)
- [Día 12 - Validación manual básica](docs/dia-12-validacion-manual-basica.md)
- [Día 13 - Validación de email y duplicados](docs/dia-13-validacion-email-duplicados.md)