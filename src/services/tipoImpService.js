const tipoImpRepository = require('../repositories/tipoImpRepository')

const getAllTipoImp = async () => {
    try {
        const tipoImp = await tipoImpRepository.getAllTipoImp()
        return (tipoImp) ? tipoImp : []
    } catch (error) {
        throw error
    }
}

const getTipoImpById = async (id) => {
    try {
        const tipoImp = await tipoImpRepository.getTipoImpById(id)
        return (tipoImp) ? tipoImp : []
    } catch (error) {
        throw error
    }
}

const createTipoImp = async (data) => {
    try {
        const tipoImp = await tipoImpRepository.createTipoImp(data)
        return (tipoImp) ? tipoImp : []
    } catch (error) {
        throw error
    }
}


const updateTipoImp = async (id, data) => {
    try {
        const tipoImp = await tipoImpRepository.updateTipoImp(id, data)
        return (tipoImp) ? tipoImp : []
    } catch (error) {
        throw error
    }
}

const deleteTipoImp = async (id) => {
    try {
        const tipoImp = await tipoImpRepository.deleteTipoImp(id)
        return (tipoImp) ? tipoImp : []
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllTipoImp,
    getTipoImpById,
    createTipoImp,
    updateTipoImp,
    deleteTipoImp,
}