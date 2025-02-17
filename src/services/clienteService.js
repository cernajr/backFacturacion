const clienteRepository = require('../repositories/clienteRepository')

const getAllCliente = async () => {
    try {
        const cliente = await clienteRepository.getAllCliente()
        return (cliente) ? cliente : []
    } catch (error) {
        throw error
    }
}

const getClienteById = async (id) => {
    try {
        const cliente = await clienteRepository.getClienteById(id)
        return (cliente) ? cliente : []
    } catch (error) {
        throw error
    }
}

const createCliente = async (data) => {
    try {
        const cliente = await clienteRepository.createCliente(data)
        return (cliente) ? cliente : []
    } catch (error) {
        throw error
    }
}


const updateCliente = async (id, data) => {
    try {
        const cliente = await clienteRepository.updateCliente(id, data)
        return (cliente) ? cliente : []
    } catch (error) {
        throw error
    }
}

const deleteCliente = async (id) => {
    try {
        const cliente = await clienteRepository.deleteCliente(id)
        return (cliente) ? cliente : []
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllCliente,
    getClienteById,
    createCliente,
    updateCliente,
    deleteCliente,
}