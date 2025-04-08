// Comentarios para la correcion: Hola profe, este es un simulador de compra y venta de jugadores para el equipo "Pumas". El Draft son los jugadores disponibles para ser adquiridos por el club. El Club puede tener un maximo de 5 jugadores. El simulador permite: 1- Ver el equipo actual de pumas, 2- Adquirir jugadores del draft y 3- Vender jugadores. Para esta entrega, en la simulacion de Compra utilice una Function, mientras que para la de Venta utilice Switch. La simulacion presenta los siguientes desafios: 1- Aun no se como borrar los jugadores adquiridos del array Draft, mismo caso con los jugadores vendidos y el array Pumas. Entiendo que se puede lograr con "Splice" pero no encuentro en las clases si es que lo vimos o no, por lo que no lo utilizare para esta entrega. 


const jugadores = ["Jale Hurts", "Bo Nix", "Curtland Sutton", "Saquon Barckley", "Sam LaPorta", "Cooper DeJean", "DeAndre Hopkins", "Cooper Kupp"]

const jugador1 = {
    jugador: "Jale Hurts",
    posicion: "QB",
    overall: "80",
    equipo: "Pumas"
}

const jugador2 = {
    jugador: "Bo Nix",
    posicion: "QB",
    overall: "78",
    equipo: "Pumas"
}

const jugador3 = {
    jugador: "Curtland Sutton",
    posicion: "WR",
    overall: "85",
    equipo: "Pumas"
}

const jugador4 = {
    jugador: "Saquon Barckley",
    posicion: "RB",
    overall: "90",
    equipo: "Pumas"
}

const jugador5 = {
    jugador: "Sam LaPorta",
    posicion: "TE",
    overall: "83",
    equipo: "Draft"
}

const jugador6 = {
    jugador: "Cooper DeJean",
    posicion: "DB",
    overall: "81",
    equipo: "Draft"
}

const jugador7 = {
    jugador: "DeAndre Hopkins",
    posicion: "WR",
    overall: "84",
    equipo: "Draft"
}

const jugador8 = {
    jugador: "Cooper Kupp",
    posicion: "WR",
    overall: "92",
    equipo: "Draft"
}

const pumas = [jugador1, jugador2, jugador3, jugador4]

const draft = [jugador5, jugador6, jugador7, jugador8]

let nombre = prompt("Hola, por favor ingresa tu nombre:")

saludar(nombre)

function saludar(nombre) {
    console.log(`Bienvenido, ${nombre}`);
}

initProcess()

function initProcess() {
    let continuar = true
    while (continuar) {
        let menu = parseInt(prompt("Menu: \n 1 Ver Equipo \n 2 Adquirir jugador \n 3 Vender jugador \n Otra tecla para Salir"))
    
        switch(menu) {
            case 1:

                console.log("Jugadores de Pumas")

                for (const puma of pumas) {
                console.log("Nombre: "+puma.jugador+" | Posición: "+puma.posicion+" | Overall: "+puma.overall)
                }

                break

            case 2:

                console.log("Jugadores del Draft 2025")
                
                for (const agente of draft) {
                console.log("Nombre: "+agente.jugador+" | Posición: "+agente.posicion+" | Overall: "+agente.overall)
                }
                
                if (pumas.length <= 5) {

                    function adquirirJugador(nombreJugador) {
                        let jugadorAdquirido = draft.find(draft => draft.jugador.toLocaleLowerCase() === nombreJugador.toLocaleLowerCase());
                        if (jugadorAdquirido) { 
                            pumas.push(jugadorAdquirido)
                            console.log(`El jugador "${nombreJugador}" ha sido adquirido por pumas`); 
                        } else {
                            console.log("Este jugador ya no está disponible.")
                        }
                    }

                    adquirirJugador(prompt("Que jugador desea adquirir: "))

                } else {
                    alert("Lo siento, ya alcanzaste el limite de jugadores. No puedes comprar otro jugador")
                }
                break

            case 3:

                console.log("Jugadores de Pumas")

                for (const puma of pumas) {
                console.log("Nombre: "+puma.jugador+" | Posición: "+puma.posicion+" | Overall: "+puma.overall)
                }
                
                let vender = parseInt(prompt("Que jugador desea vender: \n 1 "+`${jugador1.jugador}`+" \n 2 "+`${jugador2.jugador}`+" \n 3 "+`${jugador3.jugador}`+" \n 4 "+`${jugador4.jugador}`+" \n Otra tecla para Salir"))
    
                switch(vender) {
                    case 1:
                        draft.push(jugador1)
                        console.log("vendiste a Jalen Hurts")
                        break
                    case 2:
                        draft.push(jugador2)
                        console.log("vendiste a Bo Nix")
                        break
                    case 3:
                        draft.push(jugador3)
                        console.log("vendiste a Curtland Sutton")
                        break
                    case 4:
                        draft.push(jugador4)
                        console.log("vendiste a Saquon Barckley")
                        break     
                }

                break
        }
    
        let confirmacion = prompt("Se cerrará la sesión, quieres realizar otra operación (si/no)?").toLowerCase()
        if(confirmacion == "no") {
            continuar = false
            console.log(`Hasta pronto, ${nombre}`)
        }
    }
}