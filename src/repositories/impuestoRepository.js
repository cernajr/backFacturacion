const db = require('../models');
const Impuestos = db.Impuesto;

const getAllImpuesto = async () => {
    try {
        const impuesto = await Impuestos.findAll();
        return impuesto
    } catch (error) {
        throw error
    }
}

const getImpuestoById = async (id) => {
    try {
        const impuesto = await Impuestos.findOne({
            where: {
                id: id
            }
        })
        return impuesto
    } catch (error) {
        throw error
    }
}

const createImpuesto = async (data) => {
    try {
        const impuesto = await Impuestos.create(data);
        return impuesto
    } catch (error) {
        throw error
    }
}

const updateImpuesto = async (id, data) => {
    try {
        const impuesto = await Impuestos.update(data, {
            where: {
                id: id
            }
        })
        return impuesto
    } catch (error) {
        throw error
    }
}

const deleteImpuesto = async (id) => {
    try {
        const impuesto = await Impuestos.destroy({
            where: {
                id: id
            }
        })
        return impuesto
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllImpuesto,
    getImpuestoById,
    createImpuesto,
    updateImpuesto,
    deleteImpuesto
}