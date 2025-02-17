const sarRepository = require('../repositories/sarRepository')

const getAllSar = async () => {
    try {
        const sar = await sarRepository.getAllSar()
        return (sar) ? sar : []
    } catch (error) {
        throw error
    }
}

const getSarById = async (id) => {
    try {
        const sar = await sarRepository.getSarById(id)
        return (sar) ? sar : []
    } catch (error) {
        throw error
    }
}

const createSar = async (data) => {
    try {
        const sar = await sarRepository.createSar(data)
        return (sar) ? sar : []
    } catch (error) {
        throw error
    }
}


const updateSar = async (id, data) => {
    try {
        const sar = await sarRepository.updateSar(id, data)
        return (sar) ? sar : []
    } catch (error) {
        throw error
    }
}

const deleteSar = async (id) => {
    try {
        const sar = await sarRepository.deleteSar(id)
        return (sar) ? sar : []
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllSar,
    getSarById,
    createSar,
    updateSar,
    deleteSar,
}