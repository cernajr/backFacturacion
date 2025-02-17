const metodoPagoService = require('../services/metodoPagoService');

const getAllMetodoPago = async (req, res, next) => {
    try {
        const metodoPago = await metodoPagoService.getAllMetodoPago();
        res.status(200).json(metodoPago);
    } catch (error) {
        next(error);
    }
}

const getMetodoPagoById = async (req, res, next) => {
    const id = req.params.id;
    try {
        const metodoPago = await metodoPagoService.getMetodoPagoById(id);
        res.status(200).json(metodoPago);
    } catch (error) {
        next(error);
    }
}

const createMetodoPago = async (req, res, next) => {
   
    const {
        descripcion,
        estado
    } = req.body;

    const data = {
        descripcion,
        estado
    }

    try {
        const metodoPago = await metodoPagoService.createMetodoPago(data);
        res.status(200).json(metodoPago);
    } catch (error) {
        next(error);
    }
}

const updateMetodoPago = async (req, res, next) => {
    
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
        const metodoPago = await metodoPagoService.updateMetodoPago(id, data);
        res.status(200).json(metodoPago);
    } catch (error) {
        next(error);
    }
}

const deleteMetodoPago = async (req, res, next) => {
    const id = req.params.id;
    try {
        const metodoPago = await metodoPagoService.deleteMetodoPago(id);
        res.status(200).json(metodoPago);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllMetodoPago,
    getMetodoPagoById,
    createMetodoPago,
    updateMetodoPago,
    deleteMetodoPago,
}