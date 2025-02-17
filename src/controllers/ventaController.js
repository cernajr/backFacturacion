const ventaService = require('../services/ventaService');

const getAllVenta = async (req, res, next) => {
    try {
        const venta = await ventaService.getAllVenta();
        res.status(200).json(venta);
    } catch (error) {
        next(error);
    }
}

const getVentaById = async (req, res, next) => {
    const id = req.params.id;
    try {
        const venta = await ventaService.getVentaById(id);
        res.status(200).json(venta);
    } catch (error) {
        next(error);
    }
}

const createVenta = async (req, res, next) => {
   
    const {
        clienteId,
        usuarioId,
        descripción,
        subtotal,
        estado
    } = req.body;

    const data = {
        clienteId,
        usuarioId,
        descripción,
        subtotal,
        estado
    }

    try {
        const venta = await ventaService.createVenta(data);
        res.status(200).json(venta);
    } catch (error) {
        next(error);
    }
}

const updateVenta = async (req, res, next) => {
    
    const id = req.params.id;

    const {
        clienteId,
        usuarioId,
        descripción,
        subtotal,
        estado
    } = req.body;

    const data = {
        clienteId,
        usuarioId,
        descripción,
        subtotal,
        estado
    }

    try {
        const venta = await ventaService.updateVenta(id, data);
        res.status(200).json(venta);
    } catch (error) {
        next(error);
    }
}

const deleteVenta = async (req, res, next) => {
    const id = req.params.id;
    try {
        const venta = await ventaService.deleteVenta(id);
        res.status(200).json(venta);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllVenta,
    getVentaById,
    createVenta,
    updateVenta,
    deleteVenta,
}