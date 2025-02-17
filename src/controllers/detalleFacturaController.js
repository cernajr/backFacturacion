const detalleFacturaService = require('../services/detalleFacturaService');

const getAllDetalleFactura = async (req, res, next) => {
    try {
        const detalleFactura = await detalleFacturaService.getAllDetalleFactura();
        res.status(200).json(detalleFactura);
    } catch (error) {
        next(error);
    }
}

const getDetalleFacturaById = async (req, res, next) => {
    const id = req.params.id;
    try {
        const detalleFactura = await detalleFacturaService.getDetalleFacturaById(id);
        res.status(200).json(detalleFactura);
    } catch (error) {
        next(error);
    }
}

const createDetalleFactura = async (req, res, next) => {
   
    const {
        facturaId,
        productoId,
        cantidad,
        precioUnitario,
        subtotal 
    } = req.body;

    const data = {
        facturaId,
        productoId,
        cantidad,
        precioUnitario,
        subtotal
    }

    try {
        const detalleFactura = await detalleFacturaService.createDetalleFactura(data);
        res.status(200).json(detalleFactura);
    } catch (error) {
        next(error);
    }
}

const updateDetalleFactura = async (req, res, next) => {
    
    const id = req.params.id;

    const {
        facturaId,
        productoId,
        cantidad,
        precioUnitario,
        subtotal
    } = req.body;

    const data = {
        facturaId,
        productoId,
        cantidad,
        precioUnitario,
        subtotal
    }

    try {
        const detalleFactura = await detalleFacturaService.updateDetalleFactura(id, data);
        res.status(200).json(detalleFactura);
    } catch (error) {
        next(error);
    }
}

const deleteDetalleFactura = async (req, res, next) => {
    const id = req.params.id;
    try {
        const detalleFactura = await detalleFacturaService.deleteDetalleFactura(id);
        res.status(200).json(detalleFactura);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllDetalleFactura,
    getDetalleFacturaById,
    createDetalleFactura,
    updateDetalleFactura,
    deleteDetalleFactura,
}