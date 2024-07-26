'use strict'

var Project = require('../models/project');
var fs = require('fs');
var path = require('path');

var controller = {
	home: function(req, res){
		return res.status(200).send({
			message: 'Home funcionando correctamente.'
		});
	},
	test: function(req, res){
		return res.status(200).send({
			message: "Test funcionando correctamente."
		});
	},
	saveProject: function(req, res){
		var project = new Project();
		var params = req.body;
		project.name = params.name;
		project.description = params.description;
		project.category = params.category;
		project.year = params.year;
		project.langs = params.langs;
		project.image = null;
		
		project.save((err, projectStored)	=>	{
			if(err) return res.status(500).send({message: 'error al guardar'});
			if(!projectStored) return res.status(404).send({message: 'No se a podido guardar'});
			return res.status(200).send({
				project: projectStored,
				message:'Metodo save Project funcionando'
			});
		});
		
	},
	getProject: function(req, res){
		var projectId = req.params.id;
		if(projectId == null) return res.status(404).send({message: 'Falta el id del proyecto'});

		Project.findById(projectId, (err, project) =>{
			if(err) return res.status(500).send({message: 'Error al devolver los datos.'});
			if(!project) return res.status(404).send({message: 'El proyecto no existe'});
			return res.status(200).send({
				project
			});
		});
	},
	getProjects: function(req, res){
		Project.find({}).exec((err, projects)=>{
			if(err) return res.status(500).send({message: 'Error al devolver los datos'});
			if(!projects) return res.status(404).send({message: 'No hay proyectos para mostrar'});
			return res.status(200).send({projects});
		});
	},
	updateProject: function(req, res){
		var projectId = req.params.id;
		var update = req.body;
		Project.findByIdAndUpdate(projectId, update, {new:true}, (err, projectUpdate) =>{
			if(err) return res.status(500).send({message: 'Error al actualizar'});
			if(!projectUpdate) return res.status(404).send({message: 'No existe el proyecto para actualizar'});
			return res.status(200).send({
				project: projectUpdate
			});
		});
	},
	deleteProject: function(req, res){
		var projectId = req.params.id;
		Project.findByIdAndDelete(projectId,(err, projectRemove)=>{
			if(err) return res.status(500).send({message: 'No se ha podido borrar el proyecto'});
			if(!projectRemove) return res.status(404).send({message: 'No se encontro el proyecto a eliminar'});
			return res.status(200).send({
				project: projectRemove
			});
		});
	},
	uploadImage: function(req, res){
		var projectId = req.params.id;
		var fileName = 'Imagen no subida..';
		
		console.log(req.file);
		if(req.file){
			var filePath = req.file.path;
			fileName = req.file.filename;
			var fileSplit = req.file.mimetype.split('/');
			var fileExt = fileSplit[1];
			

			if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg'){
				Project.findByIdAndUpdate(projectId, {image: fileName}, {new:true, useFindAndModify: false}, (err, projectUpdate) => {
					if(err) return res.status(500).send({message: 'La imagen no se ha subido'});
					if(!projectUpdate) return res.status(404).send({message: 'El proyecto no existe.'});
					return res.status(200).send({
						project: projectUpdate
					});
				});
			}else{
				fs.unlink(filePath, (err) => {
					return res.status(200).send({message: 'El formato de imagen no es valida'});
				});
			}
		}else{
			return res.status(500).send({fileName});
		}

	},
	getImageFile: function(req, res){
		var file = req.params.image;

		
		var path_file = './uploads/'+file;
		fs.exists(path_file, (exists) => {
			console.log(path_file);
			if(exists){
				return res.sendfile(path.resolve(path_file));
			}else{
				return res.status(200).send({message: "No existe la imagen"});
			}
		});
	}

};
module.exports = controller;