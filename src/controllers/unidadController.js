const unidadService = require('../services/unidadService');

const getAllUnidad = async (req, res, next) => {
    try {
        const unidad = await unidadService.getAllUnidad();
        res.status(200).json(unidad);
    } catch (error) {
        next(error);
    }
}

const getUnidadById = async (req, res, next) => {
    const id = req.params.id;
    try {
        const unidad = await unidadService.getUnidadById(id);
        res.status(200).json(unidad);
    } catch (error) {
        next(error);
    }
}

const createUnidad = async (req, res, next) => {
   
    const {
        descripcion,
        estado
    } = req.body;

    const data = {
        descripcion,
        estado
    }

    try {
        const unidad = await unidadService.createUnidad(data);
        res.status(200).json(unidad);
    } catch (error) {
        next(error);
    }
}

const updateUnidad = async (req, res, next) => {
    
    const id = req.params.id;

    const {
        descripcion,
        estado
    } = req.body;

    const data = {
        descripcion,
        estado
    }

    try {
        const unidad = await unidadService.updateUnidad(id, data);
        res.status(200).json(unidad);
    } catch (error) {
        next(error);
    }
}

const deleteUnidad = async (req, res, next) => {
    const id = req.params.id;
    try {
        const unidad = await unidadService.deleteUnidad(id);
        res.status(200).json(unidad);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllUnidad,
    getUnidadById,
    createUnidad,
    updateUnidad,
    deleteUnidad,
}