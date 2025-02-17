const empresaService = require('../services/empresaService');

const getAllEmpresa = async (req, res, next) => {
    try {
        const empresa = await empresaService.getAllEmpresa();
        res.status(200).json(empresa);
    } catch (error) {
        next(error);
    }
}

const getEmpresaById = async (req, res, next) => {
    const id = req.params.id;
    try {
        const empresa = await empresaService.getEmpresaById(id);
        res.status(200).json(empresa);
    } catch (error) {
        next(error);
    }
}

const createEmpresa = async (req, res, next) => {
   
    const {
        nombre,
        correo,
        rtn,
        direccion,
        telefono,
        estado
    } = req.body;

    const data = {
        nombre,
        correo,
        rtn,
        direccion,
        telefono,
        estado
    }

    try {
        const empresa = await empresaService.createEmpresa(data);
        res.status(200).json(empresa);
    } catch (error) {
        next(error);
    }
}

const updateEmpresa = async (req, res, next) => {
    
    const id = req.params.id;

    const {
        nombre,
        correo,
        rtn,
        direccion,
        telefono,
        estado
    } = req.body;

    const data = {
        nombre,
        correo,
        rtn,
        direccion,
        telefono,
        estado
    }

    try {
        const empresa = await empresaService.updateEmpresa(id, data);
        res.status(200).json(empresa);
    } catch (error) {
        next(error);
    }
}

const deleteEmpresa = async (req, res, next) => {
    const id = req.params.id;
    try {
        const empresa = await empresaService.deleteEmpresa(id);
        res.status(200).json(empresa);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllEmpresa,
    getEmpresaById,
    createEmpresa,
    updateEmpresa,
    deleteEmpresa,
}