const db = require('../models');
const TipoImps = db.TipoImp;

const getAllTipoImp = async () => {
    try {
        const tipoImp = await TipoImps.findAll();
        return tipoImp
    } catch (error) {
        throw error
    }
}

const getTipoImpById = async (id) => {
    try {
        const tipoImp = await TipoImps.findOne({
            where: {
                id: id
            }
        })
        return tipoImp
    } catch (error) {
        throw error
    }
}

const createTipoImp= async (data) => {
    try {
        const tipoImp = await TipoImps.create(data);
        return tipoImp
    } catch (error) {
        throw error
    }
}

const updateTipoImp = async (id, data) => {
    try {
        const tipoImp = await TipoImps.update(data, {
            where: {
                id: id
            }
        })
        return tipoImp
    } catch (error) {
        throw error
    }
}

const deleteTipoImp = async (id) => {
    try {
        const tipoImp = await TipoImps.destroy({
            where: {
                id: id
            }
        })
        return tipoImp
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllTipoImp,
    getTipoImpById,
    createTipoImp,
    updateTipoImp,
    deleteTipoImp
}