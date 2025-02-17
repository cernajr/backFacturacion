const db = require('../models');
const Cajas = db.Caja;

const getAllCaja = async () => {
    try {
        const caja = await Cajas.findAll();
        return caja
    } catch (error) {
        throw error
    }
}

const getCajaById = async (id) => {
    try {
        const caja = await Cajas.findOne({
            where: {
                id: id
            }
        })
        return caja
    } catch (error) {
        throw error
    }
}

const createCaja = async (data) => {
    try {
        const caja = await Cajas.create(data);
        return caja
    } catch (error) {
        throw error
    }
}

const updateCaja = async (id, data) => {
    try {
        const caja = await Cajas.update(data, {
            where: {
                id: id
            }
        })
        return caja
    } catch (error) {
        throw error
    }
}

const deleteCaja = async (id) => {
    try {
        const caja = await Cajas.destroy({
            where: {
                id: id
            }
        })
        return caja
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllCaja,
    getCajaById,
    createCaja,
    updateCaja,
    deleteCaja
}