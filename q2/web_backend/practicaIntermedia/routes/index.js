const express = require("express")
const fs = require("fs")
const router = express.Router()

// Lee los archivos de la carpeta routes y los "añade" al router

const removeExtension = (fileName) => {
    //Solo la primera parte del split (lo de antes del punto)
    return fileName.split('.').shift()
}

fs.readdirSync(__dirname).filter((file) => {
    const name = removeExtension(file) // index, users, storage, tracks
    if(name !== 'index') {
        router.use('/' + name, require('./'+name)) // http://localhost:3000/api/comercios
    }
})
module.exports = router