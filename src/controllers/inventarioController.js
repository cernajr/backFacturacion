const inventarioService = require('../services/inventarioService');

const getAllInventario = async (req, res, next) => {
    try {
        const inventario = await inventarioService.getAllInventario();
        res.status(200).json(inventario);
    } catch (error) {
        next(error);
    }
}

const getInventarioById = async (req, res, next) => {
    const id = req.params.id;
    try {
        const inventario = await inventarioService.getInventarioById(id);
        res.status(200).json(inventario);
    } catch (error) {
        next(error);
    }
}

const createInventario = async (req, res, next) => {
   
    const {
        productoId,
        empresaId,
        stockActual,
        stockMinimo,
        stockMaximo,
        estado
    } = req.body;

    const data = {
        productoId,
        empresaId,
        stockActual,
        stockMinimo,
        stockMaximo,
        estado
    }

    try {
        const inventario = await inventarioService.createInventario(data);
        res.status(200).json(inventario);
    } catch (error) {
        next(error);
    }
}

const updateInventario = async (req, res, next) => {
    
    const id = req.params.id;

    const {
        productoId,
        empresaId,
        stockActual,
        stockMinimo,
        stockMaximo,
        estado
    } = req.body;

    const data = {
        productoId,
        empresaId,
        stockActual,
        stockMinimo,
        stockMaximo,
        estado
    }

    try {
        const inventario = await inventarioService.updateInventario(id, data);
        res.status(200).json(inventario);
    } catch (error) {
        next(error);
    }
}

const deleteInventario = async (req, res, next) => {
    const id = req.params.id;
    try {
        const inventario = await inventarioService.deleteInventario(id);
        res.status(200).json(inventario);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllInventario,
    getInventarioById,
    createInventario,
    updateInventario,
    deleteInventario,
}