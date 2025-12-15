import mongoose from "mongoose";

const libroSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    autor: String,
    anio_publicacion: Number,
    genero: String,
    isbn: String,
    descripcion: String
});

export default mongoose.model("Libro", libroSchema);