const db = require('../models');
const MovimientoCajas = db.movimientoCaja;

const getAllMovimientoCaja = async () => {
    try {
        const movimientoCaja = await MovimientoCajas.findAll();
        return movimientoCaja
    } catch (error) {
        throw error
    }
}

const getMovimientoCajaById = async (id) => {
    try {
        const movimientoCaja = await MovimientoCajas.findOne({
            where: {
                id: id
            }
        })
        return movimientoCaja
    } catch (error) {
        throw error
    }
}

const createMovimientoCaja = async (data) => {
    try {
        const movimientoCaja = await MovimientoCajas.create(data);
        return movimientoCaja
    } catch (error) {
        throw error
    }
}

const updateMovimientoCaja = async (id, data) => {
    try {
        const movimientoCaja = await MovimientoCajas.update(data, {
            where: {
                id: id
            }
        })
        return movimientoCaja
    } catch (error) {
        throw error
    }
}

const deleteMovimientoCaja = async (id) => {
    try {
        const movimientoCaja = await MovimientoCajas.destroy({
            where: {
                id: id
            }
        })
        return movimientoCaja
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllMovimientoCaja,
    getMovimientoCajaById,
    createMovimientoCaja,
    updateMovimientoCaja,
    deleteMovimientoCaja
}