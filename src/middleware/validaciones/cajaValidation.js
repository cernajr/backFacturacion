const { body, validationResult } = require('express-validator');

const cajaValidationRules = () => {
    return [
        body('empresaId')
            .notEmpty().withMessage('El campo es obligatorio')
            .isInt().withMessage('Debe ser un número entero'),
        
        body('usuarioId')
            .notEmpty().withMessage('El campo es obligatorio')
            .isInt().withMessage('Debe ser un número entero'),
        
        body('fechaApertura')
            .notEmpty().withMessage('El campo es obligatorio')
            .isISO8601().withMessage('Debe ser una fecha válida en formato YYYY-MM-DD'),
        
        body('fechaCierre')
            .optional().isISO8601().withMessage('Debe ser una fecha válida en formato YYYY-MM-DD'),
        
        body('saldoInicial')
            .notEmpty().withMessage('El campo es obligatorio')
            .isDecimal({ decimal_digits: '1,2' }).withMessage('Debe ser un número decimal válido con 1-2 decimales')
            .isFloat({ min: 0 }).withMessage('Debe ser mayor o igual a 0'),
        
        body('saldoFinal')
            .optional()
            .isDecimal({ decimal_digits: '1,2' }).withMessage('Debe ser un número decimal válido con 1-2 decimales')
            .isFloat({ min: 0 }).withMessage('Debe ser mayor o igual a 0'),
        
        body('estado')
            .notEmpty().withMessage('El campo es obligatorio')
            .isBoolean().withMessage('Debe ser un valor booleano (true o false)'),
    ];
};

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }

    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({ [err.path]: err.msg }));

    return res.status(422).json({ errors: extractedErrors });
};

module.exports = { cajaValidationRules, validate };
