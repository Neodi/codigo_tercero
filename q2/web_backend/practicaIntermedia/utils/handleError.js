// Crea una respuesta de error genérica para los controladores

const handleHttpError = (res, message, code = 403) => {
    res.status(code).send(message)
}
module.exports = { handleHttpError }