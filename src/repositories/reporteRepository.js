const db = require('../models');
const Reportes = db.Reporte;
const Usuario = db.Usuario;

const getAllReportes = async () => {
    try {
        const reportes = await Reportes.findAll({
            include: [
                {
                    model: Usuario,
                    as: 'usuario',
                    attributes: ['id', 'nombre', 'apellido', 'email']
                }
            ],
            order: [['createdAt', 'DESC']]
        });
        return reportes;
    } catch (error) {
        throw error;
    }
};

const getReporteById = async (id) => {
    try {
        const reporte = await Reportes.findOne({
            where: {
                id: id
            },
        });
        return reporte;
    } catch (error) {
        throw error;
    }
};

const getReportesByUsuario = async (usuarioId) => {
    try {
        const reportes = await Reportes.findAll({
            where: {
                usuarioId: usuarioId
            },
            include: [
                {
                    model: Usuario,
                    as: 'usuario',
                    attributes: ['id', 'nombre', 'apellido', 'email']
                }
            ],
            order: [['createdAt', 'DESC']]
        });
        return reportes;
    } catch (error) {
        throw error;
    }
};

const getReportesByTipo = async (tipoReporte) => {
    try {
        const reportes = await Reportes.findAll({
            where: {
                tipoReporte: tipoReporte
            },
            include: [
                {
                    model: Usuario,
                    as: 'usuario',
                    attributes: ['id', 'nombre', 'apellido', 'email']
                }
            ],
            order: [['createdAt', 'DESC']]
        });
        return reportes;
    } catch (error) {
        throw error;
    }
};

const createReporte = async (data) => {
    try {
        const reporte = await Reportes.create(data);
        return reporte;
    } catch (error) {
        throw error;
    }
};

const updateReporte = async (id, data) => {
    try {
        const reporte = await Reportes.update(data, {
            where: {
                id: id
            }
        });
        return reporte;
    } catch (error) {
        throw error;
    }
};

const deleteReporte = async (id) => {
    try {
        const reporte = await Reportes.destroy({
            where: {
                id: id
            }
        });
        return reporte;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getAllReportes,
    getReporteById,
    getReportesByUsuario,
    getReportesByTipo,
    createReporte,
    updateReporte,
    deleteReporte
};