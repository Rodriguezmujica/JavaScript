export let cuentas = [
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

 export let usuarioActual = null;

  export function validarContraseña() {
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
  export function mostrarMensajeContraseñaCorrecta() {
    opcionDiv.innerHTML = `
      <h1>Contraseña correcta</h1>
     <div></div>
      <p class="continuar">Presione el boton <span class="verde">Verde</span> para continuar</p>`;
    modo = "gracias";
  }
  
  
  export function mostrarMensajeContraseñaIncorrecta() {
    opcionDiv.innerHTML = `
      <h2 class="rojo">Contraseña incorrecta</h2>
      <p class="continuar">Presione el boton <span class="verde">Verde</span> para continuar</p>`;
    modo = "mal"
  }

  export function retirarDinero() {
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

  export function depositarDinero() {
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
  
  
  
  
  export function cargarDatosLocalStorage() {
    if (localStorage.getItem("cuentas")) {
      cuentas = JSON.parse(localStorage.getItem("cuentas"));
    }
  }
  
  export function guardarDatosLocalStorage() {
    localStorage.setItem("cuentas", JSON.stringify(cuentas));
  }
  