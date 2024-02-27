const express = require('express' );

const { programacion } = require('../datos/cursos.js' ).infoCursos;

const routerProgramacion = express.Router();

routerProgramacion.use(express.json());

routerProgramacion.get('/', (req, res) => {
    res.json(programacion); // devuelve un String
});

routerProgramacion.get('/:lenguaje/:nivel', (req, res) => {
    const lenguaje = req.params.lenguaje;
    const nivel = req.params.nivel;
    const data = programacion.filter(curso => curso.lenguaje === lenguaje && curso.nivel === nivel );
    if(data.length === 0) {
        return res.status(404).send("No se encontró" + lenguaje);
    }
    res.json(data);
});



routerProgramacion.post('/', (req, res) => {
    const cursoNuevo = req.body;
    //Aquí irían algunas comprobaciones de formato
    programacion.push(cursoNuevo);
    res.json(programacion);
});

routerProgramacion.put('/:id', (req, res) => {
    const cursoActualizado = req.body;
    const id = req.params.id;
    const indice = programacion.findIndex(curso => curso.id == id);
    // Si no lo encuentra, devuelve -1
    if (indice >= 0) {
        programacion[indice] = cursoActualizado;
    }else{
        return res.status(404).send("No se encontró" + id);
    }
    res.json(programacion);
});

// añade una condicion a esta función que maneje el status 204

routerProgramacion.patch('/:id', (req, res) => {
    const infoActualizada = req.body;
    const id = req.params.id;
    const indice = programacion.findIndex(curso => curso.id == id);
    if (indice >= 0) {
        const cursoAModificar = programacion [indice];
        
        Object.assign(cursoAModificar , infoActualizada );
    }else{
        return res.status(404).send("No se encontró" + id);
    }
    res.json(programacion);
});

routerProgramacion.delete('/:id', (req, res) => {
    const id = req.params.id;
    const indice = programacion.findIndex(curso => curso.id == id);
    if (indice >= 0) {
    //Elementos a eliminar desde el índice
        programacion.splice(indice, 1);
    }else{
        return res.status(404).send("No se encontró" + id);
    }
    res.json(programacion);
});
   


module.exports = routerProgramacion;