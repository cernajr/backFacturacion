const empresaRepository = require('../repositories/empresaRepository')

const getAllEmpresa = async () => {
    try {
        const empresa = await empresaRepository.getAllEmpresa()
        return (empresa) ? empresa : []
    } catch (error) {
        throw error
    }
}

const getEmpresaById = async (id) => {
    try {
        const empresa = await empresaRepository.getEmpresaById(id)
        return (empresa) ? empresa : []
    } catch (error) {
        throw error
    }
}

const createEmpresa = async (data) => {
    try {
        const empresa = await empresaRepository.createEmpresa(data)
        return (empresa) ? empresa : []
    } catch (error) {
        throw error
    }
}


const updateEmpresa = async (id, data) => {
    try {
        const empresa = await empresaRepository.updateEmpresa(id, data)
        return (empresa) ? empresa : []
    } catch (error) {
        throw error
    }
}

const deleteEmpresa = async (id) => {
    try {
        const empresa = await empresaRepository.deleteEmpresa(id)
        return (empresa) ? empresa : []
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllEmpresa,
    getEmpresaById,
    createEmpresa,
    updateEmpresa,
    deleteEmpresa,
}