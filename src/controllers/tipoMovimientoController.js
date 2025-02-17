const tipoMovimientoService = require('../services/tipoMovimientoService');

const getAllTipoMovimiento = async (req, res, next) => {
    try {
        const tipoMovimiento = await tipoMovimientoService.getAllTipoMovimiento();
        res.status(200).json(tipoMovimiento);
    } catch (error) {
        next(error);
    }
}

const getTipoMovimientoById = async (req, res, next) => {
    const id = req.params.id;
    try {
        const tipoMovimiento = await tipoMovimientoService.getTipoMovimientoById(id);
        res.status(200).json(tipoMovimiento);
    } catch (error) {
        next(error);
    }
}

const createTipoMovimiento = async (req, res, next) => {
   
    const {
        descripcion,
        estado
    } = req.body;

    const data = {
        descripcion,
        estado
    }

    try {
        const tipoMovimiento = await tipoMovimientoService.createTipoMovimiento(data);
        res.status(200).json(tipoMovimiento);
    } catch (error) {
        next(error);
    }
}

const updateTipoMovimiento = async (req, res, next) => {
    
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
        const tipoMovimiento = await tipoMovimientoService.updateTipoMovimiento(id, data);
        res.status(200).json(tipoMovimiento);
    } catch (error) {
        next(error);
    }
}

const deleteTipoMovimiento = async (req, res, next) => {
    const id = req.params.id;
    try {
        const tipoMovimiento = await tipoMovimientoService.deleteTipoMovimiento(id);
        res.status(200).json(tipoMovimiento);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllTipoMovimiento,
    getTipoMovimientoById,
    createTipoMovimiento,
    updateTipoMovimiento,
    deleteTipoMovimiento,
}