const detalleVentaRepository = require('../repositories/detalleVentaRepository')

const getAllDetalleVenta = async () => {
    try {
        const detalleVenta = await detalleVentaRepository.getAllDetalleVenta()
        return (detalleVenta) ? detalleVenta : []
    } catch (error) {
        throw error
    }
}

const getDetalleVentaById = async (id) => {
    try {
        const detalleVenta = await detalleVentaRepository.getDetalleVentaById(id)
        return (detalleVenta) ? detalleVenta : []
    } catch (error) {
        throw error
    }
}

const createDetalleVenta = async (data) => {
    try {
        const detalleVenta = await detalleVentaRepository.createDetalleVenta(data)
        return (detalleVenta) ? detalleVenta : []
    } catch (error) {
        throw error
    }
}


const updateDetalleVenta = async (id, data) => {
    try {
        const detalleVenta = await detalleVentaRepository.updateDetalleVenta(id, data)
        return (detalleVenta) ? detalleVenta : []
    } catch (error) {
        throw error
    }
}

const deleteDetalleVenta = async (id) => {
    try {
        const detalleVenta = await detalleVentaRepository.deleteDetalleVenta(id)
        return (detalleVenta) ? detalleVenta : []
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllDetalleVenta,
    getDetalleVentaById,
    createDetalleVenta,
    updateDetalleVenta,
    deleteDetalleVenta,
}