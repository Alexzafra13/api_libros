import axios from "axios";
import Libro from "../models/Libro.js";

//Obtener libros de Google Books
export const fetchFromAPI = async (req, res) => {


};

//Guardar libros de API en MongoDB
export const saveToDatabase = async (req, res) => {

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
        const libro = await Libro.update(libroId, req.body, { new: true });
        res.status(201).json(libro);
    }catch(error) {
        res.status(400).json({error: error.message});
    }

};

//Eliminar libro por ID
export const remove = async (req, res) => {

};

//Obtener todos los libros
export const getAll = async (req, res) => {

    try {
        const libro = await Libro.find;
        res.json(libro);
    }catch(error) {
        res.status(400).json({error: error.message});
    }
};

//Obtener libros con filtro
export const getFiltered = async (req, res) => {

};