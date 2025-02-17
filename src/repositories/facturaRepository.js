const db = require('../models');
const Facturas = db.Factura;

const getAllFactura = async () => {
    try {
        const factura = await Facturas.findAll();
        return factura
    } catch (error) {
        throw error
    }
}

const getFacturaById = async (id) => {
    try {
        const factura = await Facturas.findOne({
            where: {
                id: id
            }
        })
        return factura
    } catch (error) {
        throw error
    }
}

const createFactura = async (data) => {
    try {
        const factura = await Facturas.create(data);
        return factura
    } catch (error) {
        throw error
    }
}

const updateFactura = async (id, data) => {
    try {
        const factura = await Facturas.update(data, {
            where: {
                id: id
            }
        })
        return factura
    } catch (error) {
        throw error
    }
}

const deleteFactura = async (id) => {
    try {
        const factura = await Facturas.destroy({
            where: {
                id: id
            }
        })
        return factura
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllFactura,
    getFacturaById,
    createFactura,
    updateFactura,
    deleteFactura
}