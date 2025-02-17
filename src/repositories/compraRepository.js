const db = require('../models');
const Compras = db.Compra;

const getAllCompra = async () => {
    try {
        const compra = await Compras.findAll();
        return compra
    } catch (error) {
        throw error
    }
}

const getCompraById = async (id) => {
    try {
        const compra = await Compras.findOne({
            where: {
                id: id
            }
        })
        return compra
    } catch (error) {
        throw error
    }
}

const createCompra = async (data) => {
    try {
        const compra = await Compras.create(data);
        return compra
    } catch (error) {
        throw error
    }
}

const updateCompra = async (id, data) => {
    try {
        const compra = await Compras.update(data, {
            where: {
                id: id
            }
        })
        return compra
    } catch (error) {
        throw error
    }
}

const deleteCompra = async (id) => {
    try {
        const compra = await Compras.destroy({
            where: {
                id: id
            }
        })
        return compra
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllCompra,
    getCompraById,
    createCompra,
    updateCompra,
    deleteCompra
}