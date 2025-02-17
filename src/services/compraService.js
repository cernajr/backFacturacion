const compraRepository = require('../repositories/compraRepository')

const getAllCompra = async () => {
    try {
        const compra = await compraRepository.getAllCompra()
        return (compra) ? compra : []
    } catch (error) {
        throw error
    }
}

const getCompraById = async (id) => {
    try {
        const compra = await compraRepository.getCompraById(id)
        return (compra) ? compra : []
    } catch (error) {
        throw error
    }
}

const createCompra = async (data) => {
    try {
        const compra = await compraRepository.createCompra(data)
        return (compra) ? compra : []
    } catch (error) {
        throw error
    }
}


const updateCompra = async (id, data) => {
    try {
        const compra = await compraRepository.updateCompra(id, data)
        return (compra) ? compra : []
    } catch (error) {
        throw error
    }
}

const deleteCompra = async (id) => {
    try {
        const compra = await compraRepository.deleteCompra(id)
        return (compra) ? compra : []
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllCompra,
    getCompraById,
    createCompra,
    updateCompra,
    deleteCompra,
}