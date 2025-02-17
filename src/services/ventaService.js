const ventaRepository = require('../repositories/ventaRepository')

const getAllVenta = async () => {
    try {
        const venta = await ventaRepository.getAllVenta()
        return (venta) ? venta : []
    } catch (error) {
        throw error
    }
}

const getVentaById = async (id) => {
    try {
        const venta = await ventaRepository.getVentaById(id)
        return (venta) ? venta : []
    } catch (error) {
        throw error
    }
}

const createVenta = async (data) => {
    try {
        const venta = await ventaRepository.createVenta(data)
        return (venta) ? venta : []
    } catch (error) {
        throw error
    }
}


const updateVenta = async (id, data) => {
    try {
        const venta = await ventaRepository.updateVenta(id, data)
        return (venta) ? venta : []
    } catch (error) {
        throw error
    }
}

const deleteVenta = async (id) => {
    try {
        const venta = await ventaRepository.deleteVenta(id)
        return (venta) ? venta : []
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllVenta,
    getVentaById,
    createVenta,
    updateVenta,
    deleteVenta,
}