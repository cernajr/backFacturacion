const productoService = require('../services/productoService');

const getAllProducto = async (req, res, next) => {
    try {
        const producto = await productoService.getAllProducto();
        res.status(200).json(producto);
    } catch (error) {
        next(error);
    }
}

const getProductoById = async (req, res, next) => {
    const id = req.params.id;
    try {
        const producto = await productoService.getProductoById(id);
        res.status(200).json(producto);
    } catch (error) {
        next(error);
    }
}

const createProducto = async (req, res, next) => {

    const {
        proveedorId,
        empresaId,
        unidadId,
        categoriaId,
        nombre,
        descripcion,
        precio,
        codigoProducto,
        estado
    } = req.body;

    const data = {
        proveedorId,
        empresaId,
        unidadId,
        categoriaId,
        nombre,
        descripcion,
        precio,
        codigoProducto,
        estado
    }

    try {
        const producto = await productoService.createProducto(data);
        res.status(200).json(producto);
    } catch (error) {
        next(error);
    }
}

const updateProducto = async (req, res, next) => {

    const id = req.params.id;

    const {
        proveedorId,
        empresaId,
        unidadId,
        categoriaId,
        nombre,
        descripcion,
        precio,
        codigoProducto,
        estado
    } = req.body;

    const data = {
        proveedorId,
        empresaId,
        unidadId,
        categoriaId,
        nombre,
        descripcion,
        precio,
        codigoProducto,
        estado
    }

    try {
        const producto = await productoService.updateProducto(id, data);
        res.status(200).json(producto);
    } catch (error) {
        next(error);
    }
}

const deleteProducto = async (req, res, next) => {
    const id = req.params.id;
    try {
        const producto = await productoService.deleteProducto(id);
        res.status(200).json(producto);
    } catch (error) {
        next(error);
    }
}

const createProductoInventario = async (req, res, next) => {
    const {
        proveedorId,
        unidadId,
        categoriaId,
        nombre,
        descripcion,
        precio,
        codigoProducto,
        estado,
        stockActual,
        stockMinimo,
        stockMaximo,
    } = req.body;

    const data = {
        proveedorId,
        unidadId,
        categoriaId,
        nombre,
        descripcion,
        precio,
        codigoProducto,
        estado,
        stockActual,
        stockMinimo,
        stockMaximo,
    }

    try {
        const producto = await productoService.createProductoInventario(data);
        res.status(200).json(producto);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllProducto,
    getProductoById,
    createProducto,
    updateProducto,
    deleteProducto,
    createProductoInventario,
}