const db = require('../models');
const Clientes = db.Cliente;

const getAllCliente = async () => {
    try {
        const cliente = await Clientes.findAll();
        return cliente
    } catch (error) {
        throw error
    }
}

const getClienteById = async (id) => {
    try {
        const cliente = await Clientes.findOne({
            where: {
                id: id
            }
        })
        return cliente
    } catch (error) {
        throw error
    }
}

const createCliente= async (data) => {
    try {
        const cliente = await Clientes.create(data);
        return cliente
    } catch (error) {
        throw error
    }
}

const updateCliente = async (id, data) => {
    try {
        const cliente = await Clientes.update(data, {
            where: {
                id: id
            }
        })
        return cliente
    } catch (error) {
        throw error
    }
}

const deleteCliente = async (id) => {
    try {
        const cliente = await Clientes.destroy({
            where: {
                id: id
            }
        })
        return cliente
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllCliente,
    getClienteById,
    createCliente,
    updateCliente,
    deleteCliente
}