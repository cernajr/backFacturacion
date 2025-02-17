const db = require('../models');
const DetalleCompras = db.DetalleCompra;

const getAllDetalleCompra = async () => {
    try {
        const detalleCompra = await DetalleCompras.findAll();
        return detalleCompra;
    } catch (error) {
        throw error;
    }
}
// ... resto del código

const getDetalleCompraById = async (id) => {
    try {
        const detalleCompra = await DetalleCompras.findOne({
            where: {
                id: id
            }
        })
        return detalleCompra
    } catch (error) {
        throw error
    }
}

const createDetalleCompra = async (data) => {
    try {
        const detalleCompra = await DetalleCompras.create(data);
        return detalleCompra
    } catch (error) {
        throw error
    }
}

const updateDetalleCompra = async (id, data) => {
    try {
        await DetalleCompras.update(data, {
            where: { id: id }
        });
        const updatedDetalleCompra = await DetalleCompras.findByIdOne({
            where: { id: id }
        });
        return updatedDetalleCompra;
    } catch (error) {
        throw error;
    }
}

const deleteDetalleCompra = async (id) => {
    try {
        const detalleCompra = await DetalleCompras.destroy({
            where: {
                id: id
            }
        })
        return detalleCompra
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllDetalleCompra,
    getDetalleCompraById,
    createDetalleCompra,
    updateDetalleCompra,
    deleteDetalleCompra
}