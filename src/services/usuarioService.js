const usuarioRepository = require('../repositories/usuarioRepository')

const getAllUsuario = async () => {
    try {
        const usuario = await usuarioRepository.getAllUsuario()
        return (usuario) ? usuario : []
    } catch (error) {
        throw error
    }
}

const getUsuarioById = async (id) => {
    try {
        const usuario = await usuarioRepository.getUsuarioById(id)
        return (usuario) ? usuario : []
    } catch (error) {
        throw error
    }
}

const createUsuario = async (data) => {
    try {
        const usuario = await usuarioRepository.createUsuario(data)
        return (usuario) ? usuario : []
    } catch (error) {
        throw error
    }
}


const updateUsuario = async (id, data) => {
    try {
        const usuario = await usuarioRepository.updateUsuario(id, data)
        return (usuario) ? usuario : []
    } catch (error) {
        throw error
    }
}

const deleteUsuario = async (id) => {
    try {
        const usuario = await usuarioRepository.deleteUsuario(id)
        return (usuario) ? usuario : []
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllUsuario,
    getUsuarioById,
    createUsuario,
    updateUsuario,
    deleteUsuario,
}