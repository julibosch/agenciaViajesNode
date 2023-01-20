import { Viaje } from '../models/Viaje.js';
import { Testimonial } from '../models/Testimonial.js';

const paginaInicio = async (req, res)=> {

    // Consultar 3 viajes a la base de datos

    const promiseDB = [];

    promiseDB.push( Viaje.findAll({ limit:3 }) );
    promiseDB.push( Testimonial.findAll({ limit:3 }) );

    try {
        const resultado = await Promise.all(promiseDB);
    
        res.render("inicio", {
            pagina : "Inicio",
            clase: 'home',
            viajes: resultado[0],
            testimoniales: resultado[1],
            mensaje: 'La opinion de nuestros clientes'
        });
    } catch (error) {
       console.log(error); 
    }
};

const paginaNosotros = (req, res)=> {
    const viajeGER = "Viajes a Alemania";
    const viajeARG = "Viajes en Argentina";
    const viajeUSA = "Viajes a Estados Unidos";

    res.render("nosotros", {
        pagina : "Nosotros",
        viajeARG,
        viajeGER,
        viajeUSA
    });
};

const paginaViajes = async (req, res) => {
    // Consultar DB
    const viajes = await Viaje.findAll();

    res.render("viajes", {
        pagina : "Próximos viajes",
        viajes
    });
};

const paginaTestimoniales = async (req, res) => {

    try {
        const testimoniales = await Testimonial.findAll();
    
        res.render("testimoniales", {
            pagina : "Testimoniales",
            testimoniales,
            mensaje: 'Lee sobre nuestros clientes y sus experiencias!!'
        })
    } catch (error) {
        console.log(error);
    }
};

// Muestra la pagina del viaje por su slug
const paginaDetalleViaje = async (req, res) => {

    const {slug} = req.params;

    try {
        const viaje = await Viaje.findOne({where : {slug}});

        res.render('viaje', {
            pagina: 'Informacion Viaje',
            viaje
        })
    } catch (error) {
        console.log(error);
    }
}

export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    paginaDetalleViaje
}