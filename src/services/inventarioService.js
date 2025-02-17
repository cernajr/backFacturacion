const inventarioRepository = require('../repositories/inventarioRepository')

const getAllInventario = async () => {
    try {
        const inventario = await inventarioRepository.getAllInventario()
        return (inventario) ? inventario : []
    } catch (error) {
        throw error
    }
}

const getInventarioById = async (id) => {
    try {
        const inventario = await inventarioRepository.getInventarioById(id)
        return (inventario) ? inventario : []
    } catch (error) {
        throw error
    }
}

const createInventario = async (data) => {
    try {
        const inventario = await inventarioRepository.createInventario(data)
        return (inventario) ? inventario : []
    } catch (error) {
        throw error
    }
}


const updateInventario = async (id, data) => {
    try {
        const inventario = await inventarioRepository.updateInventario(id, data)
        return (inventario) ? inventario : []
    } catch (error) {
        throw error
    }
}

const deleteInventario = async (id) => {
    try {
        const inventario = await inventarioRepository.deleteInventario(id)
        return (inventario) ? inventario : []
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllInventario,
    getInventarioById,
    createInventario,
    updateInventario,
    deleteInventario,
}