// Se implementan las dependencias necesarias
const jwt = require("jsonwebtoken");
const { queryParams } = require('../database/data-access');



// Funcion para validar el token antes de ejecutar las peticiones HTTP
const validJWT = async(req, res, next) => {

    //Se crea una constante que sera igual al token que se manda por el header de la peticion
    const token = req.header("x-token");
    //Se guarda en una constante el email que se envia por el header de la peticion
    const email = req.header("email");

    //Si el token y el email estan vacios
    if (!token & !email) {
        return res.json({
            status: false,
            message: "La peticion no tiene token y tampoco email",
            data: null,
        });
    }

    //Si el token esta vacio
    if (!token) {
        return res.json({
            status: false,
            message: "La peticion no tiene token",
            data: null,
        });
    }

    //Si el email esta vacio
    if (!email) {
        return res.json({
            status: false,
            message: "La peticion no tiene email",
            data: null,
        });
    }

    // Declaración del paramatro para la petición en MySQL
    const mysqlParam = [email];

    const resultQueryP = await queryParams("stp_login_postulante(?)", mysqlParam);
    const resultQueryE = await queryParams("stp_login_empresa(?)", mysqlParam);

    if (!resultQueryP[0][0] && !resultQueryE[0][0]) {
        return res.json({
            status: false,
            message: "No se encontro el usuario",
            data: null,
        });
    }

    try {
        //En una constante se guarda el resultado de validar el token
        const payload = jwt.verify(token, process.env.JWT_SECRET);

        //Si el id del token es diferente del que trae la peticion
        if (email != payload.email) {
            return res.json({
                status: false,
                message: "Token invalido",
                data: null,
            });
        }

        //Se deja pasar la peticion
        next();
    } catch (error) {
        return res.json({
            status: false,
            message: "Token invalido",
            data: null,
        });
    }
};





//Se exporta la funcion para validar el token
module.exports = {
    validJWT
};
