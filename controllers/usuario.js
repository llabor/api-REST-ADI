var Usuario = require('../models/usuario');
var mongodb = require('mongodb');
var ObjectID = mongodb.ObjectID;


//METODO GET devuelve todos los usuarios
exports.list = function(pet, res) {
	Usuario.find(function(err, usuario) {
		res.json(usuario);
	});
};


//METODO GET buscar un usuario por login 
exports.findByLogin = function(pet, res) {
	Usuario.findOne({login: pet.params.login}, function(err, usuario){
		if(usuario == undefined){
			res.status(404);
			res.send("Usuario no existente.");
		} else  {
			res.status(200);
			res.json(usuario);
		}	
	})
}

//METODO POST crear un nuevo usuario 
exports.create = function(pet, res) {
	var usuario = new Usuario(pet.body);

	f(newUsuario.login == undefined || newUsuario.nombre == undefined 
	|| newUsuario.apellidos == undefined || newUsuario.email == undefined){
		res.status(400);
		res.send("Faltan campos para poder crear el usuario.");
	} 
	else {	
		usuario.save(function(err, newUsuario) {
			if(err){
				res.status(400);
				res.send("No se puede crear el usuario, algun campo es incorrecto");
			} else {
				res.status(201);
	        	res.header('Location','http://localhost:3000/api/usuarios/'+ newUsuario.login);
				res.send(newUsuario);
			}
		});
	}
}


//METODO DELETE borra un usuario 
exports.deleteByLogin = function (pet, res) {
	Usuario.findOne({login: pet.params.login}, function(err, usuario){
		if(usuario == undefined){
			res.status(404);
			res.send("Usuario no existente.");	
		} else {
			usuario.remove(function(err){
				if (!err) {
					res.status(204);
					res.end();
				} else {
					res.status(500);
					console.log("No se ha podido borrar: "+err);
				}
			});
		}
	});
}

//METODO PUT actualiza los datos de un usuario
exports.updateByLogin = function (pet,res) {
	var newUsuario = new Usuario(pet.body);

	if(newUsuario.login == undefined || newUsuario.nombre == undefined 
	|| newUsuario.apellidos == undefined || newUsuario.email == undefined){
		res.status(400);
		res.send("Faltan campos para poder editar el usuario.");
	} 
	else {
		Usuario.findOne({login: pet.params.login}, function(err, usuario){
			if(usuario == undefined){
				res.status(404);
				res.send("El usuario a modificar no existe.");
			} else {
				usuario.nombre = newUsuario.nombre;
				usuario.apellidos = newUsuario.apellidos;
				usuario.email = newUsuario.email;
				usuario.login = newUsuario.login;
				Usuario.update({_id: usuario._id}, usuario, function(err) {
					if(err) {
						console.log(err);
						res.status(500);
						res.end();
					} else {
						res.status(204);
						res.send(usuario);
						res.end();
					}
				});
			}
		});
	}
}





