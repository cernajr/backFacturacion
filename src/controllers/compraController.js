const compraService = require('../services/compraService');

const getAllCompra = async (req, res, next) => {
    try {
        const compra = await compraService.getAllCompra();
        res.status(200).json(compra);
    } catch (error) {
        next(error);
    }
}

const getCompraById = async (req, res, next) => {
    const id = req.params.id;
    try {
        const compra = await compraService.getCompraById(id);
        res.status(200).json(compra);
    } catch (error) {
        next(error);
    }
}

const createCompra = async (req, res, next) => {
   
    const {
        proveedorId,
        empresaId,
        pagoId,
        total,
        estado
    } = req.body;

    const data = {
        proveedorId,
        empresaId,
        pagoId,
        total,
        estado
    }

    try {
        const compra = await compraService.createCompra(data);
        res.status(200).json(compra);
    } catch (error) {
        next(error);
    }
}

const updateCompra = async (req, res, next) => {
    
    const id = req.params.id;

    const {
        proveedorId,
        empresaId,
        pagoId,
        total,
        estado
    } = req.body;

    const data = {
        proveedorId,
        empresaId,
        pagoId,
        total,
        estado
    }

    try {
        const compra = await compraService.updateCompra(id, data);
        res.status(200).json(compra);
    } catch (error) {
        next(error);
    }
}

const deleteCompra = async (req, res, next) => {
    const id = req.params.id;
    try {
        const compra = await compraService.deleteCompra(id);
        res.status(200).json(compra);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllCompra,
    getCompraById,
    createCompra,
    updateCompra,
    deleteCompra,
}