const { body, validationResult } = require('express-validator');

const pagoValidationRules = () => {
    return [
        body('facturaId')
            .notEmpty().withMessage("El campo es obligatorio")
            .isInt().withMessage('Debe ser un número entero'),
        body('montoPago')
            .notEmpty().withMessage("El campo es obligatorio")
            .isDecimal({ decimal_digits: '1,2' }).withMessage('Debe ser un número decimal válido con 1-2 decimales')
            .isFloat({ min: 0 }).withMessage('El monto debe ser mayor a 0'),
        body('referenciaPago')
            .optional()
            .isString().withMessage('Debe ser una cadena de texto')
            .isLength({ max: 255 }).withMessage('Debe tener menos de 255 caracteres'),
        body('fechaPago')
            .notEmpty().withMessage("El campo es obligatorio")
            .isISO8601().withMessage('Debe ser una fecha válida en formato ISO 8601'),
        body('metodoPago')
            .notEmpty().withMessage("El campo es obligatorio")
            .isInt().withMessage('Debe ser un número entero'),
        body('estado')
            .notEmpty().withMessage("El campo es obligatorio")
            .isBoolean().withMessage('Debe ser un valor booleano'),
    ];
};

const validate = (req, res, next) => {
    const errors = validationResult(req);
    console.log('errors', errors);
    if (errors.isEmpty()) {
        return next();
    }

    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({ [err.path]: err.msg }));

    return res.status(422).json({
        errors: extractedErrors,
    });
};

module.exports = {
    pagoValidationRules,
    validate,
};
