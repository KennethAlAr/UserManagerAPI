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

### Root

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
### Info

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
### Health

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
### Ping

```http
GET /api/ping
```

Respuesta esperada:

```json
{
  "message": "pong"
}
```

## Endpoints simulados de usuarios

```http
GET /api/users
GET /api/users/:id
POST /api/users
PATCH /api/users/:id
DELETE /api/users/:id
GET /api/users/me
PATCH /api/users/:id/status
PATCH /api/users/:id/role
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

## Documentación del reto

- [Día 1 - Diseño inicial](/docs/dia-01-diseno-inicial-usermanager.md)
- [Día 2 - Preparación del proyecto](/docs/dia-02-preparacion-proyecto.md)
- [Día 3 - Primer endpoint](/docs/dia-03-primer-endpoint.md)
- [Día 4 - Métodos HTTP](docs/dia-04-metodos-http.md)
- [Día 5 - JSON, body, params y headers](docs/dia-05-json-body-params-headers.md)
- [Día 6 - Cliente HTTP y depuración](docs/dia-06-cliente-http-depuracion.md)