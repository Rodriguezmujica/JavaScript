let cuenta = {
  saldo: 1000,
  contraseña: 2020,
  historialMovimientos: []
};
let continuar = true;
let passwordInput = document.getElementById("password-input");
let saldoActualDiv = document.getElementById("saldo-actual");
let opcionDiv = document.getElementById("opcion-div");
let saldoAnteriorDiv = document.getElementById("saldo-anterior");
let modo = "ingresoContraseña";

function mostrarMenu() {
  modo = "mostrarMenu"; // Cambiar el modo a "mostrarMenu"
  opcionDiv.innerHTML = `
      <ul>
          <li class="menus">1-Consultar saldo</li>
          <li class="menus">2-Retirar dinero</li>
          <li class="menus">3-Depositar dinero</li>
        </ul>  `;
}
function regresarMenu() {
  mostrarMenu();
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
  let monto = parseInt(opcionDiv.querySelector("input").value);
  if (monto <= cuenta.saldo) {
    cuenta.saldo -= monto;
    saldoActualDiv.textContent = cuenta.saldo;
    cuenta.historialMovimientos.push({
      tipo: "retiro",
      monto: monto,
      saldoActual: cuenta.saldo
    });
    opcionDiv.innerHTML = 
    `<p>Retiro de saldo exitoso. Su saldo restante es: ${cuenta.saldo}</p>
    <button onclick="mostrarMenu()">Aceptar</button>`;
    modo = "aceptarRetiro";
  } else {
    opcionDiv.innerHTML = `<p>Saldo insuficiente</p>
    <button onclick="mostrarMenu()">Aceptar</button>`;
    modo = "aceptarRetiro";
  
  }

}

function mostrarDepositar() {
  modo = "depositarDinero";
  opcionDiv.innerHTML = `<input type="number" placeholder="Ingrese el monto a depositar">
    <button onclick="depositarDinero()">Confirmar Deposito</button>`
     ;
}

function depositarDinero() {
  let monto = parseInt(opcionDiv.querySelector("input").value);
  cuenta.saldo += monto;
  saldoActualDiv.textContent = cuenta.saldo;
  cuenta.historialMovimientos.push({
    tipo: "depósito",
    monto: monto,
    saldoActual: cuenta.saldo
  });

  opcionDiv.innerHTML = `<p>Depósito de saldo exitoso. Su saldo es: ${cuenta.saldo}</p>
  <button onclick="mostrarMenu()">Aceptar</button>`
 modo = aceptarRetiro ;
 
}

function consultarSaldo() {
  alert("Su saldo es: " + cuenta.saldo);
}

function salir() {
  let respuesta = confirm("¿Seguro que desea salir?");
  if (respuesta) {
    let deposito = cuenta.historialMovimientos.filter(movimiento => movimiento.tipo === "depósito");
    let retiro = cuenta.historialMovimientos.filter(movimiento => movimiento.tipo === "retiro");

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
  let contraseña = parseInt(passwordInput.value);
  if (contraseña === cuenta.contraseña) {
    document.querySelector(".display").style.display = "block";
    saldoAnteriorDiv.textContent = "Saldo anterior: " + cuenta.saldo;
    saldoActualDiv.textContent = cuenta.saldo;
    opcionDiv.innerHTML = `
      <p>Contraseña correcta</p>
      <button onclick="mostrarMenu()">Aceptar</button>`;
  } else {
    opcionDiv.innerHTML = `
      <p>Contraseña incorrecta</p>
      <button onclick="mostrarMenu()">Aceptar</button>`;
  }
  passwordInput.value = "";
}


function handleOpcion() {
  let opcion = parseInt(document.getElementById("opcion-input").value);
  switch (opcion) {
    case 1:
      consultarSaldo();
      break;
    case 2:
      mostrarRetirar();
      break;
    case 3:
      mostrarDepositar();
      break;
    case 4:
      continuar = salir();
      break;
    default:
      alert("Opción inválida");
      break;
  }
  document.getElementById("opcion-input").value = "";
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
        case "aceptarDeposito":
          switch (value) {
            case "enter":
              mostrarMenu();
              break;
            case "Salir":
              continuar = salir();
              break;
          }
          break;
        
        case "aceptarRetiro":
          switch (value) {
            case "enter":
              regresarMenu();
              break;
            case "Salir":
              continuar = salir();
              break;
          }
          break;

    }
  });
}