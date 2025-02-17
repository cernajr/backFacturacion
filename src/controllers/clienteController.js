const clienteService = require('../services/clienteService');

const getAllCliente = async (req, res, next) => {
    try {
        const cliente = await clienteService.getAllCliente();
        res.status(200).json(cliente);
    } catch (error) {
        next(error);
    }
}

const getClienteById = async (req, res, next) => {
    const id = req.params.id;
    try {
        const cliente = await clienteService.getClienteById(id);
        res.status(200).json(cliente);
    } catch (error) {
        next(error);
    }
}

const createCliente = async (req, res, next) => {
   
    const {
        empresaId,
        nombre,
        correo,
        direccion,
        telefono,
        rtn,
        estado
    } = req.body;

    const data = {
        empresaId,
        nombre,
        correo,
        direccion,
        telefono,
        rtn,
        estado
    }

    try {
        const cliente = await clienteService.createCliente(data);
        res.status(200).json(cliente);
    } catch (error) {
        next(error);
    }
}

const updateCliente = async (req, res, next) => {
    
    const id = req.params.id;

    const {
        empresaId,
        nombre,
        correo,
        direccion,
        telefono,
        rtn,
        estado
    } = req.body;

    const data = {
        empresaId,
        nombre,
        correo,
        direccion,
        telefono,
        rtn,
        estado
    }

    try {
        const cliente = await clienteService.updateCliente(id, data);
        res.status(200).json(cliente);
    } catch (error) {
        next(error);
    }
}

const deleteCliente = async (req, res, next) => {
    const id = req.params.id;
    try {
        const cliente = await clienteService.deleteCliente(id);
        res.status(200).json(cliente);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllCliente,
    getClienteById,
    createCliente,
    updateCliente,
    deleteCliente,
}