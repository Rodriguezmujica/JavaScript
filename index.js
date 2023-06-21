let cuenta = {
  saldo: 1000,
  contraseña: 2020,
  historialMovimientos: []
};

let continuar = true;

let ingreseContraseña = prompt("Ingrese contraseña:");

if (parseInt(ingreseContraseña) === cuenta.contraseña) {
  alert("Contraseña correcta");

  function mostrarMenu() {
    alert("Bienvenido Bancoder\nSeleccione una de las opciones:\n1- Consultar saldo\n2- Retirar dinero\n3- Depositar dinero\n4- Salir");
  }

  function retirarDinero(monto) {
    if (monto <= cuenta.saldo) {
      cuenta.saldo -= monto;
      alert("Retiro de saldo exitoso. Su saldo restante es: " + cuenta.saldo);
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
    alert("Depósito de saldo exitoso. Su saldo es: " + cuenta.saldo);
    cuenta.historialMovimientos.push({
      tipo: "depósito",
      monto: monto,
      saldoActual: cuenta.saldo
    });
  }

  function consultarSaldo() {
    alert("Su saldo es: " + cuenta.saldo);
  }

  function salir() {
    let respuesta;
    do {
      respuesta = prompt("¿Seguro que desea salir? Elija 'si' o 'no'.");
      respuesta = respuesta.toLowerCase(); // Convertir respuesta a minúsculas
  
      if (respuesta === "si") {
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
  
        return false;
      } else if (respuesta === "no") {
        return true;
      } else {
        alert("La opción ingresada no es correcta. Por favor, ingrese 'si' o 'no'.");
      }
    } while (true);
  }

  while (continuar) {
    mostrarMenu();
    let opcion = parseInt(prompt("Ingrese una opción"));

    switch (opcion) {
      case 1:
        consultarSaldo();
        break;
      case 2:
        let montoRetiro = parseInt(prompt("Ingrese el monto a retirar"));
        retirarDinero(montoRetiro);
        break;
      case 3:
        let montoDeposito = parseInt(prompt("Ingrese el monto a depositar"));
        depositarDinero(montoDeposito);
        break;
      case 4:
        continuar = salir();
        break;
      default:
        alert("Opción inválida");
        break;
    }
  }

  let deposito = cuenta.historialMovimientos.filter(movimiento => movimiento.tipo === "depósito");
  console.log(deposito);
} else {
  alert("Contraseña incorrecta");
}