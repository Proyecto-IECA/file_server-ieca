// Import packs installs
const fs = require('fs');

// Import packs creates
const { queryParams } = require('../database/data-access');




const uploadImg = async(tipo, id, path, nameFile) => {

    let data;
    let params;

    switch (tipo) {
        case 'postulantes':

            // Busqueda de la palabra en la BD
            data = await queryParams("stp_getbyid_postulante(?)", [ id_postulante = id ]);

            // Verificar que exista algo en 'data'
            if (data[0].length === 0) {
                console.log('No se encontro ninguna coincidencia por id');
                return false;
            }

            // Guardar archivo en el servidor
            await saveFile(path, data[0][0].foto_perfil);

            // Actualizar BD
            params = [ email = data[0][0].email, foto_perfil = nameFile ];
            await queryParams("stp_update_foto_postulante(?, ?)", params);
            return true;

            break;

        case 'empresas':

            // Busqueda de la id de la empresa en la BD
            data = await queryParams("stp_getbyid_empresa(?)", [ id_empresa = id ]);

            // Verificar que exista algo en 'data'
            if (data[0].length === 0) {
                console.log('No se encontro ninguna coincidencia por id');
                return false;
            }

            // Guardar archivo en el servidor
            await saveFile(path, data[0][0].foto_empresa);

            // Actualizar BD
            params = [ email = data[0][0].email, foto_empresa = nameFile ];
            await queryParams("stp_update_foto_empresa(?, ?)", params);
            return true;

            break;

        default:
            console.log('Tabla no reconocida');
            return false;
    }

}

function saveFile(path, imgOld) {

    const pathOld = `${ path }/${ imgOld }`;

    // Verificar si hay una imagen almacenada
    if (fs.existsSync(pathOld)) {
        // Borrar la imagen anterior
        fs.unlinkSync(pathOld);
    }

}



module.exports = {
    uploadImg
}
