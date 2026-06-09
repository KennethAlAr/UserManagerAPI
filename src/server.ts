import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    "name": "UserManager API",
    "version": "1.0.0",
    "status": "running",
    "author": "Kenneth Alonso Arce"
  });
});

// Endpoint temporal para ver la información de la API
app.get("/api/info", (req,res) => {
  res.json({
    "project": "UserManager API",
    "description": "API REST para gestionar usuarios",
    "day": 2,
    "technologies": ["Node.js", "Express", "TypeScript"]
  });
});

// Endpoint para comprobar que la API está funcionando
app.get("/api/health", (req, res) => {
  res.status(200).json({
    "status": "ok",
    "message": "UserManager API funcionando",
    "timestamp": new Date().toISOString(),
    "version": "1.0.0",
    "environment": "development"
  });
});

app.get("/api/ping", (req,res) => {
  res.status(200).json({
    "message": "pong"
  });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});