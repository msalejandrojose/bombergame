function ServidorWS(){

    this.enviarRemitente=function(socket,mens,datos){
        socket.emit(mens,datos);
    }

    this.enviarATodos=function(io,nombre,mens,datos){
        io.sockets.in(nombre).emit(mens,datos);
    }

    this.enviarATodosMenosRemitente=function(socket,nombre,mens,datos){
        socket.broadcast.to(nombre).emit(mens,datos)
    };

    this.lanzarSocketSrv = function(io,juego){
        var cli=this;
        io.on('connection',function(socket){
            console.log("Nueva conexion");
            socket.on('crearPartida',function(nick,nombrePartida){
                juego.crearPartida(nombrePartida,nick,function(partida){
                    cli.enviarRemitente(socket,"partidaCreada",partida);
                    socket.join(partida.idp); 
                    //hay que añadir socket.join(idp); en el socket.on de unirsePartida
                    //cli.enviarATodosMenosRemitente(socket,idp,'nuevoJugador',partidas.jugadores)
                });
            });
        });
    }

}

module.exports.ServidorWS=ServidorWS;