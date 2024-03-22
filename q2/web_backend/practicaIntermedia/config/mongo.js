const mongoose = require('mongoose')

//Función para conectar a la base de datos
const dbConnect = () => {
    const db_uri = process.env.DB_URI //Obtenemos la URI de la base de datos 
    mongoose.set('strictQuery', false)
    try{
        mongoose.connect(db_uri)
    }catch(error){
        console.err("Error conectando a la BD:", error)
    }
    //Listen events
    mongoose.connection.on("connected",() => console.log("Conectado a la BD")) // Cuando se conecta a la BD lo muestra por consola
}
module.exports = dbConnect