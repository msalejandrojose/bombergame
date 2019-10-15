
function mostrarAgregarUsuario(){

	var cadena="<div id='mAU'>";
	cadena=cadena+"<h3>Usuario</h3>";
	cadena=cadena+'<input id="nombre" type="text" class="form-control" name="nombre" placeholder="Nombre usuario">';		
	cadena=cadena+'<button type="button" id="inicioBtn" class="btn btn-primary btn-md">Iniciar Usuario</button>';	
    cadena=cadena+"</div>";

    $('#inicio').append(cadena);
    
    $('#inicioBtn').on('click',function(){
        var nombre=$('#nombre').val();
        if(nombre==''){
            nombre='Loli';
        }
        rest.agregarUsuario(nombre);
    });
}

function mostrarBotones(data){
    $('#botones').remove();
    var cadena='<div id="botones">';
    cadena=cadena+'<button type="button" id="optCrearPartida" class="btn btn-light">Crear Partida</button>';
    cadena=cadena+'<button type="button" id="optUnirseAPartida" class="btn btn-dark">Unirse a Partida</button>';  
    cadena=cadena+'</div>';
    
    $('#inicio').append(cadena);

    $('#optCrearPartida').on('click',function(){
        mostrarCrearPartida(data);
    });

    $('#optUnirseAPartida').on('click',function(){
        rest.obtenerPartidas();
    });
    

}

function mostrarListadoPartidas(data){
    //var partidas = rest.obtenerPartidas();
    var cadena = '<table class="table">'
    cadena=cadena+'<thead>'
    cadena=cadena+'<th scope="col">Idp</th>'
    cadena=cadena+'<th scope="col">Nº Jugadores</th>'
    cadena=cadena+'<th scope="col">Estado</th>'
    cadena=cadena+'<th scope="col"></th>'
    cadena=cadena+'</thead>'

    cadena=cadena+'<tbody>'
    console.log(data);
    for (var index in partidas){
        cadena=cadena+'<tr>';
        
        cadena=cadena+'<td>'+partidas[index].idp+'</td>';
        cadena=cadena+'<td>'+123+'</td>';
        cadena=cadena+'<td>'+Object.keys(partidas[index].jugadores).length+'</td>';
        cadena=cadena+'<td><button type="button" class="btn btn-info">Unirse</button></td>';
        cadena=cadena+'</tr>'
    }
    cadena=cadena+'</tbody>'

    cadena=cadena+'</table>'
    $('#inicio').append(cadena);
    
}

function mostrarCrearPartida(data){
    $('#crearPartida').remove();

    var cadena="<div id='crearPartida'>";
	cadena=cadena+"<h3>Partida:</h3>";
	cadena=cadena+'<input id="nPartida" type="text" class="form-control" name="nPartida" placeholder="Nombre de la partida">';		
	cadena=cadena+'<button type="button" id="crearPartidaBtn" class="btn btn-primary btn-md">Crear Partida</button>';	
    cadena=cadena+"</div>";

    $('#inicio').append(cadena);

    $('#crearPartidaBtn').on('click',function(){
        var partida=$('#nPartida').val();
        if(partida==''){
            partida='Loli';
        }
        rest.crearPartida(partida, data.nick);
    });
}

function mostrarUsuario(data){
    $('#mAU').remove();
    var cadena="<div id='bienvenido'>";
    cadena=cadena+'<h5>Bienvenido: ';
    cadena=cadena+'<h4 style="color:green">';
    cadena=cadena+data.nick;
    cadena=cadena+'</h4>';
    cadena=cadena+'</h5>';	
    cadena=cadena+"</div>";
    $('#inicio').append(cadena);
    mostrarBotones(data);
}

function mostrarUsuarioNoLogueado(){
    $('#eNombre').remove();
    var cadena="<div id='eNombre'>";
    cadena=cadena+'<h5 style="color:red">Usuario ya existe</h5>';	
    cadena=cadena+"</div>";
    $('#mAU').append(cadena);
}
