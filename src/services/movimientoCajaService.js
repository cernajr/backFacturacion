const movimientoCajaRepository = require('../repositories/movimientoCajaRepository')

const getAllMovimientoCaja = async () => {
    try {
        const movimientoCaja = await movimientoCajaRepository.getAllMovimientoCaja()
        return (movimientoCaja) ? movimientoCaja : []
    } catch (error) {
        throw error
    }
}

const getMovimientoCajaById = async (id) => {
    try {
        const movimientoCaja = await movimientoCajaRepository.getMovimientoCajaById(id)
        return (movimientoCaja) ? movimientoCaja : []
    } catch (error) {
        throw error
    }
}

const createMovimientoCaja = async (data) => {
    try {
        const movimientoCaja = await movimientoCajaRepository.createMovimientoCaja(data)
        return (movimientoCaja) ? movimientoCaja : []
    } catch (error) {
        throw error
    }
}


const updateMovimientoCaja = async (id, data) => {
    try {
        const movimientoCaja = await movimientoCajaRepository.updateMovimientoCaja(id, data)
        return (movimientoCaja) ? movimientoCaja : []
    } catch (error) {
        throw error
    }
}

const deleteMovimientoCaja = async (id) => {
    try {
        const movimientoCaja = await movimientoCajaRepository.deleteMovimientoCaja(id)
        return (movimientoCaja) ? movimientoCaja : []
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllMovimientoCaja,
    getMovimientoCajaById,
    createMovimientoCaja,
    updateMovimientoCaja,
    deleteMovimientoCaja,
}