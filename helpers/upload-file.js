// Import packs installs
const fs = require('fs');

// Import packs creates
const { queryParams } = require('../database/data-access');


const uploadFile = async (id, path, nameFile) => {


    // Busqueda de la id de la empresa en la BD
    const data = await queryParams("stp_getbyid_vacante(?)", [id_vacante = id]);

    // Verificar que exista algo en 'data'
    if (data[0].length === 0) {
        console.log('No se encontro ninguna coincidencia por id');
        return false;
    }

    // Guardar archivo en el servidor
    await saveFile(path, data[0][0].imagen);

    // Actualizar BD
    const params = [data, imagen = nameFile];
    await queryParams("stp_update_foto_vacante(?, ?)", params);

    //! Cerrar la conexión a la BD


    return true;


}

function saveFile(path, fileOld) {

    const pathOld = `${ path }/${ fileOld }`;

    // Verificar si hay una imagen almacenada
    if (fs.existsSync(pathOld)) {
        // Borrar la imagen anterior
        fs.unlinkSync(pathOld);
    }

}


// Export methods
module.exports = {
    uploadFile
}
