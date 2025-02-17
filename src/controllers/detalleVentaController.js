const detalleVentaService = require('../services/detalleVentaService');

const getAllDetalleVenta = async (req, res, next) => {
    try {
        const detalleVenta = await detalleVentaService.getAllDetalleVenta();
        res.status(200).json(detalleVenta);
    } catch (error) {
        next(error);
    }
}

const getDetalleVentaById = async (req, res, next) => {
    const id = req.params.id;
    try {
        const detalleVenta = await detalleVentaService.getDetalleVentaById(id);
        res.status(200).json(detalleVenta);
    } catch (error) {
        next(error);
    }
}

const createDetalleVenta = async (req, res, next) => {
   
    const {
        ventaId,
        productoId,
        cantidad,
        descuento,
        total,
        estado
    } = req.body;

    const data = {
        ventaId,
        productoId,
        cantidad,
        descuento,
        total,
        estado
    }

    try {
        const detalleVenta = await detalleVentaService.createDetalleVenta(data);
        res.status(200).json(detalleVenta);
    } catch (error) {
        next(error);
    }
}

const updateDetalleVenta = async (req, res, next) => {
    
    const id = req.params.id;

    const {
        ventaId,
        productoId,
        cantidad,
        descuento,
        total,
        estado
    } = req.body;

    const data = {
        ventaId,
        productoId,
        cantidad,
        descuento,
        total,
        estado
    }

    try {
        const detalleVenta = await detalleVentaService.updateDetalleVenta(id, data);
        res.status(200).json(detalleVenta);
    } catch (error) {
        next(error);
    }
}

const deleteDetalleVenta = async (req, res, next) => {
    const id = req.params.id;
    try {
        const detalleVenta = await detalleVentaService.deleteDetalleVenta(id);
        res.status(200).json(detalleVenta);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllDetalleVenta,
    getDetalleVentaById,
    createDetalleVenta,
    updateDetalleVenta,
    deleteDetalleVenta,
}