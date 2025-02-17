const {
    body,
    validationResult
} = require('express-validator');

const detalleFacturaValidationRules = () => {
    return [
        body('facturaId')
            .notEmpty().withMessage("El campo facturaId es obligatorio")
            .isInt().withMessage('El facturaId debe ser un número entero'),
        body('productoId')
            .notEmpty().withMessage("El campo productoId es obligatorio")
            .isInt().withMessage('El productoId debe ser un número entero'),
        body('cantidad')
            .notEmpty().withMessage("El campo cantidad es obligatorio")
            .isInt({ min: 1 }).withMessage('La cantidad debe ser un número entero mayor a 0'),
        body('precioUnitario')
            .notEmpty().withMessage("El campo precioUnitario es obligatorio")
            .isDecimal({ decimal_digits: '1,2' }).withMessage('El precioUnitario debe ser un número decimal válido con 1-2 decimales')
            .isFloat({ min: 0 }).withMessage('El precioUnitario debe ser mayor o igual a 0'),
        body('subtotal')
            .notEmpty().withMessage("El campo subtotal es obligatorio")
            .isDecimal({ decimal_digits: '1,2' }).withMessage('El subtotal debe ser un número decimal válido con 1-2 decimales')
            .isFloat({ min: 0 }).withMessage('El subtotal debe ser mayor o igual a 0')
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
    detalleFacturaValidationRules,
    validate,
}