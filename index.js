let saldo = 1000;
let contraseña = 2020;
let continuar = true

let ingreseContraseña = prompt("Ingrese contraseña:");

if (parseInt(ingreseContraseña) === contraseña) {
  alert("Contraseña correcta");


while (continuar){
    mostrarMenu();
    let opcion = parseInt(prompt("Ingrese una opción"));
    
    switch(opcion) {
        case 1: 
        consultarSaldo(saldo);
        break;
        case 2:
            let montoRetiro = parseInt(prompt("Ingrese monto a retirar"));
            retirarDinero(montoRetiro, saldo);
            break;
          case 3:
            let montoDeposito = parseInt(prompt("Ingrese monto a depositar."));
            depositarDinero(montoDeposito, saldo);
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
    if (monto <= saldo ) {
        saldo -= monto ;
        alert("retiro de saldo exitoso, su saldo restante es : " + saldo);
  }else {
    alert("saldo insuficiente")
  }
}

function depositarDinero(monto) {
saldo += monto;
alert("Su saldo es = " + saldo);

}

function consultarSaldo(saldo) {
    alert("Su saldo es = " + saldo);
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

} else {
    alert("Contraseña incorrecta");
  }