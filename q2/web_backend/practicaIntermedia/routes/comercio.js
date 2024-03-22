const express = require("express")
const router = express.Router()

// Importa los controladores y validadores para comercio
const { getItems, getItemCif, getItemsAsc, createItem, updateItem, deleteItemFisico, deleteItemLogico } = require("../controllers/comercio")
const { validatorCreateItem, validatorGetItemCif  } = require("../validators/comercio")

// Creamos las rutas para comercio

// Se llama a los validator ANTES del controllador
// Si los validadores no dan error, se llama al controlador
// Si los validadores dan error, se devuelve un error 

router.get("/", getItems)                                                           // http://localhost:3000/api/comercios
router.get("/cif/:cif", validatorGetItemCif, getItemCif)                    // GET  // http://localhost:3000/api/comercios/cif/12345678A
router.get("/asc/", getItemsAsc)                                                    // http://localhost:3000/api/comercios/asc                  

router.post("/", validatorCreateItem, createItem)                           // POST // http://localhost:3000/api/comercios    

router.put("/:cif", validatorGetItemCif, validatorCreateItem, updateItem)   // PUT  // http://localhost:3000/api/comercios/12345678A

router.delete("/deleteFisico/:cif", validatorGetItemCif, deleteItemFisico)  // DELETE // http://localhost:3000/api/comercios/deleteFisico/12345678A
router.delete("/deleteLogico/:cif", validatorGetItemCif, deleteItemLogico)  // DELETE // http://localhost:3000/api/comercios/deleteLogico/12345678A

module.exports = router // Exporta el router con las rutas de comercio
