const cajaRepository = require('../repositories/cajaRepository')

const getAllCaja = async () => {
    try {
        const caja = await cajaRepository.getAllCaja()
        return (caja) ? caja : []
    } catch (error) {
        throw error
    }
}

const getCajaById = async (id) => {
    try {
        const caja = await cajaRepository.getCajaById(id)
        return (caja) ? caja : []
    } catch (error) {
        throw error
    }
}

const createCaja = async (data) => {
    try {
        const caja = await cajaRepository.createCaja(data)
        return (caja) ? caja : []
    } catch (error) {
        throw error
    }
}


const updateCaja = async (id, data) => {
    try {
        const caja = await cajaRepository.updateCaja(id, data)
        return (caja) ? caja : []
    } catch (error) {
        throw error
    }
}

const deleteCaja = async (id) => {
    try {
        const caja = await cajaRepository.deleteCaja(id)
        return (caja) ? caja : []
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllCaja,
    getCajaById,
    createCaja,
    updateCaja,
    deleteCaja,
}