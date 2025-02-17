const usuarioService = require('../services/usuarioService');

const getAllUsuario = async (req, res, next) => {
    try {
        const usuario = await usuarioService.getAllUsuario();
        res.status(200).json(usuario);
    } catch (error) {
        next(error);
    }
}

const getUsuarioById = async (req, res, next) => {
    const id = req.params.id;
    try {
        const usuario = await usuarioService.getUsuarioById(id);
        res.status(200).json(usuario);
    } catch (error) {
        next(error);
    }
}

const createUsuario = async (req, res, next) => {
   
    const {
        nombre,
        correo,
        usuarioNombre,
        contrasena,
        rolId,
        direccion,
        telefono,
        estado
    } = req.body;

    const data = {
        nombre,
        correo,
        usuarioNombre,
        contrasena,
        rolId,
        direccion,
        telefono,
        estado
    }

    try {
        const usuario = await usuarioService.createUsuario(data);
        res.status(200).json(usuario);
    } catch (error) {
        next(error);
    }
}

const updateUsuario = async (req, res, next) => {
    
    const id = req.params.id;

    const {
        nombre,
        correo,
        usuarioNombre,
        contrasena,
        rolId,
        direccion,
        telefono,
        estado
    } = req.body;

    const data = {
        nombre,
        correo,
        usuarioNombre,
        contrasena,
        rolId,
        direccion,
        telefono,
        estado
    }

    try {
        const usuario = await usuarioService.updateUsuario(id, data);
        res.status(200).json(usuario);
    } catch (error) {
        next(error);
    }
}

const deleteUsuario = async (req, res, next) => {
    const id = req.params.id;
    try {
        const usuario = await usuarioService.deleteUsuario(id);
        res.status(200).json(usuario);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllUsuario,
    getUsuarioById,
    createUsuario,
    updateUsuario,
    deleteUsuario,
}