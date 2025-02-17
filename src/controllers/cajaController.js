const cajaService = require('../services/cajaService');

const getAllCaja = async (req, res, next) => {
    try {
        const caja = await cajaService.getAllCaja();
        res.status(200).json(caja);
    } catch (error) {
        next(error);
    }
}

const getCajaById = async (req, res, next) => {
    const id = req.params.id;
    try {
        const caja = await cajaService.getCajaById(id);
        res.status(200).json(caja);
    } catch (error) {
        next(error);
    }
}

const createCaja = async (req, res, next) => {
   
    const {
        empresaId,
        usuarioId,
        fechaApertura,
        fechaCierre,
        saldoInicial,
        saldoFinal,
        estado

    } = req.body;

    const data = {
        empresaId,
        usuarioId,
        fechaApertura,
        fechaCierre,
        saldoInicial,
        saldoFinal,
        estado
    }

    try {
        const caja = await cajaService.createCaja(data);
        res.status(200).json(caja);
    } catch (error) {
        next(error);
    }
}

const updateCaja = async (req, res, next) => {
    
    const id = req.params.id;

    const {
        empresaId,
        usuarioId,
        fechaApertura,
        fechaCierre,
        saldoInicial,
        saldoFinal,
        estado
    } = req.body;

    const data = {
        empresaId,
        usuarioId,
        fechaApertura,
        fechaCierre,
        saldoInicial,
        saldoFinal,
        estado
    }

    try {
        const caja = await cajaService.updateCaja(id, data);
        res.status(200).json(caja);
    } catch (error) {
        next(error);
    }
}

const deleteCaja = async (req, res, next) => {
    const id = req.params.id;
    try {
        const caja = await cajaService.deleteCaja(id);
        res.status(200).json(caja);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllCaja,
    getCajaById,
    createCaja,
    updateCaja,
    deleteCaja,
}