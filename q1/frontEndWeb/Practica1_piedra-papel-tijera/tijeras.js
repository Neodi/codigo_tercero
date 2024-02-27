
let opcion = 0;
let putosJ1 = 0;
let putosJ2 = 0;
const opciones = ["piedra", "papel", "tijeras"];

function determinarGanador(jugador1, jugador2) {
    let imgJ1 = document.getElementById("imgJ1");
    let imgJ2 = document.getElementById("imgJ2");

    switch(jugador1){
        case "piedra": imgJ1.src ="foto_piedra.png";
        break;
        case "papel": imgJ1.src ="foto_papel.png";
        break;
        case "tijeras": imgJ1.src ="foto_tijeras.png";
        break;
    }
    switch(jugador2){
        case "piedra": imgJ2.src ="foto_piedra.png";
        break;
        case "papel": imgJ2.src ="foto_papel.png";
        break;
        case "tijeras": imgJ2.src ="foto_tijeras.png";
        break;
    }

    if (jugador1 === jugador2) {
        return "EMPATE";
    } else if (
        (jugador1 === "piedra" && jugador2 === "tijeras") ||
        (jugador1 === "papel" && jugador2 === "piedra") ||
        (jugador1 === "tijeras" && jugador2 === "papel")
    ) {
        return "Ganador: JUGADOR 1 ";
    } else {
        return "Ganador: JUGADOR 2 ";
    }
}

function opcionSeleccionada(valor) {

    document.getElementById("keyBindsJ1").style.display = "none";
    document.getElementById("keyBindsJ2").style.display = "none";

    
    let imgJ1 = document.getElementById("imgJ1");
    let imgJ2 = document.getElementById("imgJ2");

    imgJ1.src = "interrogante.png";
    imgJ2.src = "interrogante.png";

    switch (valor) {
        case "opcion1":
            opcion = 1;
            console.log("Se eligió la opción 0 Jugadores.");
            opcion1();
            break;
        case "opcion2":
            opcion = 2;
            console.log("Se eligió la opción 1 Jugadores.");
            document.getElementById("keyBindsJ1").style.display = "block";
            opcion2();
            break;
        case "opcion3":
            opcion = 3;
            console.log("Se eligió la opción 2 Jugadores.");
            document.getElementById("keyBindsJ1").style.display = "block";
            document.getElementById("keyBindsJ2").style.display = "block";
            opcion3();
            break;
        default:
            console.log("ERROR");
            break;
    }    

    

}

function JUGAR(){
    console.log("Esta  jugando");

    boton = document.getElementById("boton");
     

    let opcion = document.getElementById("opciones")
    let valor = opcion.value;
    opcionSeleccionada(valor);


}

// 0 JUGADORES 

function opcion1(){
    console.log("Se puede jugar opción 1");

    let maquineta1 = Math.floor(Math.random() * 3);
    let maquineta2 = Math.floor(Math.random() * 3);

    let ganador = determinarGanador(opciones[maquineta1], opciones[maquineta2]);

    console.log("Máquina 1 eligió " + opciones[maquineta1]);
    console.log("Máquina 2 eligió " + opciones[maquineta2]);
    console.log("Resultado: " + ganador);
    
    let textganador = document.getElementById("Ganador");
    textganador.textContent = ganador;


 
}   

// 1 JUGADORES 

function opcion2() {

    console.log("Se puede jugar opción 2");

    //alert("simplemente teclea la opción que elijas");

    const listener = function(event) {
        if (event.key === "a" || event.key === "s" || event.key === "d") {
            
            let maquineta1 = Math.floor(Math.random() * 3);

            let opcionHumano;
            if (event.key === "a") {
                opcionHumano = "piedra";
            } else if (event.key === "s") {
                opcionHumano = "papel";
            } else if (event.key === "d") {
                opcionHumano = "tijeras";
            }

            let ganador = determinarGanador(opcionHumano, opciones[maquineta1]);

            console.log("Humano eligió " + opcionHumano);
            console.log("Máquina eligió " + opciones[maquineta1]);

            console.log("Resultado: " + ganador);

            let textganador = document.getElementById("Ganador");
            textganador.textContent = ganador;



            document.removeEventListener("keydown", listener);
        }
    };

    document.addEventListener("keydown", listener);

}

// 2 JUGADORES

function opcion3() {
    console.log("Se puede jugar opción 3");
  
    let jugador1Choice = null;
    let jugador2Choice = null;

    const listener1 = function(event) {
        if (event.key === "a" || event.key === "s" || event.key === "d") {
            jugador1Choice = event.key;
            document.removeEventListener("keydown", listener1); 


            const listener2 = function(event) {
                if (event.key === "j" || event.key === "k" || event.key === "l") {
                    jugador2Choice = event.key;
                    document.removeEventListener("keydown", listener2); 

                    let opcionJugador1, opcionJugador2;

                    switch (jugador1Choice) {
                        case "a":
                            opcionJugador1 = "piedra";
                            break;
                        case "s":
                            opcionJugador1 = "papel";
                            break;
                        case "d":
                            opcionJugador1 = "tijeras";
                            break;
                    }

                    switch (jugador2Choice) {
                        case "j":
                            opcionJugador2 = "piedra";
                            break;
                        case "k":
                            opcionJugador2 = "papel";
                            break;
                        case "l":
                            opcionJugador2 = "tijeras";
                            break;
                    }

                    let ganador = determinarGanador(opcionJugador1, opcionJugador2);

                    console.log("Jugador 1 eligió " + opcionJugador1);
                    console.log("Jugador 2 eligió " + opcionJugador2);
                    console.log("Resultado: " + ganador);
                    
                    if(ganador === "Ganador: JUGADOR 1 "){
                        putosJ1++;
                    }else if(ganador === "Ganador: JUGADOR 2 "){
                        putosJ2++;
                    }

                    let textPuntosJ1 = document.getElementById("puntosJ1");
                    let textPuntosJ2 = document.getElementById("puntosJ2");
                    
                    textPuntosJ1.textContent = "J1: " + putosJ1;
                    textPuntosJ2.textContent = "J2: " + putosJ2;                    

                    let textGanador = document.getElementById("Ganador");
                    textGanador.textContent = ganador;


                   
                }
            };

            document.addEventListener("keydown", listener2);
        }
    };

    document.addEventListener("keydown", listener1);
}

function FIN() {
    let timerDisplay = document.getElementById("timer");
    timerDisplay.textContent = "10";
    
    let ganador = "";
    if (putosJ1 > putosJ2) {
        ganador = "Ganador FINAL: JUGADOR 1";
    } else if (putosJ2 > putosJ1) {
        ganador = "Ganador FINAL: JUGADOR 2";
    } else {
        ganador = "EMPATE FINAL";
    }    

    let countdown = 10;
    const countdownInterval = setInterval(function() {
        countdown--;
        timerDisplay.textContent = countdown.toString();

        if (countdown === 0) {
            clearInterval(countdownInterval);

            putosJ1 = 0;
            putosJ2 = 0;

            document.getElementById("puntosJ1").textContent = "J1: " + putosJ1;
            document.getElementById("puntosJ2").textContent = "J2: " + putosJ2;
            
            document.getElementById("Ganador").textContent = ganador;
        }
    }, 1000);
}
