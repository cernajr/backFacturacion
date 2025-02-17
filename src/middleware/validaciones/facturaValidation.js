const {
    body,
    validationResult
} = require('express-validator');

const facturaValidationRules = () => {
    return [
        body('clienteId')
            .notEmpty().withMessage("El campo clienteId es obligatorio")
            .isInt().withMessage('El clienteId debe ser un número entero'),
        body('usuarioId')
            .notEmpty().withMessage("El campo usuarioId es obligatorio")
            .isInt().withMessage('El usuarioId debe ser un número entero'),
        body('ventaId')
            .notEmpty().withMessage("El campo ventaId es obligatorio")
            .isInt().withMessage('El ventaId debe ser un número entero'),
        body('fechaEmision')
            .notEmpty().withMessage("El campo fechaEmision es obligatorio")
            .isISO8601().withMessage('La fechaEmision debe ser una fecha válida'),
        body('fechaVencimiento')
            .notEmpty().withMessage("El campo fechaVencimiento es obligatorio")
            .isISO8601().withMessage('La fechaVencimiento debe ser una fecha válida'),
        body('tipoFactura')
            .notEmpty().withMessage("El campo tipoFactura es obligatorio")
            .isString().withMessage('El tipoFactura debe ser texto')
            .isLength({ max: 50 }).withMessage('El tipoFactura debe tener menos de 50 caracteres'),
        body('metodoPago')
            .notEmpty().withMessage("El campo metodoPago es obligatorio")
            .isString().withMessage('El metodoPago debe ser texto')
            .isLength({ max: 50 }).withMessage('El metodoPago debe tener menos de 50 caracteres'),
        body('total')
            .notEmpty().withMessage("El campo total es obligatorio")
            .isDecimal({ decimal_digits: '1,2' }).withMessage('El total debe ser un número decimal válido con 1-2 decimales')
            .isFloat({ min: 0 }).withMessage('El total debe ser mayor o igual a 0'),
        body('totalExtento')
            .notEmpty().withMessage("El campo totalExtento es obligatorio")
            .isDecimal({ decimal_digits: '1,2' }).withMessage('El totalExtento debe ser un número decimal válido con 1-2 decimales')
            .isFloat({ min: 0 }).withMessage('El totalExtento debe ser mayor o igual a 0'),
        body('totalIsv')
            .notEmpty().withMessage("El campo totalIsv es obligatorio")
            .isDecimal({ decimal_digits: '1,2' }).withMessage('El totalIsv debe ser un número decimal válido con 1-2 decimales')
            .isFloat({ min: 0 }).withMessage('El totalIsv debe ser mayor o igual a 0'),
        body('numFacturaSAR')
            .notEmpty().withMessage("El campo numFacturaSAR es obligatorio")
            .isString().withMessage('El numFacturaSAR debe ser texto')
            .isLength({ max: 50 }).withMessage('El numFacturaSAR debe tener menos de 50 caracteres'),
        body('cai')
            .notEmpty().withMessage("El campo CAI es obligatorio")
            .isString().withMessage('El CAI debe ser texto')
            .isLength({ max: 50 }).withMessage('El CAI debe tener menos de 50 caracteres'),
        body('estado')
            .notEmpty().withMessage("El campo estado es obligatorio")
            .isBoolean().withMessage('El estado debe ser un valor booleano')
    ];
}

const validate = (req, res, next) => {
    const errors = validationResult(req)
    console.log('errors', errors);
    if (errors.isEmpty()) {
        return next()
    }

    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({ [err.path]: err.msg }))

    return res.status(422).json({
        errors: extractedErrors,
    })
}

module.exports = {
    facturaValidationRules,
    validate,
}