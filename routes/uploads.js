/*
* Ruta: api/upload
* */
// Paquetes
const { Router } = require('express');
const expressFileUpload = require('express-fileupload');

// Validators
// const { validJWT } = require("../middlewares/valid-jwt");

// Import Controllers
// const {  } = require('../controllers/usuarios');
// const {  } = require('../controllers/empresas');
// const {  } = require('../controllers/curriculums');
const { uploadFile, getFile } = require('../controllers/uploads');


const router = Router();

// Middleware
router.use(expressFileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));


// Controllers
router.put('/:tipo/:id', uploadFile);

router.get('/:tipo/:img', getFile);
/*router.put('/:tipo/:id', validJWT, uploadFile);

router.get('/:tipo/:img', validJWT, getFile);*/





// Export routs
module.exports = router;