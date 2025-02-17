const {
    body,
    validationResult
} = require('express-validator');

const detalleVentaValidationRules = () => {
    return [
        body('ventaId').notEmpty().withMessage("El campo es obligatorio").isInt().withMessage('Debe ser un número entero'),
        body('productoId').notEmpty().withMessage("El campo es obligatorio").isInt().withMessage('Debe ser un número entero'),
        body('cantidad')
        .notEmpty().withMessage("El campo es obligatorio")
        .isDecimal({ decimal_digits: '1,2' }).withMessage('Debe ser un número decimal válido con 1-2 decimales')
        .isFloat({ min: 0 }).withMessage('El precio debe ser mayor a 0'),
        body('descuento')
        .notEmpty().withMessage("El campo es obligatorio")
        .isDecimal({ decimal_digits: '1,2' }).withMessage('Debe ser un número decimal válido con 1-2 decimales')
        .isFloat({ min: 0 }).withMessage('El precio debe ser mayor a 0'),
        body('total')
        .notEmpty().withMessage("El campo es obligatorio")
        .isDecimal({ decimal_digits: '1,2' }).withMessage('Debe ser un número decimal válido con 1-2 decimales')
        .isFloat({ min: 0 }).withMessage('El precio debe ser mayor a 0'),
        body('estado').notEmpty().withMessage("El campo es obligatorio").isBoolean().withMessage('Debe ser un valor boleano'),
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
    detalleVentaValidationRules, validate,
}