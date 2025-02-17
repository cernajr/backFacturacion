const tipoImpService = require('../services/tipoImpService');

const getAllTipoImp = async (req, res, next) => {
    try {
        const tipoImp = await tipoImpService.getAllTipoImp();
        res.status(200).json(tipoImp);
    } catch (error) {
        next(error);
    }
}

const getTipoImpById = async (req, res, next) => {
    const id = req.params.id;
    try {
        const tipoImp = await tipoImpService.getTipoImpById(id);
        res.status(200).json(tipoImp);
    } catch (error) {
        next(error);
    }
}

const createTipoImp = async (req, res, next) => {
   
    const {
        descripcion,
        estado
    } = req.body;

    const data = {
        descripcion,
        estado
    }

    try {
        const tipoImp = await tipoImpService.createTipoImp(data);
        res.status(200).json(tipoImp);
    } catch (error) {
        next(error);
    }
}

const updateTipoImp = async (req, res, next) => {
    
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
        const tipoImp = await tipoImpService.updateTipoImp(id, data);
        res.status(200).json(tipoImp);
    } catch (error) {
        next(error);
    }
}

const deleteTipoImp = async (req, res, next) => {
    const id = req.params.id;
    try {
        const tipoImp = await tipoImpService.deleteTipoImp(id);
        res.status(200).json(tipoImp);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllTipoImp,
    getTipoImpById,
    createTipoImp,
    updateTipoImp,
    deleteTipoImp,
}