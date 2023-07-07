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

function mostrarMenu() {
  modo = "mostrarMenu";
  opcionDiv.innerHTML = `
    <ul>
      <li class="menus">1-Consultar saldo</li>
      <li class="menus">2-Retirar dinero</li>
      <li class="menus">3-Depositar dinero</li>
    </ul>`;
}

function ocultarMenu() {
  opcionDiv.innerHTML = "";
}

function mostrarRetirar() {
  modo = "retirarDinero";
  opcionDiv.innerHTML = `
    <input type="number" placeholder="Ingrese el monto a retirar">
    <button onclick="retirarDinero()">Confirmar Retiro</button>
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
    opcionDiv.innerHTML = `
      <p>Retiro de saldo exitoso. Su saldo restante es: ${usuarioActual.saldo}</p>`;
   
  } else {
    opcionDiv.innerHTML = `
      <p>Saldo insuficiente</p>`;
  
  }
  modo = "gracias";
}

function mostrarDepositar() {
  modo = "depositarDinero";
  opcionDiv.innerHTML = `
    <input type="number" placeholder="Ingrese el monto a depositar">
    `;

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
aceptarDeposito();

}

function aceptarDeposito() {

  opcionDiv.innerHTML = 
  `<p>Depósito de saldo exitoso. Su saldo es: ${usuarioActual.saldo}</p>`;
  modo = "gracias";
    
}


function consultarSaldo() {
  alert("Su saldo es: " + usuarioActual.saldo);
}

function salir() {
  let respuesta = confirm("¿Seguro que desea salir?");
  if (respuesta) {
    let deposito = usuarioActual.historialMovimientos.filter(movimiento => movimiento.tipo === "depósito");
    let retiro = usuarioActual.historialMovimientos.filter(movimiento => movimiento.tipo === "retiro");

    let mensaje = "";

    if (deposito.length > 0) {
      mensaje += "Historial de depósitos:\n";
      deposito.forEach(movimiento => {
        mensaje += "Monto: " + movimiento.monto + " - Saldo Actual: " + movimiento.saldoActual + "\n";
      });
    }

    if (retiro.length > 0) {
      mensaje += "\nHistorial de retiros:\n";
      retiro.forEach(movimiento => {
        mensaje += "Monto: " + movimiento.monto + " - Saldo Actual: " + movimiento.saldoActual + "\n";
      });
    }

    if (mensaje === "") {
      alert("No hay registros de depósitos o retiros.");
    } else {
      alert(mensaje);
    }

    location.reload(); // Recargar la página para volver al HTML original
  } else {
    return true;
  }
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
    <p>Contraseña correcta</p>`;
  modo = "gracias";
}

function mostrarMensajeContraseñaIncorrecta() {
  opcionDiv.innerHTML = `
    <p>Contraseña incorrecta</p>`;
  modo = "mal"
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
    }
  });
}