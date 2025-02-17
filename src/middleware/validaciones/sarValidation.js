const {
    body,
    validationResult
} = require('express-validator');

const sarValidationRules = () => {
    return [
        body('empresaId').notEmpty().withMessage("El campo es obligatorio").isInt().withMessage('Debe ser un número entero'),
        body('cai').notEmpty().withMessage("El campo es obligatorio").isString().isLength({
            max: 255
        }).withMessage('Debe tener menos de 255 caracteres'),
        body('rangoInicial').notEmpty().withMessage("El campo es obligatorio").isString().isLength({
            max: 255
        }).withMessage('Debe tener menos de 255 caracteres'),
        body('rangoFinal').notEmpty().withMessage("El campo es obligatorio").isString().isLength({
            max: 255
        }).withMessage('Debe tener menos de 255 caracteres'),
        body('numActualSar').notEmpty().withMessage("El campo es obligatorio").isString().isLength({
            max: 255
        }).withMessage('Debe tener menos de 255 caracteres'),
        body('fechaAutorizacion')
            .notEmpty().withMessage("El campo es obligatorio")
            .isISO8601().withMessage('Debe ser una fecha válida en formato YYYY-MM-DD')
            .custom((value) => {
                if (!value.match(/^\d{4}-\d{2}-\d{2}$/)) {
                    throw new Error('Formato de fecha inválido');
                }
                return true;
        }),
        body('fechaVencimiento')
            .notEmpty().withMessage("El campo es obligatorio")
            .isISO8601().withMessage('Debe ser una fecha válida en formato YYYY-MM-DD')
            .custom((value) => {
                if (!value.match(/^\d{4}-\d{2}-\d{2}$/)) {
                    throw new Error('Formato de fecha inválido');
                }
                return true;
        }),
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
    sarValidationRules, validate,
}