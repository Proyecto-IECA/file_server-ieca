// Import packs installs
const { response } = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// Import packs creates
const { uploadFile } = require('../helpers/upload-file');


// Methods
const putFile = async (req, res = response) => {

    // Catch 'id' de params (URL)
    const id = req.params.id;

    // Validar archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.json({
            status: false,
            msg: 'Archivo vacio'
        });
    }

    // Procesar la imagen
    const file = req.files.file;

    // Obtener extensión del archivo
    const extraerNombre = file.name.split('.');
    const extensionArchivo = extraerNombre[extraerNombre.length - 1];


    // Validar extensión
    const extensionsValids = ['png', 'jpg', 'jpeg', 'gif', 'pdf'];
    if (!extensionsValids.includes(extensionArchivo)) {
        return res.json({
            status: false,
            msg: 'Tipo de archivo no permitido'
        });
    }


    // Generar el nombre del archivo
    const nameFile = `${ uuidv4() }.${ extensionArchivo }`;


    // Path para guardar la imagen
    const path = `./uploads/vacantes`;

    // Actualizar la BD
    const fileSave = await uploadFile(id, path, nameFile);
    if (!fileSave) {
        return res.status(500).json({
            status: false,
            msg: 'Error al guardar el archivo en la BD'
        });
    }

    // Mover la imagen
    await file.mv(`${ path }/${ nameFile }`, (err) => {

        // Si algo sale mal al mover el archivo, manda un mensaje
        if (err) {
            console.log(err);
            return res.status(500).json({
                status: false,
                msg: 'Error al mover el archivo'
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
    putFile
};
