const { Router } = require('express')

const router = Router();

//creamos la variables de las rutas
const usuarioRoutes = require('./usuario.routes')
const empresaRoutes = require('./empresa.routes')
const clienteRoutes = require('./cliente.routes')
const proveedorRoutes = require('./proveedor.routes')
const rolRoutes = require('./rol.routes')
const categoriaRoutes = require('./categoria.routes')
const unidadRoutes = require('./unidad.routes')
const sarRoutes = require('./sar.routes')
const productoRoutes = require('./producto.routes')
const inventarioRoutes = require('./inventario.routes')
const impuestoRoutes = require('./impuesto.routes')
const tipoImpRoutes = require('./tipoImp.routes')
const ventaRoutes = require('./venta.routes')
const detalleVentaRoutes = require('./detalleVenta.routes')
const compraRoutes = require('./compra.routes')
const detalleCompraRoutes = require('./detalleCompra.routes')
const pagoRoutes = require('./pago.routes')
const cajaRoutes = require('./caja.routes')
const movimientoCajaRoutes = require('./movimientoCaja.routes')
const facturaRoutes = require('./factura.routes')
const detalleFacturaRoutes = require('./detalleFactura.routes')
const metodoPagoRoutes = require('./metodoPago.routes')
const tipoMovimientoRoutes = require('./tipoMovimiento.routes')

//creamos la ruta de la api
router.use('/api/v1/usuario', usuarioRoutes);
router.use('/api/v1/empresa', empresaRoutes);
router.use('/api/v1/cliente', clienteRoutes);
router.use('/api/v1/proveedor', proveedorRoutes);
router.use('/api/v1/rol', rolRoutes);
router.use('/api/v1/categoria', categoriaRoutes);
router.use('/api/v1/unidad', unidadRoutes);
router.use('/api/v1/sar', sarRoutes);
router.use('/api/v1/producto', productoRoutes);
router.use('/api/v1/inventario', inventarioRoutes);
router.use('/api/v1/impuesto', impuestoRoutes);
router.use('/api/v1/tipoImp', tipoImpRoutes);
router.use('/api/v1/venta', ventaRoutes);
router.use('/api/v1/detalleVenta', detalleVentaRoutes);
router.use('/api/v1/compra', compraRoutes);
router.use('/api/v1/detalleCompra', detalleCompraRoutes)
router.use('/api/v1/pago', pagoRoutes);
router.use('/api/v1/caja', cajaRoutes);
router.use('/api/v1/movimientoCaja', movimientoCajaRoutes);
router.use('/api/v1/factura', facturaRoutes);
router.use('/api/v1/detalleFactura', detalleFacturaRoutes);
router.use('/api/v1/metodoPago', metodoPagoRoutes);
router.use('/api/v1/tipoMovimiento', tipoMovimientoRoutes);


module.exports = router;