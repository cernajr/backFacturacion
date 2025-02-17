const db = require('../models');
const TipoMovimientos = db.TipoMovimiento;

const getAllTipoMovimiento = async () => {
    try {
        const tipoMovimiento = await TipoMovimientos.findAll();
        return tipoMovimiento
    } catch (error) {
        throw error
    }
}

const getTipoMovimientoById = async (id) => {
    try {
        const tipoMovimiento = await TipoMovimientos.findOne({
            where: {
                id: id
            }
        })
        return tipoMovimiento
    } catch (error) {
        throw error
    }
}

const createTipoMovimiento= async (data) => {
    try {
        const tipoMovimiento = await TipoMovimientos.create(data);
        return tipoMovimiento
    } catch (error) {
        throw error
    }
}

const updateTipoMovimiento = async (id, data) => {
    try {
        const tipoMovimiento = await TipoMovimientos.update(data, {
            where: {
                id: id
            }
        })
        return tipoMovimiento
    } catch (error) {
        throw error
    }
}

const deleteTipoMovimiento = async (id) => {
    try {
        const tipoMovimiento = await TipoMovimientos.destroy({
            where: {
                id: id
            }
        })
        return tipoMovimiento
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllTipoMovimiento,
    getTipoMovimientoById,
    createTipoMovimiento,
    updateTipoMovimiento,
    deleteTipoMovimiento
}