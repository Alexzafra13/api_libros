import * as libroService from "../services/libroService.js";

//Obtener libros de Google Books
export const fetchFromAPI = async (req, res) => {
    try {
        const libros = await libroService.fetchBooksFromGoogleAPI(req.params.genero);
        res.json(libros);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//Guardar libros de API en MongoDB
export const saveToDatabase = async (req, res) => {
    try {
        const librosGuardados = await libroService.saveBooksFromAPI(req.params.genero);
        res.status(201).json(librosGuardados);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//Crear libro manualmente
export const create = async (req, res) => {
    try {
        const libro = await libroService.createLibro(req.body);
        res.status(201).json(libro);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//Modificar libro por ID
export const update = async (req, res) => {
    try {
        const libro = await libroService.updateLibro(req.params.id, req.body);
        res.status(200).json(libro);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//Eliminar libro por ID
export const remove = async (req, res) => {
    try {
        await libroService.deleteLibro(req.params.id);
        res.status(200).json({ mensaje: "Libro eliminado" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//Obtener todos los libros
export const getAll = async (req, res) => {
    try {
        const libros = await libroService.getAllLibros();
        res.json(libros);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//Obtener libros con filtro
export const getFiltered = async (req, res) => {
    try {
        const libros = await libroService.getFilteredLibros(req.query);
        res.json(libros);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
