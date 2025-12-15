import express from "express";
import * as booksController from "../controllers/libroController.js";

const router = express.Router();

// Apartado 1: Obtener libros de Google Books
router.get('/external/:genero', booksController.fetchFromAPI);

// Apartado 2: Guardar libros de la API en MongoDB
router.post('/save/:genero', booksController.saveToDatabase);

// Apartado 3.1: Crear libro manualmente
router.post('/', booksController.create);

// Apartado 3.2: Modificar libro por ID
router.put('/:id', booksController.update);

// Apartado 3.3: Eliminar libro por ID
router.delete('/:id', booksController.remove);

// Apartado 3.4: Obtener todos los libros
router.get('/', booksController.getAll);

// Apartado 3.5: Obtener libros con filtro
router.get('/filter', booksController.getFiltered);

export default router;