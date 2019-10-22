function ClienteWS(nick) {
    this.socket = undefined;
    this.nick = nick;
    this.idp=undefined;
    this.ini = function () {
        this.socket = io.connect();
        this.lanzarSocketSrv();
    }

    this.crearPartida = function (nombrePartida) {
        //this.nombrePartida=nombre;
        this.socket.emit('crearPartida', this.nick, nombrePartida);
        console.log("usuario " + this.nick + " crea partida " + nombrePartida+" con WS");
    }

    this.unirAPartida = function (idp,nick) {
        //this.nombrePartida=nombre;
        this.socket.emit('unirAPartida', idp, nick);
        //console.log("usuario " + this.nick + " crea partida " + nombrePartida+" con WS");
    }

    this.lanzarSocketSrv = function () {
        var cli = this;
        this.socket.on('connect', function () {
            console.log("Usuario conectado al servidor de WebSockets");
        });
        this.socket.on('partidaCreada', function (partida) {
            cli.idp=partida.idp;
            console.log("Partida creada WS: ",partida);
            mostrarPartida(partida);
            mostrarListaJugadores(partida.jugadores);
        });
        this.socket.on('nuevoJugador',function(jugadores){
            mostrarListaJugadores(jugadores);
        });
        
        this.socket.on('unido',function(partida){
            console.log('unido WS');
            mostrarPartida(partida)
            mostrarListaJugadores(partida.jugadores);
        });
    }

    


}