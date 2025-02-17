const metodoPagoRepository = require('../repositories/metodoPagoRepository')

const getAllMetodoPago = async () => {
    try {
        const metodoPago = await metodoPagoRepository.getAllMetodoPago()
        return (metodoPago) ? metodoPago : []
    } catch (error) {
        throw error
    }
}

const getMetodoPagoById = async (id) => {
    try {
        const metodoPago = await metodoPagoRepository.getMetodoPagoById(id)
        return (metodoPago) ? metodoPago : []
    } catch (error) {
        throw error
    }
}

const createMetodoPago = async (data) => {
    try {
        const metodoPago = await metodoPagoRepository.createMetodoPago(data)
        return (metodoPago) ? metodoPago : []
    } catch (error) {
        throw error
    }
}


const updateMetodoPago = async (id, data) => {
    try {
        const metodoPago = await metodoPagoRepository.updateMetodoPago(id, data)
        return (metodoPago) ? metodoPago : []
    } catch (error) {
        throw error
    }
}

const deleteMetodoPago = async (id) => {
    try {
        const metodoPago = await metodoPagoRepository.deleteMetodoPago(id)
        return (metodoPago) ? metodoPago : []
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllMetodoPago,
    getMetodoPagoById,
    createMetodoPago,
    updateMetodoPago,
    deleteMetodoPago,
}