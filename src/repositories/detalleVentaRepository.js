const db = require('../models');
const DetalleVentas = db.DetalleVenta;

const getAllDetalleVenta = async () => {
    try {
        const detalleVenta = await DetalleVentas.findAll();
        return detalleVenta
    } catch (error) {
        throw error
    }
}

const getDetalleVentaById = async (id) => {
    try {
        const detalleVenta = await DetalleVentas.findOne({
            where: {
                id: id
            }
        })
        return detalleVenta
    } catch (error) {
        throw error
    }
}

const createDetalleVenta = async (data) => {
    try {
        const detalleVenta = await DetalleVentas.create(data);
        return detalleVenta
    } catch (error) {
        throw error
    }
}

const updateDetalleVenta = async (id, data) => {
    try {
        const detalleVenta = await DetalleVentas.update(data, {
            where: {
                id: id
            }
        })
        return detalleVenta
    } catch (error) {
        throw error
    }
}

const deleteDetalleVenta = async (id) => {
    try {
        const detalleVenta = await DetalleVentas.destroy({
            where: {
                id: id
            }
        })
        return detalleVenta
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllDetalleVenta,
    getDetalleVentaById,
    createDetalleVenta,
    updateDetalleVenta,
    deleteDetalleVenta
}