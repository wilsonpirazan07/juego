class Memorama {
    constructor() {
      this.puedeJugar = false;
      this.carta1 = null;
      this.carta2 = null;
      this.imagenesDisponibles = [1, 2, 3, 4, 5, 6, 7, 8];
      this.ordenParaEstaRonda = [];
      this.cartas = Array.from(document.querySelectorAll(".board-game figure"));
      this.numeroMaximoPares = this.imagenesDisponibles.length;
      this.errores = 0;
      this.movimientos = 0
      this.aciertos = 0; 
      this.iniciarJuego();
      this.actualizarTabla();
    }
  
    iniciarJuego() {
      this.paresEncontrados = 0;
      this.errores = 0;
      this.movimientos = 0;
      this.aciertos = 0; 
      this.establecerNuevoOrden();
      this.establecerImagenesEnCartas();
      this.abrirCartas();
    }
  
    establecerNuevoOrden() {
      this.ordenParaEstaRonda = this.imagenesDisponibles.concat(
        this.imagenesDisponibles
      );
      this.ordenParaEstaRonda.sort(() => Math.random() - 0.5);
    }
  
    establecerImagenesEnCartas() {
      for (const key in this.cartas) {
        const carta = this.cartas[key];
        const imagen = this.ordenParaEstaRonda[key];
        const imgEtiqueta = carta.children[1].children[0];
        carta.dataset.imagen = imagen;
        imgEtiqueta.src = `./img/${imagen}.png`;
      }
    }
  
    abrirCartas() {
      this.cartas.forEach((carta) => carta.classList.add("opened"));
      setTimeout(() => {
        this.cerrarCartas();
      }, 10000);
    }
  
    cerrarCartas() {
      this.cartas.forEach((carta) => carta.classList.remove("opened"));
      this.agregarEventosClick();
      this.puedeJugar = true;
    }
  
    agregarEventosClick() {
      this.cartas.forEach((_this) =>
        _this.addEventListener("click", this.voltearCarta.bind(this))
      );
    }
  
    quitarEventosClick() {
      this.cartas.forEach((_this) =>
        _this.removeEventListener("click", this.voltearCarta)
      );
    }
  
    voltearCarta(e) {
      const cartaClickeada = e.target;
      if (this.puedeJugar && !cartaClickeada.classList.contains("opened")) {
        cartaClickeada.classList.add("opened");
        this.verificarPar(cartaClickeada.dataset.imagen);
      }
    }
  
    verificarPar(imagen) {
      if (!this.carta1) this.carta1 = imagen;
      else this.carta2 = imagen;
  
      if (this.carta1 && this.carta2) {
        if (this.carta1 == this.carta2) {
          this.puedeJugar = false;
          setTimeout(this.verificarSiGano.bind(this), 300);
          this.aciertos++; 
        } else {
          this.puedeJugar = false;
          setTimeout(this.resetearCartasAbiertas.bind(this), 800);
          this.errores++; 
        }
      }
      this.movimientos++; 
      if (this.errores >= 3) {
        alert("perdiste sigue intentando"); 
        this.iniciarNuevoJuego();
      }
      this.actualizarTabla(); 
    }
  
    resetearCartasAbiertas() {
      const primeraCartaAbierta = document.querySelector(
        `.board-game figure.opened[data-imagen='${this.carta1}']`
      );
      const segundaCartaAbierta = document.querySelector(
        `.board-game figure.opened[data-imagen='${this.carta2}']`
      );
  
      primeraCartaAbierta.classList.remove("opened");
      segundaCartaAbierta.classList.remove("opened");
  
      this.carta1 = null;
      this.carta2 = null;
  
      this.puedeJugar = true;
    }
  
    verificarSiGano() {
      this.paresEncontrados++;
  
      this.carta1 = null;
      this.carta2 = null;
      this.puedeJugar = true;
  
      if (this.numeroMaximoPares == this.paresEncontrados) {
        alert("Felicidades completaste el tablero");
        this.iniciarNuevoJuego();
      }
      this.actualizarTabla(); 
    }
  
    iniciarNuevoJuego() {
      this.quitarEventosClick();
      this.cartas.forEach((carta) => carta.classList.remove("opened"));
  
      setTimeout(this.iniciarJuego.bind(this), 1000);
    }
  
    actualizarTabla() {
      const movimientosElement = document.getElementById("movimientos");
      const aciertosElement = document.getElementById("aciertos");
  
      movimientosElement.textContent = this.movimientos.toString();
      aciertosElement.textContent = this.aciertos.toString();
    }
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    new Memorama();
  });
  function updateClock() {
  var now = new Date();
  var hour = now.getHours();
  var minutes = now.getMinutes();
  var seconds = now.getSeconds();
  var ampm = hour >= 12 ? "PM" : "AM";

  // Formatear las horas a 12 horas
  hour = hour % 12;
  hour = hour ? hour : 12;

  // Agregar un cero inicial a los minutos y segundos si son menores a 10
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  // Actualizar los elementos HTML con los valores de la hora
  document.getElementById("hora").textContent = hour;
  document.getElementById("minutos").textContent = minutes;
  document.getElementById("segundos").textContent = seconds;
  document.getElementById("ampm").textContent = ampm;
}

// Actualizar el reloj cada segundo
setInterval(updateClock, 1000);

// Actualizar el reloj al cargar la página
updateClock();
