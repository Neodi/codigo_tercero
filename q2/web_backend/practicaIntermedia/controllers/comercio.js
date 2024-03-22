const { comercioModel } = require('../models')

const { matchedData } = require('express-validator')
const { handleHttpError } = require('../utils/handleError') // Importa la función handleHttpError ()

const getItems = async (req, res) => {
    // console.log('Hola desde getItems');
    try{
        const data = await comercioModel.find({})
        res.send(data)
    }catch(error){
        // Si hay un error en la base de datos, se llama a la función handleHttpError
        handleHttpError(res, "ERROR_GET_ITEMS", 403)
    }
    
}

const getItemCif = async (req, res) => {
    // console.log('Hola desde getItemCif ');

    try{
        // matchedData(req) es una función de express-validator que toma req y
        // extrae solo los datos que pasan el validador. En este caso como el validador el
        // es validatorGetItemCif, solo se extrae el cif.
        const {cif} = matchedData(req) 
        // console.log(cif)
        const data = await comercioModel.findOne({cif: cif})
        res.send(data)
    }catch(error){
        handleHttpError(res, "ERROR_GET_ITEM_CIF")
    }
}
    
const getItemsAsc = async (req, res) => {
    // console.log('Hola desde getItemsAsc');
    try {
        // Ordena los resultados por cif de forma ascendente 
        // usando el método sort de mongoose
        let data = await comercioModel.find({}).sort({'cif': 1});
        res.send(data);
    } catch (error) {
        handleHttpError(res, "ERROR_GET_ITEMS_ASC")
    }
}

const createItem = async (req, res) => {
    try{
        // En este caso se extraen todos los datos del body que correspondan con los del modelo
        // a través del validador validatorCreateItem y se guardan en body
        const body  = matchedData(req)
        //console.log(body)
        const data = await comercioModel.create(body)
        res.send(data)
    }catch(error){
        handleHttpError(res, "ERROR_CREATE_ITEM")
    }
    
}


const updateItem = async (req, res) => {
    // console.log('Hola desde updateItem');
    try{
        
        const {cif, ...body} = matchedData(req) // Extrae cif y el resto de los datos del body
        // console.log(cif)
        // console.log(body)
        const data = await comercioModel.findOneAndUpdate({cif: cif}, body, {new: true}) // Encuentra un item por cif y lo actualiza
        res.send(data)
    }catch(error){
        handleHttpError(res, "ERROR_UPDATE_ITEM")
    }
}
const deleteItemFisico = async (req, res) => {
    // console.log('Hola desde deleteItemFisico')
    try{
        const {cif} = matchedData(req)
        const data = await comercioModel.findOneAndDelete({cif: cif}) // Elimina POR COMPLETO de la BBDD un item por cif
        res.send(data)
    }catch(error){
        handleHttpError(res, "ERROR_DELETE_ITEM_FISICO")
    }
}

const deleteItemLogico = async (req, res) => {
    // console.log('Hola desde deleteItemLogico')
    try{
        const {cif} = matchedData(req)
        const data = await comercioModel.delete({cif: cif}) // Elimina LOGICAMENTE un item por cif
                                                            // cambia el campo deleted de false a true
        res.send(data)
    }catch(error){
        handleHttpError(res, "ERROR_DELETE_ITEM_LOGICO")
    }
}

// Exporta las funciones definidas que luego se importarán en el archivo de rutas
module.exports = {
    getItems, 
    getItemCif,
    getItemsAsc,
    createItem, 
    updateItem,
    deleteItemFisico,
    deleteItemLogico };