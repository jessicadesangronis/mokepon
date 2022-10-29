const sectionSeleccionarAtaque = document.getElementById("sectionSeleccionarAtaque")

const botonReiniciar = document.getElementById("botonReiniciar")
const contenedorTarjetas = document.getElementById("contenedorTarjetas")
const pMascotaJugador = document.getElementById("pMascotaJugador")
const imagenJugador = document.getElementById("imagenJugador")
const sectionSeleccionarMascota = document.getElementById("sectionSeleccionarMascota")
const sectionReiniciar = document.getElementById("sectionReiniciar")
const pMascotaEnemiga = document.getElementById("pMascotaEnemiga")
const imagenEnemiga = document.getElementById("imagenEnemiga")
const pVidasJugador = document.getElementById("pVidasJugador")
const pVidasEnemigo = document.getElementById("pVidasEnemigo")
const sectionMensajes = document.getElementById("mensajeResultado")
const botonMascotaJugador = document.getElementById("botonSeleccionarMascotas")
const contenedorAtaque = document.getElementById("contenedorAtaque")

let mokepones= []
//let ataqueJugador
let ataqueEnemigo
let opcionesDeMokepones
let inputHypodoge
let inputCapipepo 
let inputRatigueya 
let ataquesMokepon
let botonFuego
let botonAgua 
let botonTierra
let botones = []
let ataqueJugador=[]
let mascotaJugador
let vidasJugador = 3
let vidasEnemigo = 3

class Mokepon{
    constructor(nombre,foto,vida) {
        this.nombre=nombre
        this.foto=foto
        this.vida=vida
        this.ataques= []
    }
}

let hypodoge = new Mokepon ("Hypodoge","./assets/mokepons_mokepon_hipodoge_attack.png",3)
let capipepo = new Mokepon ("Capipepo","./assets/mokepons_mokepon_capipepo_attack.png",3)
let ratigueya = new Mokepon ("Ratugueya","./assets/mokepons_mokepon_ratigueya_attack.png",3)

hypodoge.ataques.push(
    {nombre:"Agua 💧", id:"botonAgua"},
    {nombre:"Agua 💧", id:"botonAgua"},
    {nombre:"Agua 💧", id:"botonAgua"},
    {nombre:"Fuego 🔥", id:"botonFuego"},
    {nombre:"Tierra 🌱", id:"botonTierra"},
)

capipepo.ataques.push(
    {nombre:"Agua 💧", id:"botonAgua"},
    {nombre:"Tierra 🌱", id:"botonAgua"},
    {nombre:"Fuego 🔥", id:"botonAgua"},
    {nombre:"Fuego 🔥", id:"botonFuego"},
    {nombre:"Tierra 🌱", id:"botonTierra"},
)

ratigueya.ataques.push(
    {nombre:"Agua 💧", id:"botonAgua"},
    {nombre:"Agua 💧", id:"botonAgua"},
    {nombre:"Tierra 🌱 ", id:"botonAgua"},
    {nombre:"Fuego 🔥", id:"botonFuego"},
    {nombre:"Tierra 🌱", id:"botonTierra"},
)

mokepones.push (hypodoge,capipepo,ratigueya)

function iniciarJuego() {
    botonMascotaJugador.addEventListener("click",seleccionarMascotaJugador)

    mokepones.forEach((mokepon) => {
        opcionesDeMokepones = `
            <input type="radio" name="mascotas" id=${mokepon.nombre}>
            <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
            <p>${mokepon.nombre}</p>
            <img src=${mokepon.foto} alt=${mokepon.nombre}>
            </label>

            `
        contenedorTarjetas.innerHTML += opcionesDeMokepones
        inputHypodoge = document.getElementById("Hypodoge")
        inputCapipepo = document.getElementById("Capipepo")
        inputRatigueya = document.getElementById("Ratigueya")

    })

    sectionSeleccionarAtaque.style.display = "none"

    botonReiniciar.addEventListener("click",reiniciarJuego)
}

function seleccionarMascotaJugador() {

    if (inputHypodoge.checked) {
       pMascotaJugador.innerHTML = inputHypodoge.id
       imagenJugador.src = "./assets/mokepons_mokepon_hipodoge_attack.png"
        mascotaJugador = inputHypodoge.id
       // Si la Imagen del jugador es Hipodoge, debo hacer un espejo de esta para que mire a la derecha
    } else if (inputCapipepo.checked ) {
        pMascotaJugador.innerHTML = inputCapipepo.id
        imagenJugador.src = "./assets/mokepons_mokepon_capipepo_attack.png"
        mascotaJugador = inputCapipepo.id
    } else if (inputRatigueya.checked) {
        pMascotaJugador.innerHTML = inputRatigueya.id
        imagenJugador.src = "./assets/mokepons_mokepon_ratigueya_attack.png"
        mascotaJugador = inputRatigueya.id
    } else {
        alert ("Debes seleccionar una Mascota")
        return
    }

    sectionSeleccionarAtaque.style.display = "flex"
    sectionSeleccionarMascota.style.display = "none"
    sectionReiniciar.style.display = "none"
    
    extraerAtaques(mascotaJugador)
    seleccionarMascotaEnemiga()    
}

function extraerAtaques(mascotaJugador){
    
    let ataques
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            ataques = mokepones[i].ataques
        }
    
    }
    console.log(ataques)
    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques){
    ataques.forEach((ataque) => {
        ataquesMokepon = `
        <button id=${ataque.id} class="boton-ataque BAtaque">${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML += ataquesMokepon
         })
        botonFuego = document.getElementById("botonFuego")
        botonAgua = document.getElementById("botonAgua")
        botonTierra = document.getElementById("botonTierra")
        //es un comando nuevo querySelectorAll en vez de traer un elemento por su id, trae todos los que cumplen una condicion, en este caso una clase
        botones = document.querySelectorAll(".BAtaque")
    }
    
function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener("click",(e) => {
            if (e.target.textContent === "Fuego 🔥") {
                ataqueJugador.push ("FUEGO")
                console.log(ataqueJugador)
                boton.style.background = "#125f58"
            } else if (e.target.textContent === "Agua 💧") {
                ataqueJugador.push ("AGUA")
                console.log(ataqueJugador)
                boton.style.background = "#125f58"
            } else  {
                ataqueJugador.push ("IERRA")
                console.log(ataqueJugador)
                boton.style.background = "#125f58"
            }
        })
            
    })
}



function seleccionarMascotaEnemiga() {
    let mascotaAleatorio = aleatorio(0,mokepones.length-1)

   pMascotaEnemiga.innerHTML = mokepones[mascotaAleatorio].nombre
   imagenEnemiga.src = mokepones[mascotaAleatorio].foto
   secuenciaAtaque()
}

function aleatorio(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min)
}


function ataqueAleatrorioEnemigo(){
    
    let ataqueAleatorioEnemigo = aleatorio (1,3)
    if (ataqueAleatorioEnemigo == 1) {
        ataqueEnemigo = "FUEGO"
    } else if (ataqueAleatorioEnemigo == 2){
        ataqueEnemigo = "AGUA"
    } else {
        ataqueEnemigo = "TIERRA"
    }

    combate()
}

function combate(){
    
    if (ataqueEnemigo == ataqueJugador) {
        crearMensaje("EMPATE")
    } else if (ataqueJugador == "FUEGO" & ataqueEnemigo == "TIERRA"){
        crearMensaje("GANASTE")
        vidasEnemigo --
        pVidasEnemigo.innerHTML= vidasEnemigo + " 💛"
    } else if (ataqueJugador == "AGUA" & ataqueEnemigo == "FUEGO"){
        crearMensaje("GANASTE")
        vidasEnemigo --
        pVidasEnemigo.innerHTML= vidasEnemigo + " 💛"
    } else if (ataqueJugador == "TIERRA" & ataqueEnemigo == "AGUA"){
        crearMensaje("GANASTE")
        vidasEnemigo --
        pVidasEnemigo.innerHTML= vidasEnemigo + " 💛"
    } else {
        crearMensaje("PERDISTE")
        vidasJugador --
        pVidasJugador.innerHTML= vidasJugador + " 💛"
    }
    revisarVidas()
}

function crearMensaje(resultado){
    
    let parrafo1 = document.getElementById("mensajeResultado")
    parrafo1.innerHTML = resultado 
    
    let parrafo2 = document.createElement("p")
    parrafo2.innerHTML= ataqueJugador
    sectionMensajeAtaquesJugador.appendChild(parrafo2)

    let parrafo3 = document.createElement("p")
    parrafo3.innerHTML= ataqueEnemigo
    sectionMensajesAtaquesEnemigos.appendChild(parrafo3)
}

function revisarVidas(){
    if (vidasEnemigo == 0){
        crearMensajeFinal("FELICITACIONES, GANASTE !!!! :-)")
    } else if (vidasJugador == 0){
        crearMensajeFinal("Lo Siento, PERDISTE !!!! :-(")
    }
}

function crearMensajeFinal(resultadoFinal){
    sectionMensajes.innerHTML = resultadoFinal

    botonFuego.disabled = true
    botonAgua.disabled = true
    botonTierra.disabled = true

    sectionReiniciar.style.display = "flex"
}

function reiniciarJuego(){
    location.reload()
}

window.addEventListener("load",iniciarJuego) 