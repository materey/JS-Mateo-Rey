// Función para calcular el precio del seguro
function calcularPrecioSeguro(edad, modelovehiculo, cobertura) {
    let precioBase = 50; // Precio base del seguro
    let precioTotal = precioBase;

    // Ajustar precio base según la edad del asegurado
    if (edad < 21) {
        precioTotal += 10; // Recargo para menores de 25 años
    } else if (edad > 60) {
        precioTotal += 30; // Recargo para mayores de 65 años
    } else {precioTotal += 20;}

    // Ajustar precio base según el modelo de vehiculo del asegurado
    if (modelovehiculo === 'moto') {
        precioTotal += 10; // Recargo para motos
    } else if (modelovehiculo === 'auto') {
        precioTotal += 30; // Recargo para autos
    } else if (modelovehiculo === 'camioneta') { 
        precioTotal += 50; // Recargo para camionetas
    }

    // Ajustar precio base según el tipo de cobertura seleccionada
    if (cobertura === 'amplia') {
        precioTotal += 50; // Recargo por cobertura amplia
    } else if (cobertura === 'basica') {
        precioTotal += 30; // Recargo por cobertura básica
    } 

    return precioTotal;
}

// Función para interactuar con el usuario y mostrar el precio del seguro
function cotizarSeguro() {
    let edad = parseInt(prompt('Ingrese su edad:'));
    let modelovehiculo = prompt('Ingrese su modelo de vehiculo (moto/auto/camioneta):').toLowerCase();
    let cobertura = prompt('Ingrese el tipo de cobertura (basica/amplia):').toLowerCase();

    // Validar la entrada del usuario
    if (isNaN(edad) || (modelovehiculo !== 'moto' && modelovehiculo !== 'auto' && modelovehiculo != 'camioneta') || (cobertura !== 'basica' && cobertura !== 'amplia')) {
        alert('Ingrese datos validos.');
        return;
    }

    // Calcular el precio del seguro
    let precioSeguro = calcularPrecioSeguro(edad, modelovehiculo, cobertura);

    // Mostrar el precio del seguro al usuario
    alert('El precio de su seguro es: $' + precioSeguro);
}

// Llamar a la función para cotizar el seguro
cotizarSeguro();
