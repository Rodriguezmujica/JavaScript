let cuenta = {
  saldo: 1000,
  contraseña: 2020,
  historialMovimientos: []
};

let continuar = true;

let ingreseContraseña = prompt("Ingrese contraseña:");

if (parseInt(ingreseContraseña) === cuenta.contraseña) {
  alert("Contraseña correcta");


while (continuar){
    mostrarMenu();
    let opcion = parseInt(prompt("Ingrese una opción"));
    
    switch(opcion) {
        case 1: 
        consultarSaldo(cuenta.saldo);
        break;
        case 2:
            let montoRetiro = parseInt(prompt("Ingrese monto a retirar"));
            retirarDinero(montoRetiro, cuenta.saldo);
            break;
          case 3:
            let montoDeposito = parseInt(prompt("Ingrese monto a depositar."));
            depositarDinero(montoDeposito, cuenta.saldo);
            break;
        case 4:
      continuar = salir()
        break;
        default:
            alert("Opcion invalida.")
            break;
    }
}

function mostrarMenu() {
alert("Bienvenido Bancoder\n selecione una de las opciones \n 1- consulte su saldo \n 2- retire dinero \n 3- deposite dinero \n 4-salir ")
}

function retirarDinero(monto) {
  if (monto <= cuenta.saldo) {
    cuenta.saldo -= monto;
    alert("Retiro de saldo exitoso, su saldo restante es: " + cuenta.saldo);
    cuenta.historialMovimientos.push({
      tipo: "retiro",
      monto: monto,
      saldoActual: cuenta.saldo
    });
  } else {
    alert("Saldo insuficiente");
  }
}


function depositarDinero(monto) {
  cuenta.saldo += monto;
  alert("Su saldo es = " + cuenta.saldo);
  cuenta.historialMovimientos.push({
    tipo: "depósito",
    monto: monto,
    saldoActual: cuenta.saldo
  });
}

function consultarSaldo() {
  alert("Su saldo es = " + cuenta.saldo);
}


function salir() {
    let respuesta;
    do {
      respuesta = prompt("¿Seguro que desea salir? elegir si o no.").toLowerCase();
      if (respuesta === "si") {
        return false; 
      } else if (respuesta === "no") {
        return true;
      } else {
        alert("La opción ingresada no es correcta. Por favor, ingrese 'si' o 'no'.");
      }
    } while (true);
  }

  for (let i = 0; i < cuenta.historialMovimientos.length; i++) {
    let movimiento = cuenta.historialMovimientos[i];
    let mensaje = "";
    if (movimiento.tipo === "retiro") {
      mensaje = "Retiro de saldo: " + movimiento.monto + ", saldo restante: " + movimiento.saldoActual;
    } else if (movimiento.tipo === "depósito") {
      mensaje = "Depósito de saldo: " + movimiento.monto + ", saldo actual: " + movimiento.saldoActual;
    }
    alert(mensaje);
  }

} else {
    alert("Contraseña incorrecta");
  }