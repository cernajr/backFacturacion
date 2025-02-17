const db = require('../models');
const Categorias = db.Categoria;

const getAllCategoria = async () => {
    try {
        const categoria = await Categorias.findAll();
        return categoria
    } catch (error) {
        throw error
    }
}

const getCategoriaById = async (id) => {
    try {
        const categoria = await Categorias.findOne({
            where: {
                id: id
            }
        })
        return categoria
    } catch (error) {
        throw error
    }
}

const createCategoria= async (data) => {
    try {
        const categoria = await Categorias.create(data);
        return categoria
    } catch (error) {
        throw error
    }
}

const updateCategoria = async (id, data) => {
    try {
        const categoria = await Categorias.update(data, {
            where: {
                id: id
            }
        })
        return categoria
    } catch (error) {
        throw error
    }
}

const deleteCategoria = async (id) => {
    try {
        const categoria = await Categorias.destroy({
            where: {
                id: id
            }
        })
        return categoria
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllCategoria,
    getCategoriaById,
    createCategoria,
    updateCategoria,
    deleteCategoria
}