const db = require('../models');
const DetalleFacturas = db.DetalleFactura;

const getAllDetalleFactura = async () => {
    try {
        const detalleFactura = await DetalleFacturas.findAll();
        return detalleFactura
    } catch (error) {
        throw error
    }
}

const getDetalleFacturaById = async (id) => {
    try {
        const detalleFactura = await DetalleFacturas.findOne({
            where: {
                id: id
            }
        })
        return detalleFactura
    } catch (error) {
        throw error
    }
}

const createDetalleFactura = async (data) => {
    try {
        const detalleFactura = await DetalleFacturas.create(data);
        return detalleFactura
    } catch (error) {
        throw error
    }
}

const updateDetalleFactura = async (id, data) => {
    try {
        const detalleFactura = await DetalleFacturas.update(data, {
            where: {
                id: id
            }
        })
        return detalleFactura
    } catch (error) {
        throw error
    }
}

const deleteDetalleFactura = async (id) => {
    try {
        const detalleFactura = await DetalleFacturas.destroy({
            where: {
                id: id
            }
        })
        return detalleFactura
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllDetalleFactura,
    getDetalleFacturaById,
    createDetalleFactura,
    updateDetalleFactura,
    deleteDetalleFactura
}