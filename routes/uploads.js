/*
* Ruta: api/upload
* */
// Paquetes
const { Router } = require('express');
const expressFileUpload = require('express-fileupload');

// Validators
const { validJWT } = require('../middlewares/valid-jwt');

// Import Controllers
const { putImg } = require('../controllers/uploadImg');
const { putPDF } = require('../controllers/uploadPDF');
const { putFile } = require('../controllers/uploadFiles');
const { getFiles } = require('../controllers/get-files');


const router = Router();

// Middleware
router.use(expressFileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));


// Controllers
router.put('/img/:tipo/:id', validJWT, putImg); // * Listo

router.put('/cv/:id', validJWT, putPDF); // ! Probar : Sin proceso almacenado

router.put('/file/:id', validJWT, putFile); // * Listo

router.get('/files/:tipo/:file', validJWT, getFiles); // ? Probar





// Export routs
module.exports = router;
