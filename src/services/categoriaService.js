const categoriaRepository = require('../repositories/categoriaRepository')

const getAllCategoria = async () => {
    try {
        const categoria = await categoriaRepository.getAllCategoria()
        return (categoria) ? categoria : []
    } catch (error) {
        throw error
    }
}

const getCategoriaById = async (id) => {
    try {
        const categoria = await categoriaRepository.getCategoriaById(id)
        return (categoria) ? categoria : []
    } catch (error) {
        throw error
    }
}

const createCategoria = async (data) => {
    try {
        const categoria = await categoriaRepository.createCategoria(data)
        return (categoria) ? categoria : []
    } catch (error) {
        throw error
    }
}


const updateCategoria = async (id, data) => {
    try {
        const categoria = await categoriaRepository.updateCategoria(id, data)
        return (categoria) ? categoria : []
    } catch (error) {
        throw error
    }
}

const deleteCategoria = async (id) => {
    try {
        const categoria = await categoriaRepository.deleteCategoria(id)
        return (categoria) ? categoria : []
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllCategoria,
    getCategoriaById,
    createCategoria,
    updateCategoria,
    deleteCategoria,
}