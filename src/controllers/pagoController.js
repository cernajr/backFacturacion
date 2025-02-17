const ventaService = require('../services/ventaService');

const getAllPago = async (req, res, next) => {
    try {
        const venta = await ventaService.getAllPago();
        res.status(200).json(venta);
    } catch (error) {
        next(error);
    }
}

const getPagoById = async (req, res, next) => {
    const id = req.params.id;
    try {
        const venta = await ventaService.getPagoById(id);
        res.status(200).json(venta);
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
        const venta = await ventaService.createPago(data);
        res.status(200).json(venta);
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
        const venta = await ventaService.updatePago(id, data);
        res.status(200).json(venta);
    } catch (error) {
        next(error);
    }
}

const deletePago = async (req, res, next) => {
    const id = req.params.id;
    try {
        const venta = await ventaService.deletePago(id);
        res.status(200).json(venta);
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