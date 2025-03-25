const db = require('../models');
const Inventarios = db.Inventario;

const getAllInventario = async () => {
    try {
        const inventario = await Inventarios.findAll();
        return inventario
    } catch (error) {
        throw error
    }
}

const getInventarioById = async (id) => {
    try {
        const inventario = await Inventarios.findOne({
            where: {
                productoId: id
            }
        })
        return inventario
    } catch (error) {
        throw error
    }
}

const createInventario = async (data) => {
    try {
        const inventario = await Inventarios.create(data);
        return inventario
    } catch (error) {
        throw error
    }
}

const updateInventario = async (id, data) => {
    try {
        const inventario = await Inventarios.update(data, {
            where: {
                productoId: id
            }
        })
        return inventario
    } catch (error) {
        throw error
    }
}

const deleteInventario = async (id) => {
    try {
        const inventario = await Inventarios.destroy({
            where: {
                id: id
            }
        })
        return inventario
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllInventario,
    getInventarioById,
    createInventario,
    updateInventario,
    deleteInventario
}