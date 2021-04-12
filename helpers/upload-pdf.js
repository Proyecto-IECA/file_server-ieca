// Import packs installs
const fs = require('fs');

// Import packs creates
const { queryParams } = require('../database/data-access');


const uploadImg = async (id, path, nameFile) => {


    // Busqueda de la palabra en la BD
    const data = await queryParams("stp_getbyid_postulante(?)", [id_postulante = id]);

    // Verificar que exista algo en 'data'
    if (data[0].length === 0) {
        console.log('No se encontro ninguna coincidencia por id');
        return false;
    }

    // Guardar archivo en el servidor
    await saveFile(path, data[0][0].foto_perfil);

    // Actualizar BD
    const params = [email = data[0][0].email, foto_perfil = nameFile];
    await queryParams("stp_update_cv_postulante(?, ?)", params);
    return true;


}

function saveFile(path, imgOld) {

    const pathOld = `${ path }/${ imgOld }`;

    // Verificar si hay una imagen almacenada
    if (fs.existsSync(pathOld)) /* Borrar la imagen anterior */  fs.unlinkSync(pathOld);

}


// Export methods
module.exports = {
    uploadImg
}
