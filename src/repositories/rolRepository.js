const db = require('../models');
const Roles = db.Rol;

const getAllRol = async () => {
    try {
        const rol = await Roles.findAll();
        return rol
    } catch (error) {
        throw error
    }
}

const getRolById = async (id) => {
    try {
        const rol = await Roles.findOne({
            where: {
                id: id
            }
        })
        return rol
    } catch (error) {
        throw error
    }
}

const createRol= async (data) => {
    try {
        const rol = await Roles.create(data);
        return rol
    } catch (error) {
        throw error
    }
}

const updateRol = async (id, data) => {
    try {
        const rol = await Roles.update(data, {
            where: {
                id: id
            }
        })
        return rol
    } catch (error) {
        throw error
    }
}

const deleteRol = async (id) => {
    try {
        const rol = await Roles.destroy({
            where: {
                id: id
            }
        })
        return rol
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllRol,
    getRolById,
    createRol,
    updateRol,
    deleteRol
}