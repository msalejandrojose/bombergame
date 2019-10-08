var modelo = require("./modelo.js");
describe("Player", function() {
  var juego;

  beforeEach(function() {
    juego = new modelo.Juego();
  });

  it("comprobaciones iniciales", function() {
    expect(juego.usuarios.length).toEqual(0);
    expect(juego.partidas.length).toEqual(0);
  });

  it("agregar usuario pepe", function(){
    juego.agregarUsuario('pepe',function(){});
    expect(Object.keys(juego.partidas).length).toEqual(0);
    expect(Object.keys(juego.usuarios).length).toEqual(1);
    //expect(juego.usuarios['pepe']).not.toBe(undefined);
  });

  it("agregar usuario pepe y samu", function(){
    juego.agregarUsuario('pepe',function(){});
    juego.agregarUsuario('samu',function(){});
    //expect(juego.partidas.length).toEqual(0);
    expect(Object.keys(juego.partidas).length).toEqual(0);
    expect(Object.keys(juego.usuarios).length).toEqual(2);
    expect(juego.usuarios['pepe']).not.toBe(undefined);
    expect(juego.usuarios['samu']).not.toBe(undefined);
  });

  it("crear partida", function(){
    juego.agregarUsuario('pepe',function(){});
    juego.crearPartida('una','pepe',function(){});
    expect(Object.keys(juego.partidas).length).toEqual(1);
    expect(Object.keys(juego.partidas['unapepe'].jugadores).length).toEqual(1);
    expect(juego.partidas['unapepe']).not.toBe(undefined);
  });

  it("samu se une a la partida de pepe", function(){
    juego.agregarUsuario('pepe',function(){});
    juego.crearPartida('una','pepe',function(){});
    juego.agregarUsuario('samu',function(){});
    juego.unirseAPartida('unapepe','samu',function(){});
    expect(Object.keys(juego.partidas).length).toEqual(1);
    expect(Object.keys(juego.partidas['unapepe'].jugadores).length).toEqual(2);
    expect(juego.partidas['unapepe']).not.toBe(undefined);
  });

  //Pruebas para salir
  it("samu se une a la partida de pepe", function(){
    juego.agregarUsuario('pepe',function(){});
    juego.crearPartida('una','pepe',function(){});
    juego.agregarUsuario('samu',function(){});
    juego.unirseAPartida('unapepe','samu',function(){});
    expect(Object.keys(juego.partidas).length).toEqual(1);
    expect(Object.keys(juego.partidas['unapepe'].jugadores).length).toEqual(2);
    //juego.salir('samu','unasamu');
    expect(Object.keys(juego.partidas['unapepe'].jugadores).length).toEqual(1);
    expect(juego.partidas['unapepe']).not.toBe(undefined);
  });
  //Comprobar que la partida se ha eliminado
  it("samu se une a la partida de pepe", function(){
    juego.agregarUsuario('pepe',function(){});
    juego.crearPartida('una','pepe',function(){});
    juego.agregarUsuario('samu',function(){});
    juego.unirseAPartida('unapepe','samu',function(){});
    expect(Object.keys(juego.partidas).length).toEqual(1);
    expect(Object.keys(juego.partidas['unapepe'].jugadores).length).toEqual(2);
    //juego.salir('samu','unapepe');
    //juego.salir('pepe','unapepe');
    expect(juego.partidas['unapepe']).toBe(undefined);
  });
  
});
