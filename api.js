import mongoose from "mongoose";
import express from "express";
import booksRoutes from "./routes/books.js";

const app = express();

// Middleware para parsear JSON del body
app.use(express.json());

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/libreria')
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.log('Error de conexión:', err));

app.use('/api/books', booksRoutes);

// Arrancar servidor
app.listen(3000, () => {
    console.log('Servidor corriendo en puerto 3000');
});

