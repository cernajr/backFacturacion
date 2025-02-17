const facturaRepository = require('../repositories/facturaRepository')

const getAllFactura = async () => {
    try {
        const factura = await facturaRepository.getAllFactura()
        return (factura) ? factura : []
    } catch (error) {
        throw error
    }
}

const getFacturaById = async (id) => {
    try {
        const factura = await facturaRepository.getFacturaById(id)
        return (factura) ? factura : []
    } catch (error) {
        throw error
    }
}

const createFactura = async (data) => {
    try {
        const factura = await facturaRepository.createFactura(data)
        return (factura) ? factura : []
    } catch (error) {
        throw error
    }
}


const updateFactura = async (id, data) => {
    try {
        const factura = await facturaRepository.updateFactura(id, data)
        return (factura) ? factura : []
    } catch (error) {
        throw error
    }
}

const deleteFactura = async (id) => {
    try {
        const factura = await facturaRepository.deleteFactura(id)
        return (factura) ? factura : []
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllFactura,
    getFacturaById,
    createFactura,
    updateFactura,
    deleteFactura,
}