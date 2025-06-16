const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models');
const Usuario = db.Usuario;
const Rol = db.Rol;

const authController = {
  /**
   * Login de usuario
   */
  login: async (req, res) => {
    try {
      const { usuario: nombreUsuario, password } = req.body;
      
      // Validar datos requeridos
      if (!nombreUsuario || !password) {
        return res.status(400).json({ 
          message: 'Usuario y contraseña son requeridos' 
        });
      }

      // Buscar usuario por usuarioNombre (sin asociaciones para evitar errores)
      const usuario = await Usuario.findOne({
        where: { 
          usuarioNombre: nombreUsuario,
          estado: true // Solo usuarios activos
        }
      });

      if (!usuario) {
        return res.status(401).json({ 
          message: 'Credenciales inválidas' 
        });
      }

      // Si no hay contraseña hasheada (para desarrollo), comparar directamente
      let validPassword = false;
      if (usuario.contrasena && usuario.contrasena.startsWith('$2b$')) {
        // Contraseña hasheada
        validPassword = await bcrypt.compare(password, usuario.contrasena);
      } else {
        // Para desarrollo - comparación directa
        validPassword = password === usuario.contrasena;
      }

      if (!validPassword) {
        return res.status(401).json({ 
          message: 'Credenciales inválidas' 
        });
      }

      // Buscar información del rol por separado
      let rolInfo = null;
      if (usuario.rolId) {
        try {
          const rol = await Rol.findByPk(usuario.rolId);
          if (rol) {
            rolInfo = {
              id: rol.id,
              descripcion: rol.descripcion
            };
          }
        } catch (error) {
          console.log('Error buscando rol:', error.message);
          // Continuar sin rol si hay error
        }
      }

      // Generar token JWT
      const token = jwt.sign(
        { 
          id: usuario.id, 
          usuario: usuario.usuarioNombre,
          rolId: usuario.rolId 
        },
        process.env.JWT_SECRET || 'secretkey',
        { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
      );

      // Actualizar fecha de último acceso
      await usuario.update({ 
        updatedAt: new Date() 
      });

      // Respuesta exitosa
      res.json({
        success: true,
        token,
        usuario: {
          id: usuario.id,
          nombre: usuario.nombre,
          usuario: usuario.usuarioNombre,
          email: usuario.correo,
          telefono: usuario.telefono,
          rol: rolInfo
        }
      });

    } catch (error) {
      console.error('Error en login:', error);
      res.status(500).json({ 
        message: 'Error interno del servidor',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  },

  /**
   * Verificar token y obtener datos del usuario
   */
  verifyToken: async (req, res) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      
      if (!token) {
        return res.status(401).json({ 
          message: 'Token no proporcionado' 
        });
      }

      // Verificar token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secretkey');
      
      // Buscar usuario (sin asociaciones para evitar errores)
      const usuario = await Usuario.findOne({
        where: { 
          id: decoded.id,
          estado: true 
        }
      });

      if (!usuario) {
        return res.status(401).json({ 
          message: 'Usuario no encontrado' 
        });
      }

      // Buscar información del rol por separado
      let rolInfo = null;
      if (usuario.rolId) {
        try {
          const rol = await Rol.findByPk(usuario.rolId);
          if (rol) {
            rolInfo = {
              id: rol.id,
              descripcion: rol.descripcion
            };
          }
        } catch (error) {
          console.log('Error buscando rol:', error.message);
          // Continuar sin rol si hay error
        }
      }

      res.json({
        success: true,
        usuario: {
          id: usuario.id,
          nombre: usuario.nombre,
          usuario: usuario.usuarioNombre,
          email: usuario.correo,
          telefono: usuario.telefono,
          rol: rolInfo
        }
      });

    } catch (error) {
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ message: 'Token inválido' });
      }
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token expirado' });
      }

      console.error('Error verificando token:', error);
      res.status(500).json({ 
        message: 'Error interno del servidor',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  },

  /**
   * Logout (invalidar token del lado del cliente)
   */
  logout: async (req, res) => {
    try {
      // En este caso simple, el logout se maneja del lado del cliente
      // eliminando el token del almacenamiento
      res.json({
        success: true,
        message: 'Logout exitoso'
      });
    } catch (error) {
      console.error('Error en logout:', error);
      res.status(500).json({ 
        message: 'Error interno del servidor' 
      });
    }
  },

  /**
   * Cambiar contraseña
   */
  changePassword: async (req, res) => {
    try {
      const { currentPassword, newPassword } = req.body;
      const usuarioId = req.usuario.id;

      if (!currentPassword || !newPassword) {
        return res.status(400).json({
          message: 'Contraseña actual y nueva contraseña son requeridas'
        });
      }

      if (newPassword.length < 6) {
        return res.status(400).json({
          message: 'La nueva contraseña debe tener al menos 6 caracteres'
        });
      }

      const usuario = await Usuario.findByPk(usuarioId);

      if (!usuario) {
        return res.status(404).json({
          message: 'Usuario no encontrado'
        });
      }

      // Verificar contraseña actual
      let validCurrentPassword = false;
      if (usuario.contrasena && usuario.contrasena.startsWith('$2b$')) {
        validCurrentPassword = await bcrypt.compare(currentPassword, usuario.contrasena);
      } else {
        validCurrentPassword = currentPassword === usuario.contrasena;
      }

      if (!validCurrentPassword) {
        return res.status(401).json({
          message: 'Contraseña actual incorrecta'
        });
      }

      // Hashear nueva contraseña
      const saltRounds = 12;
      const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

      // Actualizar contraseña
      await usuario.update({
        contrasena: hashedNewPassword
      });

      res.json({
        success: true,
        message: 'Contraseña actualizada exitosamente'
      });

    } catch (error) {
      console.error('Error cambiando contraseña:', error);
      res.status(500).json({
        message: 'Error interno del servidor'
      });
    }
  }
};

module.exports = authController;