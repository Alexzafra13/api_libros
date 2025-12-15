import Libro from "../models/Libro.js";

//Obtener libros de Google Books
export const fetchFromAPI = async (req, res) => {
    const genero = req.params.genero;

    try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=subject:${genero}`);
        const data = await response.json();

        const libros = data.items.map(item => ({
            titulo: item.volumeInfo.title || null,
            autor: item.volumeInfo.authors?.[0] || null,
            anio_publicacion: item.volumeInfo.publishedDate?.substring(0, 4) || null,
            genero: item.volumeInfo.categories?.[0] || null,
            isbn: item.volumeInfo.industryIdentifiers?.[0]?.identifier || null,
            descripcion: item.volumeInfo.description || null
        }));

        res.json(libros);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//Guardar libros de API en MongoDB
export const saveToDatabase = async (req, res) => {
    const genero = req.params.genero;

    try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=subject:${genero}`);
        const data = await response.json();

        const libros = data.items.map(item => ({
            titulo: item.volumeInfo.title || null,
            autor: item.volumeInfo.authors?.[0] || null,
            anio_publicacion: item.volumeInfo.publishedDate?.substring(0, 4) || null,
            genero: item.volumeInfo.categories?.[0] || null,
            isbn: item.volumeInfo.industryIdentifiers?.[0]?.identifier || null,
            descripcion: item.volumeInfo.description || null
        }));

        const librosGuardados = await Libro.insertMany(libros);
        res.status(201).json(librosGuardados);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//Crear libro manualmente
export const create = async (req, res) => {

    try {
        const libro = await Libro.create(req.body);
        res.status(201).json(libro);
    }catch(error) {
        res.status(400).json({error: error.message});
    }

};

//Modificar libro por ID
export const update = async (req, res) => {
    const libroId = req.params.id;

    try {
        const libro = await Libro.findByIdAndUpdate(libroId, req.body, { new: true });
        res.status(200).json(libro);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//Eliminar libro por ID
export const remove = async (req, res) => {
    const libroId = req.params.id;

    try {
        await Libro.findByIdAndDelete(libroId);
        res.status(200).json({ mensaje: "Libro eliminado" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//Obtener todos los libros
export const getAll = async (req, res) => {
    try {
        const libros = await Libro.find();
        res.json(libros);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
//Obtener libros con filtro
export const getFiltered = async (req, res) => {
    try {
        const filtros = {};

        if (req.query.titulo) filtros.titulo = req.query.titulo;
        if (req.query.autor) filtros.autor = req.query.autor;
        if (req.query.genero) filtros.genero = req.query.genero;

        const libros = await Libro.find(filtros);
        res.json(libros);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};