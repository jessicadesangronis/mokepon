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
const sectionVerMapa = document.getElementById("ver-mapa")
const mapa = document.getElementById("mapa")

let lienzo = mapa.getContent("2d")
let mokepones = []
let ataqueEnemigo = []
let opcionesDeMokepones
let inputHypodoge
let inputCapipepo 
let inputRatigueya 
let ataquesMokepon
let ataquesMokeponEnemigo 
let botonFuego
let botonAgua 
let botonTierra
let botones = []
let indexAtaqueJugador
let indexAtaqueEnemigo
let ataqueJugador = []
let mascotaJugador
let victoriasJugador = 0
let victoriasEnemigo = 0
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
    sectionVerMapa.style.display="none"

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

//    sectionSeleccionarAtaque.style.display = "flex"
    sectionVerMapa.style.display="flex"
    let imagenDeCapipepo = new Image()
    imagenDeCapipepo.src = capipepo.foto
    lienzo.drawImage(
        imagenDeCapipepo,
        20,
        40,
        100,
        100
    )

    
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
                boton.disabled = true

            } else if (e.target.textContent === "Agua 💧") {
                ataqueJugador.push ("AGUA")
                console.log(ataqueJugador)
                boton.style.background = "#125f58"
                boton.disabled = true
            
            } else  {
                ataqueJugador.push ("TIERRA")
                console.log(ataqueJugador)
                boton.style.background = "#125f58"
                boton.disabled = true

            }
            ataqueAleatrorioEnemigo()
        })
    })
}

function seleccionarMascotaEnemiga() {
    let mascotaAleatorio = aleatorio(0,mokepones.length-1)

   pMascotaEnemiga.innerHTML = mokepones[mascotaAleatorio].nombre
   imagenEnemiga.src = mokepones[mascotaAleatorio].foto
   ataquesMokeponEnemigo = mokepones[mascotaAleatorio].ataques
   secuenciaAtaque()
}

function aleatorio(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min)
}


function ataqueAleatrorioEnemigo(){
    
    let ataqueAleatorioEnemigo = aleatorio (0,mokepones.length-1) 
    
    if (ataqueAleatorioEnemigo === 0 || ataqueAleatrorioEnemigo === 1) {
        ataqueEnemigo.push ("FUEGO")
    } else if (ataqueAleatorioEnemigo == 2 || ataqueAleatrorioEnemigo === 3){
        ataqueEnemigo.push ("AGUA")
    } else {
        ataqueEnemigo.push("TIERRA")
    }
    console.log (ataqueEnemigo)
    iniciarPelea()
}

function iniciarPelea(){    
    if (ataqueJugador.length === 5) {
        combate()
    }
}

function indexAmbosOponentes(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate(){
    for (let index = 0; index < ataqueJugador.length; index++) {
        if (ataqueJugador[index] === ataqueEnemigo[index]) {
            indexAmbosOponentes(index, index)
            crearMensaje("EMPATE")

        } else if (ataqueJugador[index] === "FUEGO" && ataqueEnemigo[index] === "TIERRA") {
            indexAmbosOponentes(index, index)
            crearMensaje("GANASTE")
            victoriasJugador ++
            pVidasJugador.innerHTML= victoriasJugador + " 💛"

        } else if (ataqueJugador[index] === "AGUA" && ataqueEnemigo[index] === "FUEGO") {
            indexAmbosOponentes(index, index)
            crearMensaje("GANASTE")
            victoriasJugador ++
            pVidasJugador.innerHTML= victoriasJugador + " 💛"

        } else if (ataqueJugador[index] === "TIERRA" && ataqueEnemigo[index] === "AGUA") {
            indexAmbosOponentes(index, index)
            crearMensaje("GANASTE")
            victoriasJugador ++
            pVidasJugador.innerHTML= victoriasJugador + " 💛"

        } else {
            indexAmbosOponentes(index, index)
            crearMensaje("PERDISTE")
            victoriasEnemigo ++          
            pVidasEnemigo.innerHTML= victoriasEnemigo + " 💛"       
        }
    }

    revisarVidas()
}

function revisarVidas(){
    if (victoriasJugador === victoriasEnemigo){
        crearMensajeFinal("Esto fue un empate")
    } else if (victoriasJugador > victoriasEnemigo){
        crearMensajeFinal("FELICIDADES, Ganaste!")
    } else {
        crearMensajeFinal("PERDISTE, Lo siento!")     
    }
}

function crearMensaje(resultado){
    
    let parrafo1 = document.getElementById("mensajeResultado")
    parrafo1.innerHTML = resultado 
    
    let parrafo2 = document.createElement("p")
    parrafo2.innerHTML= indexAtaqueJugador
    sectionMensajeAtaquesJugador.appendChild(parrafo2)

    let parrafo3 = document.createElement("p")
    parrafo3.innerHTML= indexAtaqueEnemigo
    sectionMensajesAtaquesEnemigos.appendChild(parrafo3)
}

function crearMensajeFinal(resultadoFinal){
    sectionMensajes.innerHTML = resultadoFinal
    sectionReiniciar.style.display = "flex"
}

function reiniciarJuego(){
    location.reload()
}

window.addEventListener("load",iniciarJuego) 