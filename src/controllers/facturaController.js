const facturaService = require('../services/facturaService');

const getAllFactura = async (req, res, next) => {
    try {
        const factura = await facturaService.getAllFactura();
        res.status(200).json(factura);
    } catch (error) {
        next(error);
    }
}

const getFacturaById = async (req, res, next) => {
    const id = req.params.id;
    try {
        const factura = await facturaService.getFacturaById(id);
        res.status(200).json(factura);
    } catch (error) {
        next(error);
    }
}

const createFactura = async (req, res, next) => {
   
    const {
        clienteId,
        usuarioId,
        fechaEmision,
        tipoFactura,
        total,
        metodoPago,
        totalExtento,
        ventaId,
        totalIsv,
        numFacturaSAR,
        cai,
        fechaVencimiento,
        estado
    } = req.body;

    const data = {
        clienteId,
        usuarioId,
        fechaEmision,
        tipoFactura,
        total,
        metodoPago,
        totalExtento,
        ventaId,
        totalIsv,
        numFacturaSAR,
        cai,
        fechaVencimiento,
        estado
    }

    try {
        const factura = await facturaService.createFactura(data);
        res.status(200).json(factura);
    } catch (error) {
        next(error);
    }
}

const updateFactura = async (req, res, next) => {
    
    const id = req.params.id;

    const {
        clienteId,
        usuarioId,
        fechaEmision,
        tipoFactura,
        total,
        metodoPago,
        totalExtento,
        ventaId,
        totalIsv,
        numFacturaSAR,
        cai,
        fechaVencimiento,
        estado
    } = req.body;

    const data = {
        clienteId,
        usuarioId,
        fechaEmision,
        tipoFactura,
        total,
        metodoPago,
        totalExtento,
        ventaId,
        totalIsv,
        numFacturaSAR,
        cai,
        fechaVencimiento,
        estado
    }

    try {
        const factura = await facturaService.updateFactura(id, data);
        res.status(200).json(factura);
    } catch (error) {
        next(error);
    }
}

const deleteFactura = async (req, res, next) => {
    const id = req.params.id;
    try {
        const factura = await facturaService.deleteFactura(id);
        res.status(200).json(factura);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllFactura,
    getFacturaById,
    createFactura,
    updateFactura,
    deleteFactura,
}