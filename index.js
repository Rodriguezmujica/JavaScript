let cuentas = [
  {
    usuario: "usuario1",
    saldo: 1000,
    contraseña: 2020,
    historialMovimientos: []
  },
  {
    usuario: "usuario2",
    saldo: 2000,
    contraseña: 1234,
    historialMovimientos: []
  }
];

let usuarioActual = null;
let continuar = true;
let passwordInput = document.getElementById("password-input");
let saldoActualDiv = document.getElementById("saldo-actual");
let opcionDiv = document.getElementById("opcion-div");
let saldoAnteriorDiv = document.getElementById("saldo-anterior");
let modo = "ingresoContraseña";

// Cargar datos del localStorage al inicio
cargarDatosLocalStorage();





function mostrarMenu() {
  modo = "mostrarMenu";
  opcionDiv.innerHTML = `
  
  <h1>Selecione una opcion</h1>
    <ul>
      <li class="menus">1-Consultar saldo</li>
      <li class="menus">2-Retirar dinero</li>
      <li class="menus">3-Depositar dinero</li>
      <li class="menus">4-Consultar en dolares</li>
    </ul>`;
}

function ocultarMenu() {
  opcionDiv.innerHTML = "";
}

function mostrarRetirar() {
  modo = "retirarDinero";
  opcionDiv.innerHTML = `
  <h2>Ingrese el monto a retirar</h2>
    <input class="input" type="number" >
    <p class="continuar">Presione el boton <span class="verde">Verde</span> para continuar</p>
  `;
}

function retirarDinero() {
  modo = "aceptarRetiro";
  let monto = parseInt(opcionDiv.querySelector("input").value);
  if (monto <= usuarioActual.saldo) {
    usuarioActual.saldo -= monto;
    saldoActualDiv.textContent = usuarioActual.saldo;
    usuarioActual.historialMovimientos.push({
      tipo: "retiro",
      monto: monto,
      saldoActual: usuarioActual.saldo
    });
    guardarDatosLocalStorage(); // Guardar los datos actualizados en el localStorage
    opcionDiv.innerHTML = `
      <h2>Retiro de saldo exitoso.<br> Su saldo restante es: <span class="verde"> ${usuarioActual.saldo}</span></h2>
      <p class="continuar">Presione el boton <span class="verde">Verde</span> para continuar</p>`;
  } else {
    opcionDiv.innerHTML = `
      <h2 class="rojo">Saldo insuficiente</h2>
      <p class="continuar">Presione el boton <span class="verde">Verde</span> para continuar</p>`;
  }
  modo = "gracias";
}

function mostrarDepositar() {
  modo = "depositarDinero";
  opcionDiv.innerHTML = `
  <h2>Ingrese el monto a depositar.</h2>
    <input class="input" type="number">
    <p class="continuar">Presione el boton <span class="verde">Verde</span> para continuar</p>`;

}

function depositarDinero() {
  let monto = parseInt(opcionDiv.querySelector("input").value);
  usuarioActual.saldo += monto;
  saldoActualDiv.textContent = usuarioActual.saldo;
  usuarioActual.historialMovimientos.push({
    tipo: "depósito",
    monto: monto,
    saldoActual: usuarioActual.saldo
  });
  guardarDatosLocalStorage(); // Guardar los datos actualizados en el localStorage
  aceptarDeposito();
}

function aceptarDeposito() {

  opcionDiv.innerHTML = 
  `<h3>Depósito de saldo exitoso. Su saldo es: ${usuarioActual.saldo}</h3>
  <p class="continuar">Presione el boton <span class="verde">Verde</span> para continuar</p>`;
  modo = "gracias";
    
}


function consultarSaldo() {
  opcionDiv.innerHTML = `
    <h1>Su saldo es: ${usuarioActual.saldo} CLP</h1>
    <p class="continuar">Presione el boton <span class="verde">Verde</span> para continuar</p>`;
  modo = "gracias";
}

function solicitarMontoConversion() {
  modo = "divisas";
  opcionDiv.innerHTML = `
  <h2>Ingrese el monto en pesos a convertir en dolares</h2>
    <input class="input" type="number" id="conversion-input" step="0.01">   
    <p class="continuar">Presione el boton <span class="verde">Verde</span> para continuar</p> `;
}

function realizarConversion() {
  modo = "gracias";
  const conversionInput = document.getElementById('conversion-input');
  const amount = parseFloat(conversionInput.value);

  const url = `https://v6.exchangerate-api.com/v6/0de7b341cf0080c4650116be/pair/CLP/USD/${amount}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const convertedAmount = data.conversion_result;
      const formattedAmount = convertedAmount.toFixed(2);

      opcionDiv.innerHTML = `
        <h2>El monto convertido a dolar es:<span class="verde"> $${formattedAmount} </span></h2>
        <p class="continuar">Presione el boton <span class="verde">Verde</span> para continuar</p>`;
    })
    .catch(error => {
      console.log('Error:', error);
    });
}

function salir() {
  modo = "alrevez";
  let deposito = usuarioActual.historialMovimientos.filter(movimiento => movimiento.tipo === "depósito");
  let retiro = usuarioActual.historialMovimientos.filter(movimiento => movimiento.tipo === "retiro");
  let confirmacionHTML;
  let mensaje = "";

  if (deposito.length > 0) {
    mensaje += "Historial de depósitos:<br>";
    deposito.forEach(movimiento => {
      mensaje += "Monto: " + movimiento.monto + " - Saldo Actual: " + movimiento.saldoActual + "<br>";
    });
  }

  if (retiro.length > 0) {
    mensaje += "<br>Historial de retiros:<br>";
    retiro.forEach(movimiento => {
      mensaje += "Monto: " + movimiento.monto + " - Saldo Actual: " + movimiento.saldoActual + "<br>";
    });
  }

  if (mensaje === "") {
    confirmacionHTML = `<p>¿Seguro que desea salir?</p> 
      <p>No hay registros de depósitos o retiros.</p>`;
  } else {
    confirmacionHTML = `
    <p>¿Seguro que desea salir?</p> 
      <p>${mensaje}</p>`;
  }

  opcionDiv.innerHTML = confirmacionHTML;
  guardarDatosLocalStorage();
}

function confirmarSalida() {
  location.reload();
}

function cancelarSalida() {
  mostrarMenu();
}





function validarContraseña() {
  modo = "ingresoContraseña";
  let contraseña = parseInt(passwordInput.value);
  let usuarioEncontrado = cuentas.find(cuenta => cuenta.contraseña === contraseña);
  if (usuarioEncontrado) {
    usuarioActual = usuarioEncontrado;
    document.querySelector(".display").style.display = "block";
    saldoAnteriorDiv.textContent = "Saldo anterior: " + usuarioActual.saldo;
    saldoActualDiv.textContent = usuarioActual.saldo;
    mostrarMensajeContraseñaCorrecta();
  } else {
    mostrarMensajeContraseñaIncorrecta();
  }
  passwordInput.value = "";
}

function mostrarMensajeContraseñaCorrecta() {
  opcionDiv.innerHTML = `
    <h1>Contraseña correcta</h1>
   <div></div>
    <p class="continuar">Presione el boton <span class="verde">Verde</span> para continuar</p>`;
  modo = "gracias";
}

function mostrarMensajeContraseñaIncorrecta() {
  opcionDiv.innerHTML = `
    <h2 class="rojo">Contraseña incorrecta</h2>
    <p class="continuar">Presione el boton <span class="verde">Verde</span> para continuar</p>`;
  modo = "mal"
}

function cargarDatosLocalStorage() {
  if (localStorage.getItem("cuentas")) {
    cuentas = JSON.parse(localStorage.getItem("cuentas"));
  }
}

function guardarDatosLocalStorage() {
  localStorage.setItem("cuentas", JSON.stringify(cuentas));
}

// Evento de clic para los botones del teclado
let buttons = document.getElementsByClassName("numero");
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", function () {
    let value = this.textContent;

    // Comprobar el modo actual del programa
    switch (modo) {
      case "ingresoContraseña":
        switch (value) {
          case "Salir":
            continuar = salir();
            break;
          case "Enter":
            if (passwordInput.value !== "") {
              validarContraseña();
            }
            break;
          case "Borrar":
            passwordInput.value = passwordInput.value.slice(0, -1);
            break;
          default:
            passwordInput.value += value;
            break;
        }
        break;
      case "mostrarMenu":
        switch (value) {
          case "enter":
            mostrarMenu()
            break;
          case "1":
            consultarSaldo();
            break;
          case "2":
            mostrarRetirar();
            break;
          case "3":
            mostrarDepositar();
            break;
            case "4":
              solicitarMontoConversion(); // Llama a la función para solicitar el monto a convertir
              break;
          case "Salir":
            continuar = salir();
            break;
          case "Borrar":
            passwordInput.value = passwordInput.value.slice(0, -1);
            break;
          default:
            passwordInput.value += value;
            break;
        }
        break;
      case "retirarDinero":
        // Acciones para el modo "retirarDinero" cuando se presionan los botones
        switch (value) {
          case "Salir":
            continuar = salir();
            break;
          case "Enter":
            retirarDinero();
            break;
          case "Borrar":
            let input = opcionDiv.querySelector("input");
            input.value = input.value.slice(0, -1);
            break;
          default:
            opcionDiv.querySelector("input").value += value;
            break;
        }
        break;

      case "depositarDinero":
        // Acciones para el modo "depositarDinero" cuando se presionan los botones
        switch (value) {
          case "Salir":
            continuar = salir();
            break;
          case "Enter":
            depositarDinero();
            break;
          case "Borrar":
            let input = opcionDiv.querySelector("input");
            input.value = input.value.slice(0, -1);
            break;
          default:
            opcionDiv.querySelector("input").value += value;
            break;
        }
        break;
         case "gracias":
        switch (value) {
          case "Enter":
            mostrarMenu();
            break;
          case "Salir":
            continuar = salir();
            break;
        }
        break;
      case "mal":
        switch (value) {
          case "Enter":
            location.reload();
        }
        case "alrevez":
          switch (value) {
            case "Enter":
              confirmarSalida();
              break;
            case "Salir":
              cancelarSalida();
              break;
            default:
              break;
          }
          break;
          case "divisas":
           switch (value) {
              case "Salir":
                continuar = salir();
                break;
              case "Enter":
                realizarConversion();
                break;
              case "Borrar":
                let input = opcionDiv.querySelector("input");
                input.value = input.value.slice(0, -1);
                break;
              default:
                opcionDiv.querySelector("input").value += value;
                break;
            }
            break;
      }
    });
  }

function moverTarjeta() {
  var div = document.getElementById('creditCard');
  div.classList.add('movedCreditCard');
  div.style.bottom = "-100px";
}
