const {
    body,
    validationResult
} = require('express-validator');

const productoValidationRules = () => {
    return [
        body('proveedorId').notEmpty().withMessage("El campo es obligatorio").isInt().withMessage('Debe ser un número entero'),
        body('empresaId').notEmpty().withMessage("El campo es obligatorio").isInt().withMessage('Debe ser un número entero'),
        body('unidadId').notEmpty().withMessage("El campo es obligatorio").isInt().withMessage('Debe ser un número entero'),
        body('categoriaId').notEmpty().withMessage("El campo es obligatorio").isInt().withMessage('Debe ser un número entero'),
        body('nombre').notEmpty().withMessage("El campo es obligatorio").isString().isLength({
            max: 255
        }).withMessage('Debe tener menos de 255 caracteres'),
        body('descripcion').notEmpty().withMessage("El campo es obligatorio").isString().isLength({
            max: 255
        }).withMessage('Debe tener menos de 255 caracteres'),
        body('precio')
            .notEmpty().withMessage("El campo es obligatorio")
            .isDecimal({ decimal_digits: '1,2' }).withMessage('Debe ser un número decimal válido con 1-2 decimales')
            .isFloat({ min: 0 }).withMessage('El precio debe ser mayor a 0'),
        body('codigoProducto').notEmpty().withMessage("El campo es obligatorio").isString().isLength({
            max: 255
        }).withMessage('Debe tener menos de 255 caracteres'),
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
    productoValidationRules, validate,
}