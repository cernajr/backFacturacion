const reporteService = require('../services/reporteService');
const path = require('path');
const fs = require('fs');

const getAllReportes = async (req, res, next) => {
    try {
        const reportes = await reporteService.getAllReportes();
        res.status(200).json(reportes);
    } catch (error) {
        next(error);
    }
};

const getReporteById = async (req, res, next) => {
    const id = req.params.id;
    try {
        const reporte = await reporteService.getReporteById(id);
        if (!reporte) {
            return res.status(404).json({ message: 'Reporte no encontrado' });
        }
        res.status(200).json(reporte);
    } catch (error) {
        next(error);
    }
};

const getReportesByUsuario = async (req, res, next) => {
    const usuarioId = req.params.usuarioId;
    try {
        const reportes = await reporteService.getReportesByUsuario(usuarioId);
        res.status(200).json(reportes);
    } catch (error) {
        next(error);
    }
};

const getReportesByTipo = async (req, res, next) => {
    const tipoReporte = req.params.tipo;
    try {
        const reportes = await reporteService.getReportesByTipo(tipoReporte);
        res.status(200).json(reportes);
    } catch (error) {
        next(error);
    }
};

const createReporte = async (req, res, next) => {
    try {
        const {
            tipoReporte,
            fechaInicio,
            fechaFin,
            filtros,
            formato,
            usuarioId,
            estado,
            ruta,
            nombreArchivo
        } = req.body;
        
        const data = {
            tipoReporte,
            fechaInicio,
            fechaFin,
            filtros,
            formato,
            usuarioId: usuarioId || (req.usuario ? req.usuario.id : 1),
            estado: estado !== undefined ? estado : true,
            ruta,
            nombreArchivo
        };
        
        const reporte = await reporteService.createReporte(data);
        res.status(201).json(reporte);
    } catch (error) {
        next(error);
    }
};

const updateReporte = async (req, res, next) => {
    try {
        const id = req.params.id;
        const {
            tipoReporte,
            fechaInicio,
            fechaFin,
            filtros,
            formato,
            usuarioId,
            estado,
            ruta,
            nombreArchivo
        } = req.body;
        
        const data = {
            tipoReporte,
            fechaInicio,
            fechaFin,
            filtros,
            formato,
            usuarioId,
            estado,
            ruta,
            nombreArchivo
        };
        
        const reporte = await reporteService.updateReporte(id, data);
        res.status(200).json(reporte);
    } catch (error) {
        next(error);
    }
};

const deleteReporte = async (req, res, next) => {
    try {
        const id = req.params.id;
        
        // Obtener el reporte para eliminar el archivo asociado
        const reporte = await reporteService.getReporteById(id);
        if (!reporte) {
            return res.status(404).json({ message: 'Reporte no encontrado' });
        }
        
        // Eliminar el archivo si existe
        if (reporte.ruta) {
            const rutaCompleta = path.join(__dirname, '../public', reporte.ruta);
            if (fs.existsSync(rutaCompleta)) {
                fs.unlinkSync(rutaCompleta);
            }
        }
        
        // Eliminar el registro de la base de datos
        const resultado = await reporteService.deleteReporte(id);
        res.status(200).json({ message: 'Reporte eliminado correctamente', data: resultado });
    } catch (error) {
        next(error);
    }
};

// Controladores para generar reportes específicos

// Todos los productos
const getAllProductsReport = async (req, res, next) => {
    try {
        // Buscar todos los productos
        const db = require('../models');
        const Producto = db.Producto;
        const Categoria = db.Categoria;
        
        const productos = await Producto.findAll({
            include: [
                {
                    model: Categoria,
                    as: 'categoria'
                }
            ],
            order: [['nombre', 'ASC']]
        });
        
        // Transformar los datos para la respuesta
        const result = productos.map((producto, index) => ({
            id: producto.id,
            codigo: producto.codigo || 'N/A',
            nombre: producto.nombre,
            categoria: producto.categoria ? producto.categoria.descripcion : 'Sin categoría',
            precio: producto.precio || 0,
            stock: producto.stock || 0,
            stockMinimo: producto.stockMinimo || 0
        }));
        
        res.status(200).json(result);
    } catch (error) {
        console.error('Error al generar el reporte de todos los productos:', error);
        next(error);
    }
};

// Formato Excel para todos los productos
const getAllProductsReportExcel = async (req, res, next) => {
    try {
        const usuarioId = req.usuario ? req.usuario.id : 1; // Si no hay usuario autenticado, usar ID 1 por defecto
        
        const filtros = {
            formato: 'excel',
            usuarioId,
            esReporteCompleto: true // Indicador de que es un reporte de todos los productos
        };
        
        const resultado = await reporteService.generarReporteProductos(filtros);
        
        // Enviar el archivo al cliente
        const rutaArchivo = path.join(__dirname, '../public', resultado.rutaArchivo);
        res.download(rutaArchivo);
    } catch (error) {
        console.error('Error al generar el reporte de todos los productos en Excel:', error);
        next(error);
    }
};

// Formato PDF para todos los productos
const getAllProductsReportPdf = async (req, res, next) => {
    try {
        const usuarioId = req.usuario ? req.usuario.id : 1; // Si no hay usuario autenticado, usar ID 1 por defecto
        
        const filtros = {
            formato: 'pdf',
            usuarioId,
            esReporteCompleto: true // Indicador de que es un reporte de todos los productos
        };
        
        const resultado = await reporteService.generarReporteProductos(filtros);
        
        // Enviar el archivo al cliente
        const rutaArchivo = path.join(__dirname, '../public', resultado.rutaArchivo);
        res.download(rutaArchivo);
    } catch (error) {
        console.error('Error al generar el reporte de todos los productos en PDF:', error);
        next(error);
    }
};

// Productos
const getProductsReport = async (req, res, next) => {
    try {
        const { fechaInicio, fechaFin, categoria } = req.query;
        
        // Buscar productos según los filtros
        const db = require('../models');
        const Producto = db.Producto;
        const Categoria = db.Categoria;
        
        let where = {};
        
        // Validar que categoria sea un número antes de usarlo
        if (categoria && !isNaN(categoria)) {
            where.categoriaId = parseInt(categoria);
        }
        
        const productos = await Producto.findAll({
            where,
            include: [
                {
                    model: Categoria,
                    as: 'categoria'
                }
            ],
            order: [['nombre', 'ASC']]
        });
        
        // Transformar los datos para la respuesta
        const result = productos.map((producto, index) => ({
            id: producto.id,
            codigo: producto.codigo || 'N/A',
            nombre: producto.nombre,
            categoria: producto.categoria ? producto.categoria.descripcion : 'Sin categoría',
            precio: producto.precio || 0,
            stock: producto.stock || 0,
            stockMinimo: producto.stockMinimo || 0
        }));
        
        res.status(200).json(result);
    } catch (error) {
        console.error('Error al generar el reporte de productos:', error);
        next(error);
    }
};

// Formato Excel
const getProductsReportExcel = async (req, res, next) => {
    try {
        const { fechaInicio, fechaFin, categoria } = req.query;
        const usuarioId = req.usuario ? req.usuario.id : 1; // Si no hay usuario autenticado, usar ID 1 por defecto
        
        const filtros = {
            fechaInicio,
            fechaFin,
            categoriaId: categoria,
            formato: 'excel',
            usuarioId
        };
        
        const resultado = await reporteService.generarReporteProductos(filtros);
        
        // Enviar el archivo al cliente
        const rutaArchivo = path.join(__dirname, '../public', resultado.rutaArchivo);
        res.download(rutaArchivo);
    } catch (error) {
        console.error('Error al generar el reporte de productos en Excel:', error);
        next(error);
    }
};

// Formato PDF
const getProductsReportPdf = async (req, res, next) => {
    try {
        const { fechaInicio, fechaFin, categoria } = req.query;
        const usuarioId = req.usuario ? req.usuario.id : 1; // Si no hay usuario autenticado, usar ID 1 por defecto
        
        const filtros = {
            fechaInicio,
            fechaFin,
            categoriaId: categoria,
            formato: 'pdf',
            usuarioId
        };
        
        const resultado = await reporteService.generarReporteProductos(filtros);
        
        // Enviar el archivo al cliente
        const rutaArchivo = path.join(__dirname, '../public', resultado.rutaArchivo);
        res.download(rutaArchivo);
    } catch (error) {
        console.error('Error al generar el reporte de productos en PDF:', error);
        next(error);
    }
};

// Clientes
const getClientsReport = async (req, res, next) => {
    try {
        const { fechaInicio, fechaFin } = req.query;
        
        // Buscar clientes según los filtros
        const db = require('../models');
        const Cliente = db.Cliente;
        const Factura = db.Factura;
        const { Op } = require('sequelize');
        
        // Construir condiciones de búsqueda para facturas
        let whereFactura = {};
        if (fechaInicio || fechaFin) {
            whereFactura.fecha = {};
            if (fechaInicio) {
                whereFactura.fecha[Op.gte] = new Date(fechaInicio);
            }
            if (fechaFin) {
                whereFactura.fecha[Op.lte] = new Date(fechaFin);
            }
        }
        
        const clientes = await Cliente.findAll({
            include: [
                {
                    model: Factura,
                    as: 'facturas',
                    where: whereFactura,
                    required: false
                }
            ],
            order: [['nombre', 'ASC']]
        });
        
        // Transformar los datos para la respuesta
        const result = clientes.map((cliente) => {
            // Calcular el total de facturas y monto
            const totalFacturas = cliente.facturas ? cliente.facturas.length : 0;
            const montoTotal = cliente.facturas 
                ? cliente.facturas.reduce((sum, factura) => sum + (factura.total || 0), 0) 
                : 0;
            
            return {
                id: cliente.id,
                nombre: cliente.nombre,
                documento: cliente.documento,
                telefono: cliente.telefono,
                correo: cliente.correo || 'N/A',
                direccion: cliente.direccion,
                totalFacturas,
                montoTotal
            };
        });
        
        // Filtrar clientes que no tienen facturas en el período si se especifica fecha
        const filteredResult = (fechaInicio || fechaFin) 
            ? result.filter(cliente => cliente.totalFacturas > 0)
            : result;
        
        res.status(200).json(filteredResult);
    } catch (error) {
        console.error('Error al generar el reporte de clientes:', error);
        next(error);
    }
};

// Formato Excel
const getClientsReportExcel = async (req, res, next) => {
    try {
        const { fechaInicio, fechaFin } = req.query;
        const usuarioId = req.usuario ? req.usuario.id : 1; // Si no hay usuario autenticado, usar ID 1 por defecto
        
        const filtros = {
            fechaInicio,
            fechaFin,
            formato: 'excel',
            usuarioId
        };
        
        const resultado = await reporteService.generarReporteClientes(filtros);
        
        // Enviar el archivo al cliente
        const rutaArchivo = path.join(__dirname, '../public', resultado.rutaArchivo);
        res.download(rutaArchivo);
    } catch (error) {
        console.error('Error al generar el reporte de clientes en Excel:', error);
        next(error);
    }
};

// Formato PDF
const getClientsReportPdf = async (req, res, next) => {
    try {
        const { fechaInicio, fechaFin } = req.query;
        const usuarioId = req.usuario ? req.usuario.id : 1; // Si no hay usuario autenticado, usar ID 1 por defecto
        
        const filtros = {
            fechaInicio,
            fechaFin,
            formato: 'pdf',
            usuarioId
        };
        
        const resultado = await reporteService.generarReporteClientes(filtros);
        
        // Enviar el archivo al cliente
        const rutaArchivo = path.join(__dirname, '../public', resultado.rutaArchivo);
        res.download(rutaArchivo);
    } catch (error) {
        console.error('Error al generar el reporte de clientes en PDF:', error);
        next(error);
    }
};

// Inventario
const getInventoryReport = async (req, res, next) => {
    try {
        const { fechaInicio, fechaFin, estado } = req.query;
        
        // Buscar productos según los filtros
        const db = require('../models');
        const Producto = db.Producto;
        const Categoria = db.Categoria;
        
        const productos = await Producto.findAll({
            include: [
                {
                    model: Categoria,
                    as: 'categoria'
                }
            ],
            order: [['nombre', 'ASC']]
        });
        
        // Filtrar productos según el estado del inventario
        let productosFiltered = [...productos];
        if (estado) {
            productosFiltered = productos.filter(producto => {
                const ratio = producto.stock / producto.stockMinimo;
                
                switch (estado) {
                    case 'low':
                        return producto.stock <= producto.stockMinimo;
                    case 'normal':
                        return producto.stock > producto.stockMinimo && ratio <= 2;
                    case 'high':
                        return ratio > 2;
                    default:
                        return true;
                }
            });
        }
        
        // Transformar los datos para la respuesta
        const result = productosFiltered.map((producto) => {
            // Determinar estado
            let estadoInventario;
            const ratio = producto.stock / producto.stockMinimo;
            
            if (producto.stock <= producto.stockMinimo) {
                estadoInventario = 'Bajo';
            } else if (ratio <= 2) {
                estadoInventario = 'Normal';
            } else {
                estadoInventario = 'Alto';
            }
            
            return {
                id: producto.id,
                codigo: producto.codigo || 'N/A',
                nombre: producto.nombre,
                categoria: producto.categoria ? producto.categoria.descripcion : 'Sin categoría',
                stock: producto.stock || 0,
                stockMinimo: producto.stockMinimo || 0,
                estado: estadoInventario,
                ultimoIngreso: producto.updatedAt
            };
        });
        
        res.status(200).json(result);
    } catch (error) {
        console.error('Error al generar el reporte de inventario:', error);
        next(error);
    }
};

// Formato Excel
const getInventoryReportExcel = async (req, res, next) => {
    try {
        const { fechaInicio, fechaFin, estado } = req.query;
        const usuarioId = req.usuario ? req.usuario.id : 1; // Si no hay usuario autenticado, usar ID 1 por defecto
        
        const filtros = {
            fechaInicio,
            fechaFin,
            estado,
            formato: 'excel',
            usuarioId
        };
        
        const resultado = await reporteService.generarReporteInventario(filtros);
        
        // Enviar el archivo al cliente
        const rutaArchivo = path.join(__dirname, '../public', resultado.rutaArchivo);
        res.download(rutaArchivo);
    } catch (error) {
        console.error('Error al generar el reporte de inventario en Excel:', error);
        next(error);
    }
};

// Formato PDF
const getInventoryReportPdf = async (req, res, next) => {
    try {
        const { fechaInicio, fechaFin, estado } = req.query;
        const usuarioId = req.usuario ? req.usuario.id : 1; // Si no hay usuario autenticado, usar ID 1 por defecto
        
        const filtros = {
            fechaInicio,
            fechaFin,
            estado,
            formato: 'pdf',
            usuarioId
        };
        
        const resultado = await reporteService.generarReporteInventario(filtros);
        
        // Enviar el archivo al cliente
        const rutaArchivo = path.join(__dirname, '../public', resultado.rutaArchivo);
        res.download(rutaArchivo);
    } catch (error) {
        console.error('Error al generar el reporte de inventario en PDF:', error);
        next(error);
    }
};

// Facturas
const getInvoicesReport = async (req, res, next) => {
    try {
        const { fechaInicio, fechaFin } = req.query;
        
        // Buscar facturas según los filtros
        const db = require('../models');
        const Factura = db.Factura;
        const Cliente = db.Cliente;
        const DetalleFactura = db.DetalleFactura;
        const Producto = db.Producto;
        const { Op } = require('sequelize');
        
        // Construir condiciones de búsqueda
        let where = {};
        if (fechaInicio || fechaFin) {
            where.fecha = {};
            if (fechaInicio) {
                where.fecha[Op.gte] = new Date(fechaInicio);
            }
            if (fechaFin) {
                where.fecha[Op.lte] = new Date(fechaFin);
            }
        }
        
        const facturas = await Factura.findAll({
            where,
            include: [
                {
                    model: Cliente,
                    as: 'cliente'
                },
                {
                    model: DetalleFactura,
                    as: 'detallesFactura',
                    include: [
                        {
                            model: Producto,
                            as: 'producto'
                        }
                    ]
                }
            ],
            order: [['fecha', 'DESC']]
        });
        
        // Transformar los datos para la respuesta
        const result = facturas.map((factura) => ({
            id: factura.id,
            numeroFactura: factura.numeroFactura,
            fecha: factura.fecha,
            cliente: factura.cliente ? factura.cliente.nombre : 'Cliente no registrado',
            clienteId: factura.clienteId,
            subtotal: factura.subtotal,
            impuesto: factura.impuesto,
            total: factura.total,
            estado: factura.estado,
            items: factura.detallesFactura.map(detalle => ({
                id: detalle.id,
                productoId: detalle.productoId,
                nombreProducto: detalle.producto ? detalle.producto.nombre : 'Producto no disponible',
                cantidad: detalle.cantidad,
                precioUnitario: detalle.precioUnitario,
                subtotal: detalle.subtotal
            }))
        }));
        
        res.status(200).json(result);
    } catch (error) {
        console.error('Error al generar el reporte de facturas:', error);
        next(error);
    }
};

// Formato Excel
const getInvoicesReportExcel = async (req, res, next) => {
    try {
        const { fechaInicio, fechaFin } = req.query;
        const usuarioId = req.usuario ? req.usuario.id : 1; // Si no hay usuario autenticado, usar ID 1 por defecto
        
        const filtros = {
            fechaInicio,
            fechaFin,
            formato: 'excel',
            usuarioId
        };
        
        const resultado = await reporteService.generarReporteFacturas(filtros);
        
        // Enviar el archivo al cliente
        const rutaArchivo = path.join(__dirname, '../public', resultado.rutaArchivo);
        res.download(rutaArchivo);
    } catch (error) {
        console.error('Error al generar el reporte de facturas en Excel:', error);
        next(error);
    }
};

// Formato PDF
const getInvoicesReportPdf = async (req, res, next) => {
    try {
        const { fechaInicio, fechaFin } = req.query;
        const usuarioId = req.usuario ? req.usuario.id : 1; // Si no hay usuario autenticado, usar ID 1 por defecto
        
        const filtros = {
            fechaInicio,
            fechaFin,
            formato: 'pdf',
            usuarioId
        };
        
        const resultado = await reporteService.generarReporteFacturas(filtros);
        
        // Enviar el archivo al cliente
        const rutaArchivo = path.join(__dirname, '../public', resultado.rutaArchivo);
        res.download(rutaArchivo);
    } catch (error) {
        console.error('Error al generar el reporte de facturas en PDF:', error);
        next(error);
    }
};

// Descargar un reporte existente
const downloadReporte = async (req, res, next) => {
    try {
        const id = req.params.id;
        
        // Obtener información del reporte
        const reporte = await reporteService.getReporteById(id);
        if (!reporte) {
            return res.status(404).json({ message: 'Reporte no encontrado' });
        }
        
        // Verificar que el archivo exista
        const rutaArchivo = path.join(__dirname, '../public', reporte.ruta);
        if (!fs.existsSync(rutaArchivo)) {
            return res.status(404).json({ message: 'El archivo de reporte no existe' });
        }
        
        // Enviar el archivo al cliente
        res.download(rutaArchivo, reporte.nombreArchivo);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllReportes,
    getReporteById,
    getReportesByUsuario,
    getReportesByTipo,
    createReporte,
    updateReporte,
    deleteReporte,
    getAllProductsReport,
    getAllProductsReportExcel,
    getAllProductsReportPdf,
    getProductsReport,
    getProductsReportExcel,
    getProductsReportPdf,
    getClientsReport,
    getClientsReportExcel,
    getClientsReportPdf,
    getInventoryReport,
    getInventoryReportExcel,
    getInventoryReportPdf,
    getInvoicesReport,
    getInvoicesReportExcel,
    getInvoicesReportPdf,
    downloadReporte
};