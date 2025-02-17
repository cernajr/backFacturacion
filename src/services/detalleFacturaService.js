const detalleFacturaRepository = require('../repositories/detalleFacturaRepository')

const getAllDetalleFactura = async () => {
    try {
        const detalleFactura = await detalleFacturaRepository.getAllDetalleFactura()
        return (detalleFactura) ? detalleFactura : []
    } catch (error) {
        throw error
    }
}

const getDetalleFacturaById = async (id) => {
    try {
        const detalleFactura = await detalleFacturaRepository.getDetalleFacturaById(id)
        return (detalleFactura) ? detalleFactura : []
    } catch (error) {
        throw error
    }
}

const createDetalleFactura = async (data) => {
    try {
        const detalleFactura = await detalleFacturaRepository.createDetalleFactura(data)
        return (detalleFactura) ? detalleFactura : []
    } catch (error) {
        throw error
    }
}


const updateDetalleFactura = async (id, data) => {
    try {
        const detalleFactura = await detalleFacturaRepository.updateDetalleFactura(id, data)
        return (detalleFactura) ? detalleFactura : []
    } catch (error) {
        throw error
    }
}

const deleteDetalleFactura = async (id) => {
    try {
        const detalleFactura = await detalleFacturaRepository.deleteDetalleFactura(id)
        return (detalleFactura) ? detalleFactura : []
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllDetalleFactura,
    getDetalleFacturaById,
    createDetalleFactura,
    updateDetalleFactura,
    deleteDetalleFactura,
}