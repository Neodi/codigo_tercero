const express = require('express' );
const app = express();

//Simulamos una base de datos con el archivo de cursos.js anterior
const { infoCursos } = require('./datos/cursos.js' );

// Loading process.env
require('dotenv' ).config();

/*

// Routing
app.get('/', (req, res) => {
 res.send('Hello World' )
})

const routerProgramacion = express.Router();
app.use('/api/cursos/programacion' , routerProgramacion );

routerProgramacion.get('/', (req, res) => {
    //res.send(infoCursos.programacion); //devuelve un objeto de JS
    res.send(JSON.stringify(infoCursos.programacion)); // devuelve un String
});
app.get('/api/cursos', (req, res) => {
    //res.send(infoCursos.programacion); //devuelve un objeto de JS
    const data = infoCursos.programacion;

    if (req.query.ordenar === 'vistas') {
        //Orden DESC, si lo queremos ASC, sería (a.vistas, b.vistas)
        res.send(JSON.stringify(data.sort((a, b) => b.vistas - a.vistas )));
       } else {
        res.send(JSON.stringify(data));
    }   
});

routerProgramacion.get('/:lenguaje/:nivel', (req, res) => {
    const lenguaje = req.params.lenguaje;
    const nivel = req.params.nivel;
    const data = infoCursos.programacion.filter(curso => curso.lenguaje === lenguaje && curso.nivel === nivel );
    if(data.length === 0) {
        return res.status(404).send("No se encontró" + lenguaje);
    }
    res.send(JSON.stringify(data));
});

const routerMatematicas = express.Router();
app.use('/api/cursos/matematicas' , routerMatematicas );

routerMatematicas.get('/:tema', (req, res) => {
    const tema = req.params.tema;
    const data = infoCursos.matematicas.filter(curso => curso.tema === tema);
    if(data.length === 0) {
        return res.status(404).send("No se encontró" + tema);
    }
    res.send(JSON.stringify(data));
});
    

*/

const routerProgramacion = require('./routers/programacion.js');
app.use('/api/cursos/programacion' , routerProgramacion );


const routerMatematicas = require('./routers/matematicas.js');
app.use('/api/cursos/matematicas' , routerMatematicas );

// Listening
const port = process.env.PORT || 3000;
app.listen(port, () => {
 console.log('Servidor iniciado en el puerto' , port);
});





