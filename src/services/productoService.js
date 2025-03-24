const productoRepository = require('../repositories/productoRepository')

const getAllProducto = async () => {
    try {
        const producto = await productoRepository.getAllProducto()
        return (producto) ? producto : []
    } catch (error) {
        throw error
    }
}

const getProductoById = async (id) => {
    try {
        const producto = await productoRepository.getProductoById(id)
        return (producto) ? producto : []
    } catch (error) {
        throw error
    }
}

const createProducto = async (data) => {
    try {
        const producto = await productoRepository.createProducto(data)
        return (producto) ? producto : []
    } catch (error) {
        throw error
    }
}


const updateProducto = async (id, data) => {
    try {
        const producto = await productoRepository.updateProducto(id, data)
        return (producto) ? producto : []
    } catch (error) {
        throw error
    }
}

const deleteProducto = async (id) => {
    try {
        const producto = await productoRepository.deleteProducto(id)
        return (producto) ? producto : []
    } catch (error) {
        throw error
    }
}

const createProductoInventario = async (data) => {
    try {
        const producto = await productoRepository.createProductoInventario(data)
        return (producto) ? producto : []
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllProducto,
    getProductoById,
    createProducto,
    updateProducto,
    deleteProducto,
    createProductoInventario,
}