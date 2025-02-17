const db = require('../models');
const Empresas = db.Empresa;

const getAllEmpresa= async () => {
    try {
        const empresa = await Empresas.findAll();
        return empresa
    } catch (error) {
        throw error
    }
}

const getEmpresaById = async (id) => {
    try {
        const empresa = await Empresas.findOne({
            where: {
                id: id
            }
        })
        return empresa
    } catch (error) {
        throw error
    }
}

const createEmpresa = async (data) => {
    try {
        const empresa = await Empresas.create(data);
        return empresa
    } catch (error) {
        throw error
    }
}

const updateEmpresa = async (id, data) => {
    try {
        const empresa = await Empresas.update(data, {
            where: {
                id: id
            }
        })
        return empresa
    } catch (error) {
        throw error
    }
}

const deleteEmpresa = async (id) => {
    try {
        const empresa = await Empresas.destroy({
            where: {
                id: id
            }
        })
        return empresa
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllEmpresa,
    getEmpresaById,
    createEmpresa,
    updateEmpresa,
    deleteEmpresa
}