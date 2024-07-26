'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3700;
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/portafolio', { useNewUrlParser: true, useUnifiedTopology: true })
		.then(()	=>	{
			console.log("Conectado con la base de datos con exito...");
			// Creación del servidor 
			app.listen(port, ()=> {	
				console.log(`Servidor corriendo correctamente en la url: localhost:${port}`);
			});
		})
		.catch(error => {
			console.error("Error al conectar con la base de datos: ", error);
		});