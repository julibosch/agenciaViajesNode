import { Testimonial } from '../models/Testimonial.js';

const guardarTestimonial = async (req, res) => {

    // Validar datos del formulario
    const {nombre, email, mensaje} = req.body;
    
    const errores = [];

    if(nombre.trim() === '') {
        errores.push({mensaje : 'El nombre esta vacio'});
    }

    if(email.trim() === '') {
        errores.push({mensaje : 'El correo esta vacio'});
    }

    if(mensaje.trim() === '') {
        errores.push({mensaje : 'El mensaje esta vacio'});
    }

    if(errores.length > 0) {

        try {
            const testimoniales = await Testimonial.findAll();

            res.render('testimoniales', {
                pagina: 'Testimoniales',
                errores,
                nombre,
                email,
                mensaje,
                testimoniales
            })
        } catch (error) {
            console.log(error);
        }
    } else {
        //Almacenar testimonial en base de datos
        
        try {
            await Testimonial.create({
                nombre,
                email,
                mensaje
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export {guardarTestimonial};