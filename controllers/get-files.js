// Import packs installs
const { response } = require('express');
const path = require('path');
const fs = require('fs');


const getFiles = async (req, res = response) => {

    // Catch 'tipo' y 'id' de params (URL)
    const tipo = req.params.tipo;
    const file = req.params.file;


    // Get path de la imagen
    let pathFile = path.join(__dirname, `../uploads/${ tipo }/${ file }`);
    console.log(fs.existsSync(pathFile));

    // Validar que el nombre coincida
    if (fs.existsSync(pathFile)) /* Mandar archivo */console.log(fs.existsSync(pathFile)), res.sendFile(pathFile);


    /*
    * Valida el tipo con una condicional agrupada [(empresas y postulantes), (cvs y vacantes)] para regresar algo por default
    * */
    // Send File default
    pathFile = path.join(__dirname, '../assets/img/no-image.png');
    if (tipo === 'postulantes' || 'empresas') return  res.sendFile(pathFile);

    // Send File default
    pathFile = path.join(__dirname, '../assets/img/error404.jpg');
    (tipo === 'cvs' || 'vacantes') ? res.sendFile(pathFile) : console.log('Tipo no conocido');

};


// Export methods
module.exports = {
    getFiles
}

