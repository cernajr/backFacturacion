const proveedorService = require('../services/proveedorService');

const getAllProveedor = async (req, res, next) => {
    try {
        const proveedor = await proveedorService.getAllProveedor();
        res.status(200).json(proveedor);
    } catch (error) {
        next(error);
    }
}

const getProveedorById = async (req, res, next) => {
    const id = req.params.id;
    try {
        const proveedor = await proveedorService.getProveedorById(id);
        res.status(200).json(proveedor);
    } catch (error) {
        next(error);
    }
}

const createProveedor = async (req, res, next) => {
   
    const {
        nombre,
        direccion,
        telefono,
        correo,
        estado
    } = req.body;

    const data = {
        nombre,
        direccion,
        telefono,
        correo,
        estado
    }

    try {
        const proveedor = await proveedorService.createProveedor(data);
        res.status(200).json(proveedor);
    } catch (error) {
        next(error);
    }
}

const updateProveedor = async (req, res, next) => {
    
    const id = req.params.id;

    const {
        nombre,
        direccion,
        telefono,
        correo,
        estado
    } = req.body;

    const data = {
        nombre,
        direccion,
        telefono,
        correo,
        estado
    }

    try {
        const proveedor = await proveedorService.updateProveedor(id, data);
        res.status(200).json(proveedor);
    } catch (error) {
        next(error);
    }
}

const deleteProveedor = async (req, res, next) => {
    const id = req.params.id;
    try {
        const proveedor = await proveedorService.deleteProveedor(id);
        res.status(200).json(proveedor);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllProveedor,
    getProveedorById,
    createProveedor,
    updateProveedor,
    deleteProveedor,
}