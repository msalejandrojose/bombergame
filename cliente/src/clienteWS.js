function ClienteWS(nick){
	this.socket=undefined;
	this.nick=nick;
	this.idp=undefined;
	this.ini=function(){
		this.socket=io.connect();
		this.lanzarSocketSrv();
	}
	this.crearPartida=function(nombrePartida){
		//this.nombrePartida=nombre;
		this.socket.emit('crearPartida',this.nick,nombrePartida);
   			console.log("usuario "+this.nick+" crea partida "+nombrePartida);
	}
	this.obtenerPartidas=function(){
		this.socket.emit("obtenerPartidas");
	}
	this.unirAPartida=function(idp,nick){
		this.socket.emit("unirAPartida",idp,nick);
	}
	this.salir=function(){
		this.socket.emit("salir",this.idp,this.nick);
	}
	this.preparado=function(){
		$('#preparadoBtn').remove();
		this.socket.emit("preparado",this.idp,this.nick);
	}
	this.enviarResultado=function(nivel,vidas){
		this.socket.emit("enviarResultado",this.idp,this.nick,{"nivel":nivel,"vidas":vidas});
	}
	this.muereEnemigo=function(){
		this.socket.emit("muereEnemigo",this.idp);
	}
	this.lanzarSocketSrv=function(){
		var cli=this;
		this.socket.on('connect', function(){   						
   			console.log("Usuario conectado al servidor de WebSockets");
		});
		this.socket.on('partidaCreada',function(partida){
			console.log("partida creada:",partida);
			cli.idp=partida.idp;
			mostrarPartida(partida);
			mostrarListaJugadores(partida.jugadores);
		});
		this.socket.on('partidas',function(partidas){
			mostrarListaPartidas(partidas);
		});
		this.socket.on('unido',function(partida){
			cli.idp=partida.idp;
			mostrarPartida(partida);
			mostrarListaJugadores(partida.jugadores);
		});
		this.socket.on('nuevoJugador',function(jugadores){
			mostrarListaJugadores(jugadores);
		});
		this.socket.on('saliste',function(){
			mostrarCrearPartida(cli.nick);
			borrarCanvas();
		});
		this.socket.on('saleJugador',function(jugadores){
			mostrarListaJugadores(jugadores);
		});
		this.socket.on('otropreparado',function(jugadores){
			mostrarListaJugadores(jugadores);
		});
		this.socket.on('aJugar',function(){
			mostrarCanvas();
		});
		this.socket.on('anotado',function(){ //function(resultados)
			//mostrarListaResultados(resultados)
			console.log("Resultado anotado");
		});
		this.socket.on('finpartida',function(){ //function(resultados)
			//mostrarListaResultados(resultados)
			console.log("Fin de la partida");
			//mostrarCrearPartida(cli.nick);
			//borrarCanvas();
			cli.salir();
		});
		this.socket.on('enemigoMuerto',function(numeroEnemigos){ 
			console.log("Quedan: "+numeroEnemigos+" enemigos.")
		});
	}
}