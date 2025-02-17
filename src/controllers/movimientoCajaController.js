const movimientoCajaService = require('../services/movimientoCajaService');

const getAllMovimientoCaja = async (req, res, next) => {
    try {
        const movimientoCaja = await movimientoCajaService.getAllMovimientoCaja();
        res.status(200).json(movimientoCaja);
    } catch (error) {
        next(error);
    }
}

const getMovimientoCajaById = async (req, res, next) => {
    const id = req.params.id;
    try {
        const movimientoCaja = await movimientoCajaService.getMovimientoCajaById(id);
        res.status(200).json(movimientoCaja);
    } catch (error) {
        next(error);
    }
}

const createMovimientoCaja = async (req, res, next) => {
   
    const {
        cajaId,
        facturaId,
        tipoMovimiento,
        monto,
        descripcion,
        fechaMovimiento,
        estado
    } = req.body;

    const data = {
        cajaId,
        facturaId,
        tipoMovimiento,
        monto,
        descripcion,
        fechaMovimiento,
        estado
    }

    try {
        const movimientoCaja = await movimientoCajaService.createMovimientoCaja(data);
        res.status(200).json(movimientoCaja);
    } catch (error) {
        next(error);
    }
}

const updateMovimientoCaja = async (req, res, next) => {
    
    const id = req.params.id;

    const {
        cajaId,
        facturaId,
        tipoMovimiento,
        monto,
        descripcion,
        fechaMovimiento,
        estado
    } = req.body;

    const data = {
        cajaId,
        facturaId,
        tipoMovimiento,
        monto,
        descripcion,
        fechaMovimiento,
        estado
    }

    try {
        const movimientoCaja = await movimientoCajaService.updateMovimientoCaja(id, data);
        res.status(200).json(movimientoCaja);
    } catch (error) {
        next(error);
    }
}

const deleteMovimientoCaja = async (req, res, next) => {
    const id = req.params.id;
    try {
        const movimientoCaja = await movimientoCajaService.deleteMovimientoCaja(id);
        res.status(200).json(movimientoCaja);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllMovimientoCaja,
    getMovimientoCajaById,
    createMovimientoCaja,
    updateMovimientoCaja,
    deleteMovimientoCaja,
}