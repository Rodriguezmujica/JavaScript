
import { usuarioActual, guardarDatosLocalStorage, mostrarMenu } from "./cuentas.js";

export function inicio() {
    Swal.fire({
      title: 'Por favor Ingrese su tarjeta.',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      },
      didClose: moverTarjeta // Llamamos a moverTarjeta cuando se cierra SweetAlert2
    });
  }

 export function mostrarMenu() {
    modo = "mostrarMenu";
    opcionDiv.innerHTML = 
    `
    
    <h1>Selecione una opcion</h1>
      <ul>
        <li class="menus">1-Consultar saldo</li>
        <li class="menus">2-Retirar dinero</li>
        <li class="menus">3-Depositar dinero</li>
        <li class="menus">4-Consultar en dolares</li>
      </ul>`;
  }
  
 export function ocultarMenu() {
    opcionDiv.innerHTML = "";
  }

  


  export function mostrarRetirar() {
    modo = "retirarDinero";
    opcionDiv.innerHTML = `
    <h2>Ingrese el monto a retirar</h2>
      <input class="input" type="number" >
      <p class="continuar">Presione el boton <span class="verde">Verde</span> para continuar</p>
    `;
  }
  

  
  export function mostrarDepositar() {
    modo = "depositarDinero";
    opcionDiv.innerHTML = `
    <h2>Ingrese el monto a depositar.</h2>
      <input class="input" type="number">
      <p class="continuar">Presione el boton <span class="verde">Verde</span> para continuar</p>`;
  
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
  
  export function aceptarDeposito() {
  
    opcionDiv.innerHTML = 
    `<h3>Depósito de saldo exitoso. Su saldo es: ${usuarioActual.saldo}</h3>
    <p class="continuar">Presione el boton <span class="verde">Verde</span> para continuar</p>`;
    modo = "gracias";
      
  }
  
  
  export function consultarSaldo() {
    opcionDiv.innerHTML = `
      <h1>Su saldo es: ${usuarioActual.saldo} CLP</h1>
      <p class="continuar">Presione el boton <span class="verde">Verde</span> para continuar</p>`;
    modo = "gracias";
  }
  
  export function solicitarMontoConversion() {
    modo = "divisas";
    opcionDiv.innerHTML = `
    <h2>Ingrese el monto en pesos a convertir en dolares</h2>
      <input class="input" type="number" id="conversion-input" step="0.01">   
      <p class="continuar">Presione el boton <span class="verde">Verde</span> para continuar</p> `;
  }
  
  export function realizarConversion() {
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
  
  export function salir() {
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
  
  export function confirmarSalida() {
    location.reload();
  }
  
  export function cancelarSalida() {
    mostrarMenu();
  }
  
