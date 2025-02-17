const detalleCompraRepository = require('../repositories/detalleCompraRepository')

const getAllDetalleCompra = async () => {
    try {
        const detalleCompra = await detalleCompraRepository.getAllDetalleCompra()
        return (detalleCompra) ? detalleCompra : []
    } catch (error) {
        throw error
    }
}

const getDetalleCompraById = async (id) => {
    try {
        const detalleCompra = await detalleCompraRepository.getDetalleCompraById(id)
        return detalleCompra || null;
    } catch (error) {
        throw error;
    }
}

const createDetalleCompra = async (data) => {
    try {
        const detalleCompra = await detalleCompraRepository.createDetalleCompra(data)
        return (detalleCompra) ? detalleCompra : []
    } catch (error) {
        throw error
    }
}


const updateDetalleCompra = async (id, data) => {
    try {
        const detalleCompra = await detalleCompraRepository.updateDetalleCompra(id, data)
        return (detalleCompra) ? detalleCompra : []
    } catch (error) {
        throw error
    }
}

const deleteDetalleCompra = async (id) => {
    try {
        const detalleCompra = await detalleCompraRepository.deleteDetalleCompra(id)
        return (detalleCompra) ? detalleCompra : []
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllDetalleCompra,
    getDetalleCompraById,
    createDetalleCompra,
    updateDetalleCompra,
    deleteDetalleCompra,
}