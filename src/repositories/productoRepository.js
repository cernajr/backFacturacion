const db = require('../models');
const Productos = db.Producto;
const Inventario = db.Inventario
const { Op } = require('sequelize');
const { QueryTypes } = require('sequelize');
const { sequelize } = require("../models");

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

const createProductoInventario = async (data) => {
    const transaction = await db.sequelize.transaction()
    try {

        const {
            proveedorId,
            unidadId,
            categoriaId,
            nombre,
            descripcion,
            precio,
            codigoProducto,
            estado,
            stockActual,
            stockMinimo,
            stockMaximo,
        } = data

        const producto = await Productos.create({
            proveedorId: proveedorId,
            empresaId: 1,
            unidadId: unidadId,
            categoriaId: categoriaId,
            nombre: nombre,
            descripcion: descripcion,
            precio: precio,
            codigoProducto: codigoProducto,
            estado: estado,
        }, { transaction })

        await Inventario.create({
            productoId: producto.id,
            empresaId: 1,
            stockActual: stockActual,
            stockMinimo: stockMinimo,
            stockMaximo: stockMaximo,
            estado: 1,
        }, { transaction })

        await transaction.commit()
        return producto
    } catch (error) {
        await transaction.rollback()
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
    deleteProducto,
    createProductoInventario,
}