
function Juego() {
    this.partidas = [];
    this.usuarios = [];
    this.fase = new Inicial();

    this.crearPartida=function(nombre,nick){
		var idp=nombre+nick;
		if(!this.partidas[idp]){
            this.partidas[idp]=new Partida(nombre,idp);
			this.partidas[idp].agregarJugador(this.usuarios[nick]);
		}
	}
    this.agregarUsuario = function (usr) {
        this.fase.agregarJugador(usr,this);
    }

    this.puedeAgregarUsuario = function (nombre) {
        if(!this.usuarios[nombre]){
            this.usuarios[nombre] = new Usuario(nombre);
        }
    }

    this.obtenerPartidas = function(){
        return this.partidas;
    }

    this.unirsePartida = function (nombre,nick) {
        if(this.partidas[nombre] && this.usuarios[nick]){
            this.partidas[nombre].agregarJugador(this.usuarios[nick]);
            console.log(this.partidas[nombre]);
        }
    }

    this.salir=function(nick,nombrePartida){
        if(this.comprobarJugadores(nombrePartida)==0){
            this.elimintaPartida(nombrePartida);
        }
        delete this.partidas['nombrePartida'].jugadores[nick];
    }

    this.comprobarJugadores = function(nombrePartida){
        return Object.keys(this.partidas[nombrePartida].jugadores).length;
    }

    this.elimintaPartida = function(nombrePartida){
        delete this.partidas['nombrePartida'];
    }

}

function Inicial(){
    this.nombre="inicial";
    this.agregarJugador = function(usr,partida){
        partida.puedeAgregarUsuario(usr);
    }
}

function Jugando(){
    this.nombre="jugando";
    this.agregarJugador = function(usr,partida){
        console.log("El juego ha comenzado");
    }
}

function Final(){
    this.nombre="final";
    this.agregarJugador = function(usr,partida){
        console.log("El juego ha terminado");
    }
}


function Partida(nombre, idp) {
    this.nombre = nombre;
    this.idp = idp;
    this.jugadores = [];
    this.agregarJugador = function (usr) {
        this.jugadores[usr.nick] = usr;
        console.log(this.jugadores.length);
    }
}

function Usuario(nick) {
    this.nick = nick;
}