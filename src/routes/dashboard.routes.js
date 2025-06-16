const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const { authMiddleware } = require('../middleware/authMiddleware');

// Todas las rutas del dashboard requieren autenticación
router.use(authMiddleware);

// Obtener estadísticas generales
router.get('/stats', dashboardController.getStats);

// Obtener actividad reciente
router.get('/activity', dashboardController.getRecentActivity);

module.exports = router;