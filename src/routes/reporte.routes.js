const express = require('express');
const reporteController = require('../controllers/reporteController');
const router = express.Router();

// Middleware temporal para desarrollo
const authMiddleware = (req, res, next) => {
    // Simular un usuario autenticado
    req.usuario = { id: 1, nombre: 'Admin', rolId: 1 };
    next();
};

// Rutas para gestión de reportes - sin validaciones para simplificar desarrollo
router.get('/', authMiddleware, reporteController.getAllReportes);
router.get('/:id', authMiddleware, reporteController.getReporteById);
router.get('/usuario/:usuarioId', authMiddleware, reporteController.getReportesByUsuario);
router.get('/tipo/:tipo', authMiddleware, reporteController.getReportesByTipo);
router.post('/', authMiddleware, reporteController.createReporte);
router.put('/:id', authMiddleware, reporteController.updateReporte);
router.delete('/:id', authMiddleware, reporteController.deleteReporte);
router.get('/download/:id', authMiddleware, reporteController.downloadReporte);

// Rutas para generar reportes específicos - sin validaciones para simplificar
// Todos los productos
router.get('/allProducts', authMiddleware, reporteController.getAllProductsReport);
router.get('/allProducts/excel', authMiddleware, reporteController.getAllProductsReportExcel);
router.get('/allProducts/pdf', authMiddleware, reporteController.getAllProductsReportPdf);

// Productos por categoría
router.get('/products', authMiddleware, reporteController.getProductsReport);
router.get('/products/excel', authMiddleware, reporteController.getProductsReportExcel);
router.get('/products/pdf', authMiddleware, reporteController.getProductsReportPdf);

// Clientes
router.get('/clients', authMiddleware, reporteController.getClientsReport);
router.get('/clients/excel', authMiddleware, reporteController.getClientsReportExcel);
router.get('/clients/pdf', authMiddleware, reporteController.getClientsReportPdf);

// Inventario
router.get('/inventory', authMiddleware, reporteController.getInventoryReport);
router.get('/inventory/excel', authMiddleware, reporteController.getInventoryReportExcel);
router.get('/inventory/pdf', authMiddleware, reporteController.getInventoryReportPdf);

// Facturas
router.get('/invoices', authMiddleware, reporteController.getInvoicesReport);
router.get('/invoices/excel', authMiddleware, reporteController.getInvoicesReportExcel);
router.get('/invoices/pdf', authMiddleware, reporteController.getInvoicesReportPdf);

module.exports = router;