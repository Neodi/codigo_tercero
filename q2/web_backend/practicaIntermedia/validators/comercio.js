

const { check } = require("express-validator")
const validateResults = require("../utils/handleValidator")


const validatorCreateItem = [
    check("nombreComercio").exists().notEmpty(),    // Valida que el campo nombreComercio exista y no esté vacío   
    check("cif").exists().notEmpty(),               // Valida que el campo cif exista y no esté vacío
    check("direccion").exists().notEmpty(),         // Valida que el campo dirección exista y no esté vacío
    check("correoElectronico").exists().notEmpty(), // Valida que el campo correoElectronico exista y no esté vacío
    check("telefonoContacto").exists().notEmpty(),  // Valida que el campo telefonoContacto exista y no esté vacío

    check("idPagina").exists().notEmpty().isInt(),  // Valida que el campo idPagina exista, no esté vacío y sea un número entero

    (req, res, next) => validateResults(req, res, next)
]

// Valida que el campo id sea un id de mongo 
const validatorGetItem = [
    check("id").exists().notEmpty().isMongoId(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

// Valida que el campo cif exista y no esté vacío
const validatorGetItemCif = [
    check("cif").exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]


module.exports = { validatorCreateItem, validatorGetItem, validatorGetItemCif }  