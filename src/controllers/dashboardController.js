const db = require('../models');
const { Op } = require('sequelize');
const sequelize = db.sequelize;

const dashboardController = {
  /**
   * Obtener estadísticas generales del dashboard
   */
  getStats: async (req, res) => {
    try {
      // Obtener fecha actual y primer día del mes
      const now = new Date();
      const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

      // 1. Total de ventas del mes actual
      const totalVentasResult = await db.Factura.sum('total', {
        where: {
          fechaEmision: {
            [Op.gte]: firstDayOfMonth
          },
          estado: true
        }
      });

      // 2. Total de facturas emitidas este mes
      const totalFacturas = await db.Factura.count({
        where: {
          fechaEmision: {
            [Op.gte]: firstDayOfMonth
          },
          estado: true
        }
      });

      // 3. Total de productos activos
      const totalProductos = await db.Producto.count({
        where: {
          estado: true
        }
      });

      // 4. Total de clientes activos
      const totalClientes = await db.Cliente.count({
        where: {
          estado: true
        }
      });

      // 5. Ventas por mes (últimos 6 meses)
      const ventasPorMes = await sequelize.query(`
        SELECT 
          MONTH(fechaEmision) as mes,
          YEAR(fechaEmision) as año,
          SUM(total) as total
        FROM FACTURAS 
        WHERE fechaEmision >= DATE_SUB(NOW(), INTERVAL 6 MONTH)
          AND estado = 1
        GROUP BY YEAR(fechaEmision), MONTH(fechaEmision)
        ORDER BY año, mes
      `, {
        type: sequelize.QueryTypes.SELECT
      });

      // 6. Productos por categoría
      const productosPorCategoria = await sequelize.query(`
        SELECT 
          c.descripcion as categoria,
          COUNT(p.id) as cantidad
        FROM PRODUCTOS p
        INNER JOIN CATEGORIA c ON p.categoriaId = c.id
        WHERE p.estado = 1
        GROUP BY c.id, c.descripcion
        ORDER BY cantidad DESC
      `, {
        type: sequelize.QueryTypes.SELECT
      });

      // 7. Top 5 productos más vendidos
      const topProductos = await sequelize.query(`
        SELECT 
          p.nombre,
          SUM(df.cantidad) as totalVendido
        FROM DETALLEFACTURAS df
        INNER JOIN PRODUCTOS p ON df.productoId = p.id
        INNER JOIN FACTURAS f ON df.facturaId = f.id
        WHERE f.fechaEmision >= DATE_SUB(NOW(), INTERVAL 3 MONTH)
          AND f.estado = 1
        GROUP BY p.id, p.nombre
        ORDER BY totalVendido DESC
        LIMIT 5
      `, {
        type: sequelize.QueryTypes.SELECT
      });

      // 8. Estado de facturas
      const estadoFacturas = await sequelize.query(`
        SELECT 
          CASE 
            WHEN metodoPago = 'CONTADO' THEN 'Pagadas'
            WHEN fechaVencimiento < NOW() THEN 'Vencidas'
            ELSE 'Pendientes'
          END as estado,
          COUNT(*) as cantidad
        FROM FACTURAS 
        WHERE fechaEmision >= DATE_SUB(NOW(), INTERVAL 3 MONTH)
          AND estado = 1
        GROUP BY 
          CASE 
            WHEN metodoPago = 'CONTADO' THEN 'Pagadas'
            WHEN fechaVencimiento < NOW() THEN 'Vencidas'
            ELSE 'Pendientes'
          END
      `, {
        type: sequelize.QueryTypes.SELECT
      });

      // Respuesta con todos los datos
      res.json({
        success: true,
        data: {
          // Estadísticas principales
          totalVentas: totalVentasResult || 0,
          totalFacturas: totalFacturas || 0,
          totalProductos: totalProductos || 0,
          totalClientes: totalClientes || 0,
          
          // Datos para gráficos
          ventasPorMes: ventasPorMes || [],
          productosPorCategoria: productosPorCategoria || [],
          topProductos: topProductos || [],
          estadoFacturas: estadoFacturas || []
        }
      });

    } catch (error) {
      console.error('Error obteniendo estadísticas del dashboard:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  },

  /**
   * Obtener actividad reciente
   */
  getRecentActivity: async (req, res) => {
    try {
      // Últimas 5 facturas
      const ultimasFacturas = await db.Factura.findAll({
        limit: 5,
        order: [['fechaEmision', 'DESC']],
        include: [
          {
            model: db.Cliente,
            as: 'cliente',
            attributes: ['nombre']
          }
        ],
        where: {
          estado: true
        }
      });

      // Últimos 5 clientes registrados
      const ultimosClientes = await db.Cliente.findAll({
        limit: 5,
        order: [['createdAt', 'DESC']],
        attributes: ['nombre', 'createdAt'],
        where: {
          estado: true
        }
      });

      // Últimos 5 productos agregados
      const ultimosProductos = await db.Producto.findAll({
        limit: 5,
        order: [['createdAt', 'DESC']],
        attributes: ['nombre', 'createdAt'],
        where: {
          estado: true
        }
      });

      res.json({
        success: true,
        data: {
          ultimasFacturas: ultimasFacturas || [],
          ultimosClientes: ultimosClientes || [],
          ultimosProductos: ultimosProductos || []
        }
      });

    } catch (error) {
      console.error('Error obteniendo actividad reciente:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }
};

module.exports = dashboardController;