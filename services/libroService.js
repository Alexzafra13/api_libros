import Libro from "../models/Libro.js";

const GOOGLE_BOOKS_API = "https://www.googleapis.com/books/v1/volumes";

// Mapea los datos de Google Books al formato del modelo
const mapGoogleBookToLibro = (item) => ({
    titulo: item.volumeInfo.title || null,
    autor: item.volumeInfo.authors?.[0] || null,
    anio_publicacion: item.volumeInfo.publishedDate?.substring(0, 4) || null,
    genero: item.volumeInfo.categories?.[0] || null,
    isbn: item.volumeInfo.industryIdentifiers?.[0]?.identifier || null,
    descripcion: item.volumeInfo.description || null
});

// Obtener libros de Google Books API por género
export const fetchBooksFromGoogleAPI = async (genero) => {
    const response = await fetch(`${GOOGLE_BOOKS_API}?q=subject:${genero}`);
    const data = await response.json();
    return data.items.map(mapGoogleBookToLibro);
};

// Guardar libros de Google Books en la base de datos
export const saveBooksFromAPI = async (genero) => {
    const libros = await fetchBooksFromGoogleAPI(genero);
    return await Libro.insertMany(libros);
};

// Crear un libro
export const createLibro = async (libroData) => {
    return await Libro.create(libroData);
};

// Actualizar un libro por ID
export const updateLibro = async (id, libroData) => {
    return await Libro.findByIdAndUpdate(id, libroData, { new: true });
};

// Eliminar un libro por ID
export const deleteLibro = async (id) => {
    return await Libro.findByIdAndDelete(id);
};

// Obtener todos los libros
export const getAllLibros = async () => {
    return await Libro.find();
};

// Obtener libros con filtros
export const getFilteredLibros = async (filters) => {
    const filtros = {};

    if (filters.titulo) filtros.titulo = filters.titulo;
    if (filters.autor) filtros.autor = filters.autor;
    if (filters.genero) filtros.genero = filters.genero;

    return await Libro.find(filtros);
};
