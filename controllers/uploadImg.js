// Import packs installs
const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');

// Import packs creates
const { uploadImg } = require('../helpers/upload-img');


// Methods
const putImg = async (req, res = response) => {

    // Catch 'tipo' y 'id' de params (URL)
    const tipo = req.params.tipo;
    const id = req.params.id;


    // Validar el tipo
    const tipoValid = ['postulantes', 'empresas'];
    if (!tipoValid.includes(tipo)) {
        return res.json({
            status: false,
            msg: 'Tipo no reconocido'
        });
    }


    // Validar archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.json({
            status: false,
            msg: 'Archivo vacio'
        });
    }


    // Procesar la imagen
    const file = req.files.img;


    // Obtener extensión del archivo
    const extraerNombre = file.name.split('.');
    const extensionArchivo = extraerNombre[extraerNombre.length - 1];


    // Validar extensión
    const extensionsValids = ['png', 'jpg', 'jpeg', 'gif'];
    if (!extensionsValids.includes(extensionArchivo)) {
        return res.json({
            status: false,
            msg: 'Tipo de archivo no permitido'
        });
    }


    // Generar el nombre del archivo
    const nameFile = `${uuidv4()}.${extensionArchivo}`;


    // Path para guardar la imagen
    const path = `./uploads/${tipo}`;


    // Actualizar la BD
    const imgSave = await uploadImg(tipo, id, path, nameFile);
    if (!imgSave) {
        return res.status(500).json({
            status: false,
            msg: 'Error al guardar la imagen'
        });
    }


    // Mover la imagen
    await file.mv(`${path}/${nameFile}`, (err) => {

        if (err) {
            console.log(err);
            return res.status(500).json({
                status: false,
                msg: 'Error al mover la imagen'
            });
        }


        // Mensaje tipo JSON
        res.json({
            status: true,
            msg: 'Archivo subido',
            data: nameFile
        });

    });

};





// Export methods
module.exports = {
    putImg
};


