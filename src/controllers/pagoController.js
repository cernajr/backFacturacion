const pagoService = require('../services/pagoService');

const getAllPago = async (req, res, next) => {
    try {
        const pago = await pagoService.getAllPago();
        res.status(200).json(pago);
    } catch (error) {
        next(error);
    }
}

const getPagoById = async (req, res, next) => {
    const id = req.params.id;
    try {
        const pago = await pagoService.getPagoById(id);
        res.status(200).json(pago);
    } catch (error) {
        next(error);
    }
}

const createPago = async (req, res, next) => {
   
    const {
        facturaId,
        montoPago,
        referenciaPago,
        fechaPago,
        metodoPago,
        estado
    } = req.body;

    const data = {
        facturaId,
        montoPago,
        referenciaPago,
        fechaPago,
        metodoPago,
        estado
    }

    try {
        const pago = await pagoService.createPago(data);
        res.status(200).json(pago);
    } catch (error) {
        next(error);
    }
}

const updatePago = async (req, res, next) => {
    
    const id = req.params.id;

    const {
        facturaId,
        montoPago,
        referenciaPago,
        fechaPago,
        metodoPago,
        estado
    } = req.body;

    const data = {
        facturaId,
        montoPago,
        referenciaPago,
        fechaPago,
        metodoPago,
        estado
    }

    try {
        const pago = await pagoService.updatePago(id, data);
        res.status(200).json(pago);
    } catch (error) {
        next(error);
    }
}

const deletePago = async (req, res, next) => {
    const id = req.params.id;
    try {
        const pago = await pagoService.deletePago(id);
        res.status(200).json(pago);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllPago,
    getPagoById,
    createPago,
    updatePago,
    deletePago,
}