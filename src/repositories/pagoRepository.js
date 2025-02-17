const db = require('../models');
const Pagos = db.Pago;

const getAllPago = async () => {
    try {
        const pago = await Pagos.findAll();
        return pago
    } catch (error) {
        throw error
    }
}

const getPagoById = async (id) => {
    try {
        const pago = await Pagos.findOne({
            where: {
                id: id
            }
        })
        return pago
    } catch (error) {
        throw error
    }
}

const createPago = async (data) => {
    try {
        const pago = await Pagos.create(data);
        return pago
    } catch (error) {
        throw error
    }
}

const updatePago = async (id, data) => {
    try {
        const pago = await Pagos.update(data, {
            where: {
                id: id
            }
        })
        return pago
    } catch (error) {
        throw error
    }
}

const deletePago = async (id) => {
    try {
        const pago = await Pagos.destroy({
            where: {
                id: id
            }
        })
        return pago
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllPago,
    getPagoById,
    createPago,
    updatePago,
    deletePago
}