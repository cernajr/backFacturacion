const pagoRepository = require('../repositories/pagoRepository')

const getAllPago = async () => {
    try {
        const pago = await pagoRepository.getAllPago()
        return (pago) ? pago : []
    } catch (error) {
        throw error
    }
}

const getPagoById = async (id) => {
    try {
        const pago = await pagoRepository.getPagoById(id)
        return (pago) ? pago : []
    } catch (error) {
        throw error
    }
}

const createPago = async (data) => {
    try {
        const pago = await pagoRepository.createPago(data)
        return (pago) ? pago : []
    } catch (error) {
        throw error
    }
}


const updatePago = async (id, data) => {
    try {
        const pago = await pagoRepository.updatePago(id, data)
        return (pago) ? pago : []
    } catch (error) {
        throw error
    }
}

const deletePago = async (id) => {
    try {
        const pago = await pagoRepository.deletePago(id)
        return (pago) ? pago : []
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllPago,
    getPagoById,
    createPago,
    updatePago,
    deletePago,
}