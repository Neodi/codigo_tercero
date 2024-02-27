const express = require('express' );

const { matematicas } = require('../datos/cursos.js' ).infoCursos;

const routerMatematicas = express.Router();

routerMatematicas.use(express.json());

routerMatematicas.get('/', (req, res) => {
    //res.send(infoCursos.programacion); //devuelve un objeto de JS
    res.json(matematicas); // devuelve un String
});

routerMatematicas.get('/:tema', (req, res) => {
    const tema = req.params.tema;
    const data = matematicas.filter(curso => curso.tema === tema);
    if(data.length === 0) {
        return res.status(404).send("No se encontró" + tema);
    }
    res.json(data);
});

routerMatematicas.post('/', (req, res) => {
    const cursoNuevo = req.body;
    matematicas.push(cursoNuevo);
    res.json(matematicas);
});


module.exports = routerMatematicas;