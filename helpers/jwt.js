//Se implementan las dependencias necesarias
const jwt = require("jsonwebtoken");





//Funcion para obtener el email del token
const getEmail = (token) => {
    //Validamos el token y obtenemos su payload
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    //Guardamos en una constante el id
    const email = payload.email;
    //Lo retornamos
    return email;
};





//Exportamos las funciones
module.exports = {
    getEmail,
};