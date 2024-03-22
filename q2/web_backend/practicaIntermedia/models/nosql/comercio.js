const mongoose = require("mongoose");
const mngooseDelete = require("mongoose-delete");

// type dice el tipo de dato que es, required dice si es obligatorio o no, unique dice si es único o no

const ComercioScheme = new mongoose.Schema(
    {
        nombreComercio: {
            type: String,
            required: true
        },
        cif: {
            type: String,
            required: true,
            unique: true
        },
        direccion: {
            type: String,
            required: true
        },
        correoElectronico: {
            type: String,
            required: true,
            unique: true
            
        },
        telefonoContacto: {
            type: String,
            required: true
        },
        idPagina: {
            type: Number,
            required: true,
            unique: true
        }
    },
    {
        timestamps: true, // Genera automáticamente createdAt y updatedAt
        versionKey: false
    }
);


ComercioScheme.plugin(mngooseDelete, {overrideMethods: "all" }); // Añade a la colección ComercioScheme el plugin mngooseDelete
module.exports = mongoose.model("comercio", ComercioScheme); // Exporta el modelo de comercio con el nombre de comercio a partir de ComercioScheme


