import express from "express";
import router from "./routes/index.js";
import db from "./config/db.js";


const app = express();

//Conectar base de datos
db.authenticate()
    .then( () => console.log("Base de datos conectada"))
    .catch( error => console.log(error));
;

//Habilitar PUG
app.set('view engine', 'pug');

//Obtener el año actual
app.use( (req, res, next) => {
    const year = new Date();

    res.locals.actualYear = year.getFullYear();
    res.locals.nombreSitio = "Agencia de viajes";
    
    next();
})

// Obtener el body parser para leer los datos del formulario
app.use(express.urlencoded({extended: true}));

//Definimos la carpeta publica
app.use(express.static('public'));

//Agregamos el router
app.use('/', router);

//Definimos el puerto
const port = process.env.PORT || 4100;

app.listen(port, () => {
    console.log(`El servidor esta funcionando en el puerto: ${port}`);
});