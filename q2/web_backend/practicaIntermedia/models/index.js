// Se guardan los todos los modelos en un objeto y se exporta para que sea mas
// facil de importar en otros archivos y en el futuro cambiar entre SQL y NoSQL
const models = {
    comercioModel: require('./nosql/comercio'),
}
module.exports = models