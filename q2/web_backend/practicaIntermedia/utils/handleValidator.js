const { validationResult } = require("express-validator") // Importa la función validationResult

// Si la validación es exitosa, se llama a next() que en este caso es el controlador
// Si la validación falla, se devuelve un error con los errores encontrados

const validateResults = (req, res, next) => {
    try {
        validationResult(req).throw()
        return next()
    } catch (err) {
        res.status(403)
        res.send({ errors: err.array() })
    }
}
module.exports = validateResults