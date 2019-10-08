function ClienteRest(){

    this.agregarUsuario=function(nick){
        $.getJSON("/agregarUsuario/"+nick,function(data){    
            console.log(data);
            //mostrar Usuario
        });
    }

    this.crearPartida=function(nombrePartida,nick){
        $.getJSON("/crearPartida/"+nombrePartida+"/"+nick,function(data){    
            console.log(data);
            //mostrar Usuario
        });
    }

    this.obtenerPartidas=function(){
        $.getJSON("/obtenerPartida",function(data){    
            console.log(data);
            //mostrar Usuario
        });
    }

    this.obtenerUsuarios=function(){
        $.getJSON("/obtenerUsuarios",function(data){    
            console.log(data);
            //mostrar Usuario
        });
    }

    this.unirAPartida=function(nombrePartida,nick){
        $.getJSON("/obtenerUsuarios"+nombrePartida+"/"+nick,function(data){    
            console.log(data);
            //mostrar Usuario
        });
    }

    ///obtenerJugadores/:nombrePartida
    this.obtenerJugadores=function(nombrePartida){
        $.getJSON("/obtenerJugadores/"+nombrePartida,function(data){    
            console.log(data);
            //mostrar Usuario
        });
    }


}