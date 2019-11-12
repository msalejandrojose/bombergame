
function Juego(){
	this.partidas={};
	this.usuarios={};

	this.crearPartida=function(nombre,nick,callback){
		var idp=nombre+nick;
		var partida;
		if (!this.partidas[idp]){
			partida=new Partida(nombre,idp);
			partida.agregarJugador(this.usuarios[nick]);
			//partida.jugadores[nick]=this.usuarios[nick];
			this.partidas[idp]=partida;
		}
		else{
			partida=this.partidas[idp];
		}
		callback(partida);
	}
	this.agregarUsuario=function(nombre,callback){
		if (!this.usuarios[nombre]){
			console.log("Nuevo usuario: "+nombre);
			this.usuarios[nombre]=new Usuario(nombre);
			callback(this.usuarios[nombre]);
		}
		else{
			callback({nick:""});
		}
	}
	this.obtenerUsuario=function(nick,callback){
		if (this.usuarios[nick]){
			callback(this.usuarios[nick]);
		}
		else{
			callback({nick:""});
		}
	}
	this.obtenerUsuarios=function(callback){
		callback(this.usuarios);
	}
	this.obtenerPartidas=function(callback){
		callback(this.partidas);
	}
	this.obtenerPartidasInicial=function(callback){
		partidas={};
		for (var key in this.partidas){
		  if (this.partidas[key].fase.nombre=="inicial"){
		    partidas[key]=this.partidas[key];
			}
		}
		callback(partidas);
	}
	this.unirAPartida=function(nombre,nick){
		var partida={};
		if (this.partidas[nombre] && this.usuarios[nick]){
			this.partidas[nombre].agregarJugador(this.usuarios[nick]);
			partida=this.partidas[nombre];
		}
		return partida;
	}
	this.salir=function(idp,nick){
		this.partidas[idp].salir(nick);
		if (this.comprobarJugadores(idp)==0){
			this.eliminarPartida(idp);
		}
		return this.partidas[idp];
	}
	this.comprobarJugadores=function(nombrePartida){
		return Object.keys(this.partidas[nombrePartida].jugadores).length;
	}
	this.eliminarPartida=function(nombrePartida){
		delete this.partidas[nombrePartida];
	}
	this.obtenerJugadoresPartida=function(nombrePartida,callback){
		var jugadores={};
		if (this.partidas[nombrePartida]){
			jugadores=this.partidas[nombrePartida].obtenerJugadores();
		}
		callback(jugadores);
	}
	this.jugadorPreparado=function(idp,nick,callback){
		//var jugadores=[];
		if (this.partidas[idp]){
			this.partidas[idp].jugadorPreparado(nick);
			this.partidas[idp].jugadores;
		}
		callback(this.partidas[idp]);
	}
	this.cerrarSesion=function(nick,callback){
		var data={res:"nook"};
		if(this.usuarios[nick]){
			delete this.usuarios[nick];			
			data={res:"ok"};
			console.log("Usuario "+nick+" cierra sesión");
		}
		callback(data);
	}
	this.enviarResultado=function(idp,nick,resultado,callback){
		if (this.partidas[idp]){
			this.partidas[idp].enviarResultado(nick,resultado);
			//this.partidas[idp].jugadores;
		}
		callback(this.partidas[idp]);
	}
}

function Partida(nombre,idp){
	this.nombre=nombre;
	this.idp=idp;
	this.jugadores={};
	this.numeroEnemigos=4;
	this.fase=new Inicial();
	this.agregarJugador=function(usr){
		this.fase.agregarJugador(usr,this);
	}
	this.puedeAgregarJugador=function(usr){
		this.jugadores[usr.nick]=usr;
	}
	this.obtenerJugadores=function(){
		return this.jugadores;
	}
	this.salir=function(nick){
		delete this.jugadores[nick];
	}
	this.jugadorPreparado=function(nick){
		this.fase.jugadorPreparado(nick,this);
	}
	this.todosPreparados=function(){
		res=true;
		for (var key in this.jugadores){
		  if (this.jugadores[key].estado=="no preparado"){
		    res=false;
			}
		}
		return res;
	}
	this.todosMuertos=function(){
		res=true;
		for (var key in this.jugadores){
		  if (this.jugadores[key].estado!="muerto"){
		    res=false;
			}
		}
		return res;
	}
	this.enviarResultado=function(nick,resultado){
		this.fase.enviarResultado(nick,resultado,this);
	}
	this.muereEnemigo = function(callback){
		this.numeroEnemigos=this.numeroEnemigos-1;
		if(this.numeroEnemigos<=0){
			console.log("Todos los enemigos han muerto");
		}
		callback(this.numeroEnemigos);
	}
}

function Inicial(){
	this.nombre="inicial";
	this.agregarJugador=function(usr,partida){
		partida.puedeAgregarJugador(usr);
	}
	this.jugadorPreparado=function(nick,partida){
		partida.jugadores[nick].estado="preparado";
		if (partida.todosPreparados()){
			partida.fase=new Jugando();
		}
	}
	this.enviarResultado=function(nick,resultado,partida){
		console.log("La partida no se ha iniciado");
	}
}

function Jugando(){
	this.nombre="jugando";
	this.agregarJugador=function(usr,partida){
		console.log("El juego ya ha comenzado");
	}
	this.jugadorPreparado=function(nick,partida){
		console.log("la partida ya ha comenzado");
	}
	this.enviarResultado=function(nick,resultado,partida){
		//anotar resultado
		if (resultado.vidas<=0){
			partida.jugadores[nick].estado="muerto";
		}
		if (partida.todosMuertos()){
			partida.fase=new Final();
		}
		//comprobar que alguien haya ganado
		console.log("anotar resultado nivel: "+resultado.nivel);
	}
}

function Final(){
	this.nombre="final";
	this.agregarJugador=function(usr,partida){
		console.log("El juego ya ha terminado");
	}
	this.enviarResultado=function(nick,resultado,partida){
		console.log("La partida ha terminado");
	}
	
}

function Usuario(nick){
	this.nick=nick;
	this.estado="no preparado";
}

module.exports.Juego=Juego;