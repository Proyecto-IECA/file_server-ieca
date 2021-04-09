/*
* Ruta: api/upload
* */
// Paquetes
const { Router } = require('express');
const expressFileUpload = require('express-fileupload');

// Validators
const { validJWT } = require("../middlewares/valid-jwt");

// Import Controllers
const { putImg, getImg } = require('../controllers/uploads');


const router = Router();

// Middleware
router.use(expressFileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));


// Controllers
router.put('/:tipo/:id', validJWT, putImg);

router.get('/:tipo/:img', validJWT, getImg);





// Export routs
module.exports = router;
