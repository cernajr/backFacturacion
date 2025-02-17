const db = require('../models');
const Productos = db.Producto;

const getAllProducto = async () => {
    try {
        const producto = await Productos.findAll();
        return producto
    } catch (error) {
        throw error
    }
}

const getProductoById = async (id) => {
    try {
        const producto = await Productos.findOne({
            where: {
                id: id
            }
        })
        return producto
    } catch (error) {
        throw error
    }
}

const createProducto = async (data) => {
    try {
        const producto = await Productos.create(data);
        return producto
    } catch (error) {
        throw error
    }
}

const updateProducto = async (id, data) => {
    try {
        const producto = await Productos.update(data, {
            where: {
                id: id
            }
        })
        return producto
    } catch (error) {
        throw error
    }
}

const deleteProducto = async (id) => {
    try {
        const producto = await Productos.destroy({
            where: {
                id: id
            }
        })
        return producto
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllProducto,
    getProductoById,
    createProducto,
    updateProducto,
    deleteProducto
}