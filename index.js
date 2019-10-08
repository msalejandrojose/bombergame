//2- Devolver la cadena indicada en la url con
//este formato /hola/juanito

var fs=require("fs");
var config=JSON.parse(fs.readFileSync("config.json"));
var host=config.host;
var port=config.port;
var exp=require("express");
var app=exp(); 
var modelo=require("./servidor/modelo.js");

var juego = new modelo.Juego();

//app.use(app.router);
app.use(exp.static(__dirname + "/cliente"));

app.get("/",function(request,response){
	response.send("hola");
});
app.get("/hola/:text",function(request,response){
	response.send("Hola "+request.params.text);
});
app.get("/agregarUsuario/:nick",function(request,response){
	var nick=request.params.nick;
	juego.agregarUsuario(nick,function(usr){
		response.send(usr);
	});
});

app.get("/crearPartida/:nombrePartida/:nick",function(request,response){
	var nombre=request.params.nombrePartida;
	var nick=request.params.nick;
	juego.crearPartida(nombre,nick,function(partida){
		response.send(partida);
	});
});

app.get("/obtenerPartidas",function(request,response){
	juego.obtenerPartidas(function(partidas){
		response.send(partidas);
	});
});

app.get("/obtenerUsuarios",function(request,response){
	juego.obtenerUsuarios(function(usuarios){
		response.send(usuarios);
	});
});

app.get("/unirAPartida/:nombrePartida/:nick",function(request,response){
	var nombre=request.params.nombrePartida;
	var nick=request.params.nick;
	juego.unirAPartida(nombre,nick,function(partida){
		response.send(partida);
	});
});

app.get("/obtenerJugadores/:nombrePartida",function(request,response){
	var nombre=request.params.nombrePartida;
	var partida = juego.obtenerPartida(nombre);
	partida.obtenerJugadores(function(jugadores){
		response.send(jugadores);
	});
});

console.log("Servidor escuchando en "+host+":"+port);
app.listen(port,host);
