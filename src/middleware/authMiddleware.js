const jwt = require('jsonwebtoken');
const db = require('../models');
const Usuario = db.Usuario;
const Rol = db.Rol;

/**
 * Middleware para validar token de autenticación
 */
const authMiddleware = async (req, res, next) => {
  try {
    // Obtener el token del header
    const token = req.headers.authorization?.split(' ')[1];
   
    if (!token) {
      return res.status(401).json({ message: 'No se proporcionó token de autenticación' });
    }
   
    // Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secretkey');
   
    // Buscar el usuario en la base de datos
    const usuario = await Usuario.findOne({
      where: { id: decoded.id },
      include: [
        {
          model: Rol,
          as: 'rol'
        }
      ]
    });
   
    if (!usuario) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }
   
    // Verificar que el usuario esté activo
    if (!usuario.estado) {
      return res.status(401).json({ message: 'Usuario inactivo' });
    }
   
    // Agregar el usuario a la request
    req.usuario = usuario;
   
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Token inválido' });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expirado' });
    }
   
    return res.status(500).json({ message: 'Error en la autenticación', error: error.message });
  }
};

/**
 * Middleware opcional para desarrollo - permite omitir autenticación
 * SOLO usar en rutas específicas durante desarrollo
 */
const devAuthMiddleware = async (req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    // Usuario por defecto para desarrollo
    req.usuario = { id: 1, nombre: 'Admin', rolId: 1 };
    return next();
  }
  
  // En producción, usar el middleware normal
  return authMiddleware(req, res, next);
};

/**
 * Middleware para validar roles
 * @param {Array} roles - Array de roles permitidos
 */
const roleMiddleware = (roles) => {
  return (req, res, next) => {
    if (!req.usuario) {
      return res.status(401).json({ message: 'No autorizado' });
    }
   
    const userRole = req.usuario.rol ? req.usuario.rol.descripcion : null;
   
    if (!userRole || !roles.includes(userRole)) {
      return res.status(403).json({ message: 'No tiene permisos para realizar esta acción' });
    }
   
    next();
  };
};

/**
 * Middleware opcional para desarrollo - permite omitir validación de roles
 */
const devRoleMiddleware = (roles) => {
  return (req, res, next) => {
    if (process.env.NODE_ENV === 'development') {
      return next();
    }
    
    // En producción, usar el middleware normal
    return roleMiddleware(roles)(req, res, next);
  };
};

module.exports = {
  authMiddleware,        // Middleware normal - siempre valida token
  devAuthMiddleware,     // Middleware para desarrollo - omite validación
  roleMiddleware,        // Middleware normal de roles
  devRoleMiddleware      // Middleware de roles para desarrollo
};