import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    autor: String,
    anio_publicacion: Number,
    genero: String,
    isbn: String,
    descripcion: String
});