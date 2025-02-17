const { body, validationResult } = require('express-validator');

const movimientoCajaValidationRules = () => {
    return [
        body('cajaId')
            .notEmpty().withMessage("El campo cajaId es obligatorio")
            .isInt().withMessage('El campo cajaId debe ser un número entero'),
        body('facturaId')
            .notEmpty().withMessage("El campo facturaId es obligatorio")
            .isInt().withMessage('El campo facturaId debe ser un número entero'),
        body('tipoMovimiento')
            .notEmpty().withMessage("El campo tipoMovimiento es obligatorio")
            .isString().withMessage('El campo tipoMovimiento debe ser una cadena de texto')
            .isLength({ max: 50 }).withMessage('El campo tipoMovimiento debe tener menos de 50 caracteres'),
        body('monto')
            .notEmpty().withMessage("El campo monto es obligatorio")
            .isDecimal({ decimal_digits: '1,2' }).withMessage('El campo monto debe ser un número decimal válido con 1-2 decimales')
            .isFloat({ min: 0 }).withMessage('El campo monto debe ser mayor o igual a 0'),
        body('descripcion')
            .notEmpty().withMessage("El campo descripcion es obligatorio")
            .isString().withMessage('El campo descripcion debe ser una cadena de texto')
            .isLength({ max: 255 }).withMessage('El campo descripcion debe tener menos de 255 caracteres'),
        body('fechaMovimiento')
            .notEmpty().withMessage("El campo fechaMovimiento es obligatorio")
            .isISO8601().withMessage('El campo fechaMovimiento debe ser una fecha válida en formato ISO8601 (YYYY-MM-DD)'),
        body('estado')
            .notEmpty().withMessage("El campo estado es obligatorio")
            .isBoolean().withMessage('El campo estado debe ser un valor booleano (true o false)'),
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
    movimientoCajaValidationRules,
    validate,
};