
function Juego() {
    this.partidas = {};
    this.usuarios = {};

    this.crearPartida = function (nombre, nick, callback) {
        var idp = nombre + nick;
        if (!this.partidas[idp]) {
            console.log("Nuevo partida: "+idp);
            this.partidas[idp] = new Partida(nombre, idp);
            this.partidas[idp].fase = new Inicial();
            this.partidas[idp].agregarJugador(this.usuarios[nick]);
        }

        callback(this.partidas[idp]);

    }
    this.agregarUsuario = function (nombre, callback) {

        if (!this.usuarios[nombre]) {
            console.log("Nuevo usuario: "+nombre);
            this.usuarios[nombre] = new Usuario(nombre);
        }
        callback(this.usuarios[nombre]);
    }

    this.obtenerPartidas = function (callback) {
        callback(this.partidas);
        return this.partidas;
    }

    this.obtenerUsuarios= function (callback) {
        callback(this.usuarios);
        return this.usuarios;
    }

    this.unirAPartida = function (idp, nick,callback) {
        if (this.partidas[idp] && this.usuarios[nick]) {
            this.partidas[idp].agregarJugador(this.usuarios[nick]);
        }
        callback(this.partidas[idp]);
    }

    this.salir = function (nombrePartida, nick) {
        this.partidas[nombrePartida].salir(nick);
        if (this.comprobarJugadores(nombrePartida) == 0) {
            this.eliminarPartida(nombrePartida);
        }
    }

    this.comprobarJugadores = function (nombrePartida) {
        return Object.keys(this.partidas[nombrePartida].jugadores).length;
    }

    this.eliminarPartida = function (nombrePartida) {
        delete this.partidas[nombrePartida];
    }

    this.obtenerPartida= function(idp){
        return this.partidas[idp];
    }

}

function Partida(nombre, idp) {
    this.nombre = nombre;
    this.idp = idp;
    this.jugadores = {};
    this.fase = new Inicial();

    this.obtenerJugadores = function(callback){
        callback(this.jugadores);
    }

    this.agregarJugador = function (usr) {
        this.fase.agregarJugador(usr, this);
    }
    this.puedeAgregarJugador = function (usr) {
        this.jugadores[usr.nick] = usr;
    }
    this.salir = function (nick) {
        delete this.jugadores[nick];
    }
}

function Inicial() {
    this.nombre = "inicial";
    this.agregarJugador = function (usr, partida) {
        partida.puedeAgregarJugador(usr);
    }
}
function Jugando() {
    this.nombre = "jugando";
    this.agregarJugador = function (usr, partida) {
        console.log("El juego ya ha comenzado");
    }
}
function Final() {
    this.nombre = "final";
    this.agregarJugador = function (usr, partida) {
        console.log("El juego ya ha terminado");
    }
}

function Usuario(nick) {
    this.nick = nick;
    this.id = undefined;
}

module.exports.Juego = Juego;
