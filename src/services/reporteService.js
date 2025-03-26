const reporteRepository = require('../repositories/reporteRepository');
const fs = require('fs');
const path = require('path');
const ExcelJS = require('exceljs');
const PDFDocument = require('pdfkit-table');
const db = require('../models');
const Producto = db.Producto;
const Cliente = db.Cliente;
const Factura = db.Factura;
const DetalleFactura = db.DetalleFactura;
const Categoria = db.Categoria;
const { Op } = require('sequelize');

const getAllReportes = async () => {
    try {
        const reportes = await reporteRepository.getAllReportes();
        return reportes ? reportes : [];
    } catch (error) {
        throw error;
    }
};

const getReporteById = async (id) => {
    try {
        const reporte = await reporteRepository.getReporteById(id);
        return reporte ? reporte : null;
    } catch (error) {
        throw error;
    }
};

const getReportesByUsuario = async (usuarioId) => {
    try {
        const reportes = await reporteRepository.getReportesByUsuario(usuarioId);
        return reportes ? reportes : [];
    } catch (error) {
        throw error;
    }
};

const getReportesByTipo = async (tipoReporte) => {
    try {
        const reportes = await reporteRepository.getReportesByTipo(tipoReporte);
        return reportes ? reportes : [];
    } catch (error) {
        throw error;
    }
};

const createReporte = async (data) => {
    try {
        const reporte = await reporteRepository.createReporte(data);
        return reporte ? reporte : null;
    } catch (error) {
        throw error;
    }
};

const updateReporte = async (id, data) => {
    try {
        const reporte = await reporteRepository.updateReporte(id, data);
        return reporte ? reporte : null;
    } catch (error) {
        throw error;
    }
};

const deleteReporte = async (id) => {
    try {
        const reporte = await reporteRepository.deleteReporte(id);
        return reporte ? reporte : null;
    } catch (error) {
        throw error;
    }
};

// Servicio para generar reportes de productos
const generarReporteProductos = async (filtros) => {
    try {
        const { fechaInicio, fechaFin, categoriaId, formato, usuarioId } = filtros;

       
        let where = {};
        if (categoriaId && !esReporteCompleto) {
            // Solo aplicar filtro por categoría si no es un reporte completo y se especificó una categoría
            where.categoriaId = parseInt(categoriaId);
        }
        
        
        // Buscar productos con sus categorías
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
        
        // Generar el nombre del archivo
        const timestamp = new Date().getTime();
        const nombreArchivo = `reporte_productos_${timestamp}.${formato === 'excel' ? 'xlsx' : 'pdf'}`;
        const rutaArchivo = path.join(__dirname, '../public/reportes', nombreArchivo);
        
        // Crear directorio si no existe
        const dirReportes = path.join(__dirname, '../public/reportes');
        if (!fs.existsSync(dirReportes)) {
            fs.mkdirSync(dirReportes, { recursive: true });
        }
        
        // Generar el archivo según el formato
        if (formato === 'excel') {
            await generarExcelProductos(productos, rutaArchivo);
        } else {
            await generarPdfProductos(productos, rutaArchivo);
        }
        
        // Guardar información del reporte en la base de datos
        const nuevoReporte = {
            tipoReporte: esReporteCompleto ? 'allProducts' : 'products',
            fechaInicio: fechaInicio || null,
            fechaFin: fechaFin || null,
            filtros: JSON.stringify({ categoriaId, esReporteCompleto }),
            formato,
            usuarioId,
            estado: true,
            ruta: `/reportes/${nombreArchivo}`,
            nombreArchivo
        };
        
        const reporte = await reporteRepository.createReporte(nuevoReporte);
        return {
            reporte,
            rutaArchivo: `/reportes/${nombreArchivo}`
        };
    } catch (error) {
        throw error;
    }
};

// Servicio para generar reportes de clientes
const generarReporteClientes = async (filtros) => {
    try {
        const { fechaInicio, fechaFin, formato, usuarioId } = filtros;
        
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
        
        // Buscar clientes con sus facturas
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
        
        // Transformar los datos para el reporte
        const clientesData = clientes.map(cliente => {
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
        
        // Generar el nombre del archivo
        const timestamp = new Date().getTime();
        const nombreArchivo = `reporte_clientes_${timestamp}.${formato === 'excel' ? 'xlsx' : 'pdf'}`;
        const rutaArchivo = path.join(__dirname, '../public/reportes', nombreArchivo);
        
        // Crear directorio si no existe
        const dirReportes = path.join(__dirname, '../public/reportes');
        if (!fs.existsSync(dirReportes)) {
            fs.mkdirSync(dirReportes, { recursive: true });
        }
        
        // Generar el archivo según el formato
        if (formato === 'excel') {
            await generarExcelClientes(clientesData, rutaArchivo);
        } else {
            await generarPdfClientes(clientesData, rutaArchivo);
        }
        
        // Guardar información del reporte en la base de datos
        const nuevoReporte = {
            tipoReporte: 'clients',
            fechaInicio: fechaInicio || null,
            fechaFin: fechaFin || null,
            filtros: JSON.stringify({}),
            formato,
            usuarioId,
            estado: true,
            ruta: `/reportes/${nombreArchivo}`,
            nombreArchivo
        };
        
        const reporte = await reporteRepository.createReporte(nuevoReporte);
        return {
            reporte,
            rutaArchivo: `/reportes/${nombreArchivo}`
        };
    } catch (error) {
        throw error;
    }
};

// Servicio para generar reportes de inventario
const generarReporteInventario = async (filtros) => {
    try {
        const { fechaInicio, fechaFin, estado, formato, usuarioId } = filtros;
        
        // Buscar productos con sus categorías
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
        
        // Transformar datos para el reporte
        const inventarioData = productosFiltered.map(producto => {
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
                codigo: producto.codigo,
                nombre: producto.nombre,
                categoria: producto.categoria ? producto.categoria.descripcion : 'Sin categoría',
                stock: producto.stock,
                stockMinimo: producto.stockMinimo,
                estado: estadoInventario,
                ultimoIngreso: producto.updatedAt
            };
        });
        
        // Generar el nombre del archivo
        const timestamp = new Date().getTime();
        const nombreArchivo = `reporte_inventario_${timestamp}.${formato === 'excel' ? 'xlsx' : 'pdf'}`;
        const rutaArchivo = path.join(__dirname, '../public/reportes', nombreArchivo);
        
        // Crear directorio si no existe
        const dirReportes = path.join(__dirname, '../public/reportes');
        if (!fs.existsSync(dirReportes)) {
            fs.mkdirSync(dirReportes, { recursive: true });
        }
        
        // Generar el archivo según el formato
        if (formato === 'excel') {
            await generarExcelInventario(inventarioData, rutaArchivo);
        } else {
            await generarPdfInventario(inventarioData, rutaArchivo);
        }
        
        // Guardar información del reporte en la base de datos
        const nuevoReporte = {
            tipoReporte: 'inventory',
            fechaInicio: fechaInicio || null,
            fechaFin: fechaFin || null,
            filtros: JSON.stringify({ estado }),
            formato,
            usuarioId,
            estado: true,
            ruta: `/reportes/${nombreArchivo}`,
            nombreArchivo
        };
        
        const reporte = await reporteRepository.createReporte(nuevoReporte);
        return {
            reporte,
            rutaArchivo: `/reportes/${nombreArchivo}`
        };
    } catch (error) {
        throw error;
    }
};

// Servicio para generar reportes de facturas
const generarReporteFacturas = async (filtros) => {
    try {
        const { fechaInicio, fechaFin, formato, usuarioId } = filtros;
        
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
        
        // Buscar facturas con sus detalles y clientes
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
        
        // Transformar datos para el reporte
        const facturasData = facturas.map(factura => {
            return {
                id: factura.id,
                numeroFactura: factura.numeroFactura,
                fecha: factura.fecha,
                cliente: factura.cliente ? factura.cliente.nombre : 'Cliente no registrado',
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
            };
        });
        
        // Generar el nombre del archivo
        const timestamp = new Date().getTime();
        const nombreArchivo = `reporte_facturas_${timestamp}.${formato === 'excel' ? 'xlsx' : 'pdf'}`;
        const rutaArchivo = path.join(__dirname, '../public/reportes', nombreArchivo);
        
        // Crear directorio si no existe
        const dirReportes = path.join(__dirname, '../public/reportes');
        if (!fs.existsSync(dirReportes)) {
            fs.mkdirSync(dirReportes, { recursive: true });
        }
        
        // Generar el archivo según el formato
        if (formato === 'excel') {
            await generarExcelFacturas(facturasData, rutaArchivo);
        } else {
            await generarPdfFacturas(facturasData, rutaArchivo);
        }
        
        // Guardar información del reporte en la base de datos
        const nuevoReporte = {
            tipoReporte: 'invoices',
            fechaInicio: fechaInicio || null,
            fechaFin: fechaFin || null,
            filtros: JSON.stringify({}),
            formato,
            usuarioId,
            estado: true,
            ruta: `/reportes/${nombreArchivo}`,
            nombreArchivo
        };
        
        const reporte = await reporteRepository.createReporte(nuevoReporte);
        return {
            reporte,
            rutaArchivo: `/reportes/${nombreArchivo}`
        };
    } catch (error) {
        throw error;
    }
};

// Funciones para generar archivos Excel
const generarExcelProductos = async (productos, rutaArchivo) => {
    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'Sistema de Facturación';
    workbook.created = new Date();
    
    const worksheet = workbook.addWorksheet('Reporte de Productos');
    
    worksheet.columns = [
        { header: 'Código', key: 'codigo', width: 15 },
        { header: 'Nombre', key: 'nombre', width: 30 },
        { header: 'Categoría', key: 'categoria', width: 20 },
        { header: 'Precio', key: 'precio', width: 15 },
        { header: 'Stock Actual', key: 'stock', width: 15 },
        { header: 'Stock Mínimo', key: 'stockMinimo', width: 15 }
    ];
    
    productos.forEach(producto => {
        worksheet.addRow({
            codigo: producto.codigo,
            nombre: producto.nombre,
            categoria: producto.categoria ? producto.categoria.descripcion : 'Sin categoría',
            precio: producto.precio,
            stock: producto.stock,
            stockMinimo: producto.stockMinimo
        });
    });
    
    // Estilo de la tabla
    worksheet.getRow(1).font = { bold: true };
    worksheet.getRow(1).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF4F81BD' }
    };
    worksheet.getRow(1).font = {
        bold: true,
        color: { argb: 'FFFFFFFF' }
    };
    
    await workbook.xlsx.writeFile(rutaArchivo);
};

const generarExcelClientes = async (clientes, rutaArchivo) => {
    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'Sistema de Facturación';
    workbook.created = new Date();
    
    const worksheet = workbook.addWorksheet('Reporte de Clientes');
    
    worksheet.columns = [
        { header: 'Nombre', key: 'nombre', width: 30 },
        { header: 'Documento', key: 'documento', width: 20 },
        { header: 'Teléfono', key: 'telefono', width: 15 },
        { header: 'Correo', key: 'correo', width: 30 },
        { header: 'Dirección', key: 'direccion', width: 40 },
        { header: 'Total Facturas', key: 'totalFacturas', width: 15 },
        { header: 'Monto Total', key: 'montoTotal', width: 20 }
    ];
    
    clientes.forEach(cliente => {
        worksheet.addRow(cliente);
    });
    
    // Estilo de la tabla
    worksheet.getRow(1).font = { bold: true };
    worksheet.getRow(1).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF4F81BD' }
    };
    worksheet.getRow(1).font = {
        bold: true,
        color: { argb: 'FFFFFFFF' }
    };
    
    await workbook.xlsx.writeFile(rutaArchivo);
};

const generarExcelInventario = async (inventario, rutaArchivo) => {
    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'Sistema de Facturación';
    workbook.created = new Date();
    
    const worksheet = workbook.addWorksheet('Reporte de Inventario');
    
    worksheet.columns = [
        { header: 'Código', key: 'codigo', width: 15 },
        { header: 'Nombre', key: 'nombre', width: 30 },
        { header: 'Categoría', key: 'categoria', width: 20 },
        { header: 'Stock Actual', key: 'stock', width: 15 },
        { header: 'Stock Mínimo', key: 'stockMinimo', width: 15 },
        { header: 'Estado', key: 'estado', width: 15 }
    ];
    
    inventario.forEach(item => {
        worksheet.addRow(item);
    });
    
    // Estilo de la tabla
    worksheet.getRow(1).font = { bold: true };
    worksheet.getRow(1).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF4F81BD' }
    };
    worksheet.getRow(1).font = {
        bold: true,
        color: { argb: 'FFFFFFFF' }
    };
    
    await workbook.xlsx.writeFile(rutaArchivo);
};

const generarExcelFacturas = async (facturas, rutaArchivo) => {
    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'Sistema de Facturación';
    workbook.created = new Date();
    
    // Hoja de resumen de facturas
    const worksheetResumen = workbook.addWorksheet('Resumen de Facturas');
    
    worksheetResumen.columns = [
        { header: 'N° Factura', key: 'numeroFactura', width: 15 },
        { header: 'Fecha', key: 'fecha', width: 20 },
        { header: 'Cliente', key: 'cliente', width: 30 },
        { header: 'Subtotal', key: 'subtotal', width: 15 },
        { header: 'Impuesto', key: 'impuesto', width: 15 },
        { header: 'Total', key: 'total', width: 15 },
        { header: 'Estado', key: 'estado', width: 15 }
    ];
    
    facturas.forEach(factura => {
        worksheetResumen.addRow({
            numeroFactura: factura.numeroFactura,
            fecha: factura.fecha,
            cliente: factura.cliente,
            subtotal: factura.subtotal,
            impuesto: factura.impuesto,
            total: factura.total,
            estado: factura.estado.charAt(0).toUpperCase() + factura.estado.slice(1)
        });
    });
    
    // Estilo de la tabla de resumen
    worksheetResumen.getRow(1).font = { bold: true };
    worksheetResumen.getRow(1).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF4F81BD' }
    };
    worksheetResumen.getRow(1).font = {
        bold: true,
        color: { argb: 'FFFFFFFF' }
    };
    
    // Hoja de detalles de facturas
    const worksheetDetalles = workbook.addWorksheet('Detalles de Facturas');
    
    worksheetDetalles.columns = [
        { header: 'N° Factura', key: 'numeroFactura', width: 15 },
        { header: 'Fecha', key: 'fecha', width: 20 },
        { header: 'Cliente', key: 'cliente', width: 30 },
        { header: 'Producto', key: 'producto', width: 30 },
        { header: 'Cantidad', key: 'cantidad', width: 15 },
        { header: 'Precio Unitario', key: 'precioUnitario', width: 15 },
        { header: 'Subtotal', key: 'subtotal', width: 15 }
    ];
    
    facturas.forEach(factura => {
        factura.items.forEach(item => {
            worksheetDetalles.addRow({
                numeroFactura: factura.numeroFactura,
                fecha: factura.fecha,
                cliente: factura.cliente,
                producto: item.nombreProducto,
                cantidad: item.cantidad,
                precioUnitario: item.precioUnitario,
                subtotal: item.subtotal
            });
        });
    });
    
    // Estilo de la tabla de detalles
    worksheetDetalles.getRow(1).font = { bold: true };
    worksheetDetalles.getRow(1).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF4F81BD' }
    };
    worksheetDetalles.getRow(1).font = {
        bold: true,
        color: { argb: 'FFFFFFFF' }
    };
    
    await workbook.xlsx.writeFile(rutaArchivo);
};

// Funciones para generar archivos PDF
const generarPdfProductos = async (productos, rutaArchivo) => {
    return new Promise((resolve, reject) => {
        try {
            const doc = new PDFDocument({ margin: 30, size: 'A4', layout: 'landscape' });
            
            // Configurar el stream
            const stream = fs.createWriteStream(rutaArchivo);
            doc.pipe(stream);
            
            // Título y fecha
            doc.fontSize(20).text('Reporte de Productos', { align: 'center' });
            doc.moveDown();
            doc.fontSize(12).text(`Fecha de generación: ${new Date().toLocaleDateString()}`, { align: 'center' });
            doc.moveDown();
            
            // Tabla de productos
            const tableData = {
                headers: ["Código", "Nombre", "Categoría", "Precio", "Stock", "Stock Mínimo"],
                rows: productos.map(producto => [
                    producto.codigo,
                    producto.nombre,
                    producto.categoria ? producto.categoria.descripcion : 'Sin categoría',
                    `L ${producto.precio.toFixed(2)}`,
                    producto.stock.toString(),
                    producto.stockMinimo.toString()
                ])
            };
            
            doc.table(tableData, { 
                prepareHeader: () => doc.font('Helvetica-Bold').fontSize(10),
                prepareRow: () => doc.font('Helvetica').fontSize(10)
            });
            
            // Finalizar el documento
            doc.end();
            
            // Manejar eventos del stream
            stream.on('finish', () => {
                resolve();
            });
            
            stream.on('error', (err) => {
                reject(err);
            });
        } catch (error) {
            reject(error);
        }
    });
};

const generarPdfClientes = async (clientes, rutaArchivo) => {
    return new Promise((resolve, reject) => {
        try {
            const doc = new PDFDocument({ margin: 30, size: 'A4', layout: 'landscape' });
            
            // Configurar el stream
            const stream = fs.createWriteStream(rutaArchivo);
            doc.pipe(stream);
            
            // Título y fecha
            doc.fontSize(20).text('Reporte de Clientes', { align: 'center' });
            doc.moveDown();
            doc.fontSize(12).text(`Fecha de generación: ${new Date().toLocaleDateString()}`, { align: 'center' });
            doc.moveDown();
            
            // Tabla de clientes
            const tableData = {
                headers: ["Nombre", "Documento", "Teléfono", "Correo", "Total Facturas", "Monto Total"],
                rows: clientes.map(cliente => [
                    cliente.nombre,
                    cliente.documento,
                    cliente.telefono,
                    cliente.correo,
                    cliente.totalFacturas.toString(),
                    `L ${cliente.montoTotal.toFixed(2)}`
                ])
            };
            
            doc.table(tableData, { 
                prepareHeader: () => doc.font('Helvetica-Bold').fontSize(10),
                prepareRow: () => doc.font('Helvetica').fontSize(10)
            });
            
            // Finalizar el documento
            doc.end();
            
            // Manejar eventos del stream
            stream.on('finish', () => {
                resolve();
            });
            
            stream.on('error', (err) => {
                reject(err);
            });
        } catch (error) {
            reject(error);
        }
    });
};

const generarPdfInventario = async (inventario, rutaArchivo) => {
    return new Promise((resolve, reject) => {
        try {
            const doc = new PDFDocument({ margin: 30, size: 'A4', layout: 'landscape' });
            
            // Configurar el stream
            const stream = fs.createWriteStream(rutaArchivo);
            doc.pipe(stream);
            
            // Título y fecha
            doc.fontSize(20).text('Reporte de Inventario', { align: 'center' });
            doc.moveDown();
            doc.fontSize(12).text(`Fecha de generación: ${new Date().toLocaleDateString()}`, { align: 'center' });
            doc.moveDown();
            
            // Tabla de inventario
            const tableData = {
                headers: ["Código", "Nombre", "Categoría", "Stock", "Stock Mínimo", "Estado"],
                rows: inventario.map(item => [
                    item.codigo,
                    item.nombre,
                    item.categoria,
                    item.stock.toString(),
                    item.stockMinimo.toString(),
                    item.estado
                ])
            };
            
            doc.table(tableData, { 
                prepareHeader: () => doc.font('Helvetica-Bold').fontSize(10),
                prepareRow: () => doc.font('Helvetica').fontSize(10)
            });
            
            // Finalizar el documento
            doc.end();
            
            // Manejar eventos del stream
            stream.on('finish', () => {
                resolve();
            });
            
            stream.on('error', (err) => {
                reject(err);
            });
        } catch (error) {
            reject(error);
        }
    });
};

const generarPdfFacturas = async (facturas, rutaArchivo) => {
    return new Promise((resolve, reject) => {
        try {
            const doc = new PDFDocument({ margin: 30, size: 'A4', layout: 'landscape' });
            
            // Configurar el stream
            const stream = fs.createWriteStream(rutaArchivo);
            doc.pipe(stream);
            
            // Título y fecha
            doc.fontSize(20).text('Reporte de Facturas', { align: 'center' });
            doc.moveDown();
            doc.fontSize(12).text(`Fecha de generación: ${new Date().toLocaleDateString()}`, { align: 'center' });
            doc.moveDown();
            
            // Tabla de facturas
            const tableData = {
                headers: ["N° Factura", "Fecha", "Cliente", "Subtotal", "Impuesto", "Total", "Estado"],
                rows: facturas.map(factura => [
                    factura.numeroFactura,
                    factura.fecha instanceof Date 
                        ? factura.fecha.toLocaleDateString() 
                        : new Date(factura.fecha).toLocaleDateString(),
                    factura.cliente,
                    `L ${factura.subtotal.toFixed(2)}`,
                    `L ${factura.impuesto.toFixed(2)}`,
                    `L ${factura.total.toFixed(2)}`,
                    factura.estado.charAt(0).toUpperCase() + factura.estado.slice(1)
                ])
            };
            
            doc.table(tableData, { 
                prepareHeader: () => doc.font('Helvetica-Bold').fontSize(10),
                prepareRow: () => doc.font('Helvetica').fontSize(10)
            });
            
            // Estadísticas
            doc.moveDown().moveDown();
            doc.fontSize(12).text('Resumen:', { underline: true });
            
            const totalFacturas = facturas.length;
            const totalVentas = facturas.reduce((sum, factura) => 
                factura.estado !== 'anulada' ? sum + factura.total : sum, 0);
            const totalImpuestos = facturas.reduce((sum, factura) => 
                factura.estado !== 'anulada' ? sum + factura.impuesto : sum, 0);
            
            doc.moveDown();
            doc.fontSize(10).text(`Total de Facturas: ${totalFacturas}`);
            doc.fontSize(10).text(`Total de Ventas: L ${totalVentas.toFixed(2)}`);
            doc.fontSize(10).text(`Total de Impuestos: L ${totalImpuestos.toFixed(2)}`);
            
            // Finalizar el documento
            doc.end();
            
            // Manejar eventos del stream
            stream.on('finish', () => {
                resolve();
            });
            
            stream.on('error', (err) => {
                reject(err);
            });
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    getAllReportes,
    getReporteById,
    getReportesByUsuario,
    getReportesByTipo,
    createReporte,
    updateReporte,
    deleteReporte,
    generarReporteProductos,
    generarReporteClientes,
    generarReporteInventario,
    generarReporteFacturas
};