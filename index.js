let saldo = 1000;
let contraseña = 2020;
let continuar = true

let ingreseContraseña = prompt("Ingrese contraseña:");

if (parseInt(ingreseContraseña) === contraseña) {
  alert("Contraseña correcta");
} else {
  alert("Contraseña incorrecta");
}

while (continuar){
    mostrarMenu();
    let opcion = parseInt(prompt("Ingrese una opción"));
    
    switch(opcion) {
        case 1: 
        consultarSaldo(saldo);
        break;
        case 2:
        let retirarDinero = prompt(parseInt("Ingrese monto a retirar"));
        retirarDinero(retirarDinero, saldo)
        break;
        case 3:
        let depositardinero = prompt(parseInt("Ingrese monto a depositar."));
        depositardinero(depositardinero, saldo)
        break;
        case 4:
        continuar = false;
        default:
            alert("Opcion invalida.")
            break;
    }
}

function mostrarMenu() {
alert("Bienvenido Bancoder\n selecione una de las opciones \n 1- consulte su saldo \n 2- retire dinero \n 3- deposite dinero \n 4-salir ")
}

function retirarDinero(monto,saldo) {
    if (monto <= saldo ) {
        saldo -= monto ;
        alert("retiro de saldo exitoso, su saldo restante es : " + saldo);
  }else {
    alert("saldo insuficiente")
  }
}

function depositardinero(monto,saldo) {
saldo += monto;
alert("Su saldo es = " + monto);

}
