const express = require("express")
const cors = require("cors")
require('dotenv').config(); //Lee el archivo .env con todas las variables privadas

const app = express() //Inicializamos la app de express

//Le decimos a la app de express() que use cors para evitar el error Cross-Domain (XD)
app.use(cors())
app.use(express.json()) //Le decimos a la app de express() que use JSON para enviar y recibir datos
app.use("/api", require("./routes")) //Lee routes/index.js por defecto
// app.use(express.static("storage"))

const port = process.env.PORT || 3000 

// Hace que la app de express() escuche en el puerto de .env o en el puerto 3000 por defecto
app.listen(port, () => {
    console.log("Servidor escuchando en el puerto " + port)
})

// Conexión a la base de datos
const dbConnect = require('./config/mongo')

dbConnect()