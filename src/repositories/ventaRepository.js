const db = require('../models');
const Ventas = db.Venta;

const getAllVenta = async () => {
    try {
        const venta = await Ventas.findAll();
        return venta
    } catch (error) {
        throw error
    }
}

const getVentaById = async (id) => {
    try {
        const venta = await Ventas.findOne({
            where: {
                id: id
            }
        })
        return venta
    } catch (error) {
        throw error
    }
}

const createVenta = async (data) => {
    try {
        const venta = await Ventas.create(data);
        return venta
    } catch (error) {
        throw error
    }
}

const updateVenta = async (id, data) => {
    try {
        const venta = await Ventas.update(data, {
            where: {
                id: id
            }
        })
        return venta
    } catch (error) {
        throw error
    }
}

const deleteVenta = async (id) => {
    try {
        const venta = await Ventas.destroy({
            where: {
                id: id
            }
        })
        return venta
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllVenta,
    getVentaById,
    createVenta,
    updateVenta,
    deleteVenta
}