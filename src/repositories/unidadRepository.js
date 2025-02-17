const db = require('../models');
const Unidades = db.Unidad;

const getAllUnidad = async () => {
    try {
        const unidad = await Unidades.findAll();
        return unidad
    } catch (error) {
        throw error
    }
}

const getUnidadById = async (id) => {
    try {
        const unidad = await Unidades.findOne({
            where: {
                id: id
            }
        })
        return unidad
    } catch (error) {
        throw error
    }
}

const createUnidad= async (data) => {
    try {
        const unidad = await Unidades.create(data);
        return unidad
    } catch (error) {
        throw error
    }
}

const updateUnidad = async (id, data) => {
    try {
        const unidad = await Unidades.update(data, {
            where: {
                id: id
            }
        })
        return unidad
    } catch (error) {
        throw error
    }
}

const deleteUnidad = async (id) => {
    try {
        const unidad = await Unidades.destroy({
            where: {
                id: id
            }
        })
        return unidad
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllUnidad,
    getUnidadById,
    createUnidad,
    updateUnidad,
    deleteUnidad
} 