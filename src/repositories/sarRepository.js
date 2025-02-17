const db = require('../models');
const Sares = db.Sar;

const getAllSar = async () => {
    try {
        const sar = await Sares.findAll();
        return sar
    } catch (error) {
        throw error
    }
}

const getSarById = async (id) => {
    try {
        const sar = await Sares.findOne({
            where: {
                id: id
            }
        })
        return sar
    } catch (error) {
        throw error
    }
}

const createSar= async (data) => {
    try {
        const sar = await Sares.create(data);
        return sar
    } catch (error) {
        throw error
    }
}

const updateSar = async (id, data) => {
    try {
        const sar = await Sares.update(data, {
            where: {
                id: id
            }
        })
        return sar
    } catch (error) {
        throw error
    }
}

const deleteSar = async (id) => {
    try {
        const sar = await Sares.destroy({
            where: {
                id: id
            }
        })
        return sar
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllSar,
    getSarById,
    createSar,
    updateSar,
    deleteSar
} 