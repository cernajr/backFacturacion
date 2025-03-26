const { body, query, param, validationResult } = require('express-validator');

const reporteValidationRules = () => {
    return [
        body('tipoReporte')
            .notEmpty().withMessage('El tipo de reporte es obligatorio')
            .isIn(['products', 'allProducts', 'clients', 'inventory', 'invoices'])
            .withMessage('Tipo de reporte no válido'),
        
        body('fechaInicio')
            .optional()
            .isDate().withMessage('La fecha de inicio debe ser una fecha válida'),
        
        body('fechaFin')
            .optional()
            .isDate().withMessage('La fecha de fin debe ser una fecha válida'),
        
        body('filtros')
            .optional()
            .isString().withMessage('Los filtros deben ser una cadena JSON válida'),
        
        body('formato')
            .notEmpty().withMessage('El formato es obligatorio')
            .isIn(['excel', 'pdf']).withMessage('Formato no válido'),
        
        body('usuarioId')
            .notEmpty().withMessage('El ID de usuario es obligatorio')
            .isInt().withMessage('El ID de usuario debe ser un número entero'),
        
        body('estado')
            .optional()
            .isBoolean().withMessage('El estado debe ser un valor booleano'),
        
        body('ruta')
            .optional()
            .isString().withMessage('La ruta debe ser una cadena de texto'),
        
        body('nombreArchivo')
            .optional()
            .isString().withMessage('El nombre del archivo debe ser una cadena de texto')
    ];
};

const generarReporteValidationRules = () => {
    return [
        query('fechaInicio')
            .optional()
            .isDate().withMessage('La fecha de inicio debe ser una fecha válida'),
        
        query('fechaFin')
            .optional()
            .isDate().withMessage('La fecha de fin debe ser una fecha válida'),
        
        query('categoria')
            .optional({ nullable: true, checkFalsy: true }) // Hará que se ignore si es null, undefined o ""
            .isInt().withMessage('La categoría debe ser un número entero'),
        
        query('estado')
            .optional({ nullable: true, checkFalsy: true })
            .isIn(['low', 'normal', 'high']).withMessage('Estado de inventario no válido')
    ];
};

const idParamValidationRules = () => {
    return [
        param('id')
            .notEmpty().withMessage('El ID es obligatorio')
            .isInt().withMessage('El ID debe ser un número entero')
    ];
};

const usuarioIdParamValidationRules = () => {
    return [
        param('usuarioId')
            .notEmpty().withMessage('El ID de usuario es obligatorio')
            .isInt().withMessage('El ID de usuario debe ser un número entero')
    ];
};

const tipoParamValidationRules = () => {
    return [
        param('tipo')
            .notEmpty().withMessage('El tipo de reporte es obligatorio')
            .isIn(['products', 'allProducts', 'clients', 'inventory', 'invoices'])
            .withMessage('Tipo de reporte no válido')
    ];
};

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    
    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({ [err.path]: err.msg }));
    
    return res.status(422).json({
        message: extractedErrors,
    });
};

module.exports = {
    reporteValidationRules,
    generarReporteValidationRules,
    idParamValidationRules,
    usuarioIdParamValidationRules,
    tipoParamValidationRules,
    validate
};