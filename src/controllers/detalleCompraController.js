const detalleCompraService = require('../services/detalleCompraService');

const getAllDetalleCompra = async (req, res, next) => {
    try {
        const detalleCompra = await detalleCompraService.getAllDetalleCompra();
        res.status(200).json(detalleCompra);
    } catch (error) {
        next(error);
    }
}

const getDetalleCompraById = async (req, res, next) => {
    const id = req.params.id;
    try {
        const detalleCompra = await detalleCompraService.getDetalleCompraById(id);
        if (!detalleCompra) {
            return res.status(404).json({ message: 'Detalle de compra no encontrado' });
        }
        res.status(200).json(detalleCompra);
    } catch (error) {
        next(error);
    }
}

const createDetalleCompra = async (req, res, next) => {
   
    const {
        compraId,
        productoId,
        cantidad,
        precio,
        total,
        estado
    } = req.body;

    const data = {
        compraId,
        productoId,
        cantidad,
        precio,
        total,
        estado
    }

    try {
        const detalleCompra = await detalleCompraService.createDetalleCompra(data);
        res.status(200).json(detalleCompra);
    } catch (error) {
        next(error);
    }
}

const updateDetalleCompra = async (req, res, next) => {
    
    const id = req.params.id;

    const {
        compraId,
        productoId,
        cantidad,
        precio,
        total,
        estado
    } = req.body;

    const data = {
        compraId,
        productoId,
        cantidad,
        precio,
        total,
        estado
    }

    try {
        const detalleCompra = await detalleCompraService.updateDetalleCompra(id, data);
        res.status(200).json(detalleCompra);
    } catch (error) {
        next(error);
    }
}

const deleteDetalleCompra = async (req, res, next) => {
    const id = req.params.id;
    try {
        const detalleCompra = await detalleCompraService.deleteDetalleCompra(id);
        res.status(200).json(detalleCompra);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllDetalleCompra,
    getDetalleCompraById,
    createDetalleCompra,
    updateDetalleCompra,
    deleteDetalleCompra,
}