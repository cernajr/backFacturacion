const sarService = require('../services/sarService');

const getAllSar = async (req, res, next) => {
    try {
        const sar = await sarService.getAllSar();
        res.status(200).json(sar);
    } catch (error) {
        next(error);
    }
}

const getSarById = async (req, res, next) => {
    const id = req.params.id;
    try {
        const sar = await sarService.getSarById(id);
        res.status(200).json(sar);
    } catch (error) {
        next(error);
    }
}

const createSar = async (req, res, next) => {
   
    const {
        empresaId,
        cai,
        rangoInicial,
        rangoFinal,
        numActualSar,
        fechaAutorizacion,
        fechaVencimiento,
        estado
    } = req.body;

    const data = {
        empresaId,
        cai,
        rangoInicial,
        rangoFinal,
        numActualSar,
        fechaAutorizacion,
        fechaVencimiento,
        estado
    }

    try {
        const sar = await sarService.createSar(data);
        res.status(200).json(sar);
    } catch (error) {
        next(error);
    }
}

const updateSar = async (req, res, next) => {
    
    const id = req.params.id;

    const {
        empresaId,
        cai,
        rangoInicial,
        rangoFinal,
        numActualSar,
        fechaAutorizacion,
        fechaVencimiento,
        estado
    } = req.body;

    const data = {
        empresaId,
        cai,
        rangoInicial,
        rangoFinal,
        numActualSar,
        fechaAutorizacion,
        fechaVencimiento,
        estado
    }

    try {
        const sar = await sarService.updateSar(id, data);
        res.status(200).json(sar);
    } catch (error) {
        next(error);
    }
}

const deleteSar = async (req, res, next) => {
    const id = req.params.id;
    try {
        const sar = await sarService.deleteSar(id);
        res.status(200).json(sar);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllSar,
    getSarById,
    createSar,
    updateSar,
    deleteSar,
}