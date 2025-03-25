const db = require('../models');
const Usuarios = db.Usuario;
const { sequelize } = require("../models")
const { QueryTypes, Transaction, } = require('sequelize')

const getAllUsuario = async () => {
    try {
        const sql = `select us.*, r.descripcion as nombreRol from usuarios as us
                     inner join rols as r on us.rolId = r.id`

        const usuario = await sequelize.query(sql, {
            type: QueryTypes.SELECT
        })

        return usuario
    } catch (error) {
        throw error
    }
}

const getUsuarioById = async (id) => {
    try {
        const usuario = await Usuarios.findOne({
            where: {
                id: id
            }
        })
        return usuario
    } catch (error) {
        throw error
    }
}

const createUsuario = async (data) => {
    try {
        const usuario = await Usuarios.create(data);
        return usuario
    } catch (error) {
        throw error
    }
}

const updateUsuario = async (id, data) => {
    try {
        const usuario = await Usuarios.update(data, {
            where: {
                id: id
            }
        })
        return usuario
    } catch (error) {
        throw error
    }
}

const deleteUsuario = async (id) => {
    try {
        const usuario = await Usuarios.destroy({
            where: {
                id: id
            }
        })
        return usuario
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllUsuario,
    getUsuarioById,
    createUsuario,
    updateUsuario,
    deleteUsuario
}