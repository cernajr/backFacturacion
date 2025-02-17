const tipoMovimientoRepository = require('../repositories/tipoMovimientoRepository')

const getAllTipoMovimiento = async () => {
    try {
        const tipoMovimiento = await tipoMovimientoRepository.getAllTipoMovimiento()
        return (tipoMovimiento) ? tipoMovimiento : []
    } catch (error) {
        throw error
    }
}

const getTipoMovimientoById = async (id) => {
    try {
        const tipoMovimiento = await tipoMovimientoRepository.getTipoMovimientoById(id)
        return (tipoMovimiento) ? tipoMovimiento : []
    } catch (error) {
        throw error
    }
}

const createTipoMovimiento = async (data) => {
    try {
        const tipoMovimiento = await tipoMovimientoRepository.createTipoMovimiento(data)
        return (tipoMovimiento) ? tipoMovimiento : []
    } catch (error) {
        throw error
    }
}


const updateTipoMovimiento = async (id, data) => {
    try {
        const tipoMovimiento = await tipoMovimientoRepository.updateTipoMovimiento(id, data)
        return (tipoMovimiento) ? tipoMovimiento : []
    } catch (error) {
        throw error
    }
}

const deleteTipoMovimiento = async (id) => {
    try {
        const tipoMovimiento = await tipoMovimientoRepository.deleteTipoMovimiento(id)
        return (tipoMovimiento) ? tipoMovimiento : []
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllTipoMovimiento,
    getTipoMovimientoById,
    createTipoMovimiento,
    updateTipoMovimiento,
    deleteTipoMovimiento,
}