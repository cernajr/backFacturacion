const db = require('../models');
const MetodoPagos = db.MetodoPago;

const getAllMetodoPago = async () => {
    try {
        const metodoPago = await MetodoPagos.findAll();
        return metodoPago
    } catch (error) {
        throw error
    }
}

const getMetodoPagoById = async (id) => {
    try {
        const metodoPago = await MetodoPagos.findOne({
            where: {
                id: id
            }
        })
        return metodoPago
    } catch (error) {
        throw error
    }
}

const createMetodoPago= async (data) => {
    try {
        const metodoPago = await MetodoPagos.create(data);
        return metodoPago
    } catch (error) {
        throw error
    }
}

const updateMetodoPago = async (id, data) => {
    try {
        const metodoPago = await MetodoPagos.update(data, {
            where: {
                id: id
            }
        })
        return metodoPago
    } catch (error) {
        throw error
    }
}

const deleteMetodoPago = async (id) => {
    try {
        const metodoPago = await MetodoPagos.destroy({
            where: {
                id: id
            }
        })
        return metodoPago
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllMetodoPago,
    getMetodoPagoById,
    createMetodoPago,
    updateMetodoPago,
    deleteMetodoPago
}