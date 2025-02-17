const impuestoRepository = require('../repositories/impuestoRepository')

const getAllImpuesto = async () => {
    try {
        const impuesto = await impuestoRepository.getAllImpuesto()
        return (impuesto) ? impuesto : []
    } catch (error) {
        throw error
    }
}

const getImpuestoById = async (id) => {
    try {
        const impuesto = await impuestoRepository.getImpuestoById(id)
        return (impuesto) ? impuesto : []
    } catch (error) {
        throw error
    }
}

const createImpuesto = async (data) => {
    try {
        const impuesto = await impuestoRepository.createImpuesto(data)
        return (impuesto) ? impuesto : []
    } catch (error) {
        throw error
    }
}


const updateImpuesto = async (id, data) => {
    try {
        const impuesto = await impuestoRepository.updateImpuesto(id, data)
        return (impuesto) ? impuesto : []
    } catch (error) {
        throw error
    }
}

const deleteImpuesto = async (id) => {
    try {
        const impuesto = await impuestoRepository.deleteImpuesto(id)
        return (impuesto) ? impuesto : []
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllImpuesto,
    getImpuestoById,
    createImpuesto,
    updateImpuesto,
    deleteImpuesto,
}