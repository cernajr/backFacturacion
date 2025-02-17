const impuestoService = require('../services/impuestoService');

const getAllImpuesto = async (req, res, next) => {
    try {
        const impuesto = await impuestoService.getAllImpuesto();
        res.status(200).json(impuesto);
    } catch (error) {
        next(error);
    }
}

const getImpuestoById = async (req, res, next) => {
    const id = req.params.id;
    try {
        const impuesto = await impuestoService.getImpuestoById(id);
        res.status(200).json(impuesto);
    } catch (error) {
        next(error);
    }
}

const createImpuesto = async (req, res, next) => {
   
    const {
        facturaId,
        tipoImpId,
        baseGravable,
        valorImpuesto,
        estado
    } = req.body;

    const data = {
        facturaId,
        tipoImpId,
        baseGravable,
        valorImpuesto,
        estado
    }

    try {
        const impuesto = await impuestoService.createImpuesto(data);
        res.status(200).json(impuesto);
    } catch (error) {
        next(error);
    }
}

const updateImpuesto = async (req, res, next) => {
    
    const id = req.params.id;

    const {
        facturaId,
        tipoImpId,
        baseGravable,
        valorImpuesto,
        estado
    } = req.body;

    const data = {
        facturaId,
        tipoImpId,
        baseGravable,
        valorImpuesto,
        estado
    }

    try {
        const impuesto = await impuestoService.updateImpuesto(id, data);
        res.status(200).json(impuesto);
    } catch (error) {
        next(error);
    }
}

const deleteImpuesto = async (req, res, next) => {
    const id = req.params.id;
    try {
        const impuesto = await impuestoService.deleteImpuesto(id);
        res.status(200).json(impuesto);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllImpuesto,
    getImpuestoById,
    createImpuesto,
    updateImpuesto,
    deleteImpuesto,
}