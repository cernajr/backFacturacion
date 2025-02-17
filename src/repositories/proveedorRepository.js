const db = require('../models');
const Proveedores = db.Proveedor;

const getAllProveedor = async () => {
    try {
        const proveedor = await Proveedores.findAll();
        return proveedor
    } catch (error) {
        throw error
    }
}

const getProveedorById = async (id) => {
    try {
        const proveedor = await Proveedores.findOne({
            where: {
                id: id
            }
        })
        return proveedor
    } catch (error) {
        throw error
    }
}

const createProveedor= async (data) => {
    try {
        const proveedor = await Proveedores.create(data);
        return proveedor
    } catch (error) {
        throw error
    }
}

const updateProveedor = async (id, data) => {
    try {
        const proveedor = await Proveedores.update(data, {
            where: {
                id: id
            }
        })
        return proveedor
    } catch (error) {
        throw error
    }
}

const deleteProveedor = async (id) => {
    try {
        const proveedor = await Proveedores.destroy({
            where: {
                id: id
            }
        })
        return proveedor
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllProveedor,
    getProveedorById,
    createProveedor,
    updateProveedor,
    deleteProveedor
}