const {
    body,
    validationResult
} = require('express-validator');

const empresaValidationRules = () => {
    return [
        body('nombre').notEmpty().withMessage("El campo es obligatorio").isString().isLength({
            max: 255
        }).withMessage('Debe tener menos de 255 caracteres'), 
        body('correo').isEmail().withMessage('El correo debe ser válido'),
        body('rtn').notEmpty().withMessage("El campo es obligatorio").isString().isLength({
            max: 255
        }).withMessage('Debe tener menos de 255 caracteres'),
        body('direccion').notEmpty().withMessage("El campo es obligatorio").isString().isLength({
            max: 255
        }).withMessage('Debe tener menos de 255 caracteres'),
        body('telefono').notEmpty().withMessage("El campo es obligatorio").isString().isLength({
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
    empresaValidationRules, validate,
}