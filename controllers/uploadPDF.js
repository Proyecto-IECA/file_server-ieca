// Import packs installs
const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');

// Import packs creates
// const { uploadPDF } = require('../helpers/upload-pdf');


// Methods
const putPDF = async (req, res = response) => {

    // Catch 'tipo' y 'id' de params (URL)
    const tipo = req.params.tipo;
    const id = req.params.id;


    // Validar archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.json({
            status: false,
            msg: 'Archivo vacio'
        });
    }


    // Procesar la imagen
    const file = req.files.pdf;


    // Obtener extensión del archivo
    const extraerNombre = file.name.split('.');
    const extensionArchivo = extraerNombre[extraerNombre.length - 1];


    // Validar extensión
    const extensionsValids = ['pdf'];
    if (!extensionsValids.includes(extensionArchivo)) {
        return res.json({
            status: false,
            msg: 'Tipo de archivo no permitido'
        });
    }


    // Generar el nombre del archivo
    const nameFile = `${uuidv4()}.${extensionArchivo}`;


    // Path para guardar la imagen
    const path = `./uploads/cvs`;


    // Actualizar la BD
    const pdfSave = await uploadPDF(id, path, nameFile);
    if (!pdfSave) {
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
    putPDF
};


