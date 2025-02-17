const unidadRepository = require('../repositories/unidadRepository')

const getAllUnidad = async () => {
    try {
        const unidad = await unidadRepository.getAllUnidad()
        return (unidad) ? unidad : []
    } catch (error) {
        throw error
    }
}

const getUnidadById = async (id) => {
    try {
        const unidad = await unidadRepository.getUnidadById(id)
        return (unidad) ? unidad : []
    } catch (error) {
        throw error
    }
}

const createUnidad = async (data) => {
    try {
        const unidad = await unidadRepository.createUnidad(data)
        return (unidad) ? unidad : []
    } catch (error) {
        throw error
    }
}


const updateUnidad = async (id, data) => {
    try {
        const unidad = await unidadRepository.updateUnidad(id, data)
        return (unidad) ? unidad : []
    } catch (error) {
        throw error
    }
}

const deleteUnidad = async (id) => {
    try {
        const unidad = await unidadRepository.deleteUnidad(id)
        return (unidad) ? unidad : []
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllUnidad,
    getUnidadById,
    createUnidad,
    updateUnidad,
    deleteUnidad,
}