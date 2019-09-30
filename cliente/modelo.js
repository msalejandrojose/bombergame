
function Juego() {
    this.partidas = [];
    this.usuarios = [];

    this.crearPartida = function (nombre, uid) {
        var idp= nombre+uid;
        if(this.partidas[idp]==null){
            this.partidas[idp] = new Partida(nombre);
        }
    }
    this.agregarUsuario = function (nombre) {

        if (this.usuarios[nombre] == null) {
            this.usuarios[nombre] = new Usuario(nombre);
            var usr = new Usuario(nombre);
            usr.id = this.usuarios.length;
            this.usuarios.push(usr);
        }

    }

}

function Partida(nombre, nick) {
    this.nombre = nombre;
    this.jugadores = [];
}

function Usuario(nick) {
    this.nick = nick;
    this.id = undefined;
}