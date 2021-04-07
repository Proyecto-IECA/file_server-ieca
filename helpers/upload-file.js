// Import packs installs
const fs = require('fs');

// Import packs creates
const { query, queryParams } = require("../database/data-access");




const imgUpload = async(tipo, id, path, nameFile) => {

    let data;
    let pathOld;

    switch (tipo) {
        case 'usuarios':
            // Busqueda de la palabra en la BD
            data = await UsuarioI.findById({ _id: id });
            pathOld = `${ path }/${ data.img }`;
            await saveFile(data, pathOld, nameFile);
            break;

        case 'empresas':
            // Busqueda de la palabra en la BD
            data = await HospitalI.findById({ _id: id });
            pathOld = `${ path }/${ data.img }`;
            await saveFile(data, pathOld, nameFile);
            break;

        case 'cv':
            // Busqueda de la palabra en la BD
            data = await MedicoI.findById({ _id: id });
            pathOld = `${ path }/${ data.img }`;
            await saveFile(data, pathOld, nameFile);
            break;

        default:
            console.log('Tabla no reconocida');
            return false;
    }


}

async function saveFile(data, pathOld, nameFile) {

    // Verificar que exista algo en 'data'
    if (!data) {
        console.log('No se encontro ninguna coincidencia por id');
        return false;
    }

    // Verificar si hay una imagen almacenada
    if (fs.existsSync(pathOld)) {
        // Borrar la imagen anterior
        fs.unlinkSync(pathOld);
    }

    data.img = nameFile;
    // await data.save();
    return true;

}



module.exports = {
    imgUpload
}