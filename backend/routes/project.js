'use strict'

var express = require('express');
var ProjectController = require('../controllers/project');
var router = express.Router();



// MULTER
var multer = require('multer');

var storage = multer.diskStorage({
    destination: (req, file, cb) => { // marco el destino de las fotos
      cb(null, './uploads')
    },
    filename: (req, file, cb) => { // como van a ser los nombres de las fotos
      cb(null, Date.now()+ '-' + file.originalname )
    }
});
var upload = multer({storage: storage});

// Rutas
router.get('/home', ProjectController.home);
router.get('/test', ProjectController.test);
router.post('/save-project', ProjectController.saveProject);
router.get('/project/:id?', ProjectController.getProject);
router.get('/projects', ProjectController.getProjects);
router.put('/update-project/:id', ProjectController.updateProject);
router.delete('/project/:id', ProjectController.deleteProject);
router.post('/upload-image/:id', upload.single('image'), ProjectController.uploadImage);
router.get('/get-image/:image', ProjectController.getImageFile);

module.exports = router;