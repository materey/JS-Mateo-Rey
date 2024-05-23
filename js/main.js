// Definir una clase para el Seguro
class Seguro {
    constructor(edad, modeloVehiculo, cobertura) {
        this.edad = edad;
        this.modeloVehiculo = modeloVehiculo;
        this.cobertura = cobertura;
    }

    // Método para calcular el precio del seguro
    calcularPrecio() {
        let precioBase = 50; // Precio base del seguro
        let precioTotal = precioBase;

        // Ajustar precio base según la edad del asegurado
        if (this.edad < 25) {
            precioTotal += 20; // Recargo para menores de 25 años
        } else if (this.edad > 65) {
            precioTotal += 30; // Recargo para mayores de 65 años
        } else (precioTotal += 25);   

        // Ajustar precio base según el modelo del vehículo
        const recargosModelo = {
            'economico': 10,
            'sedan': 20,
            'suv': 30,
            'deportivo': 50
        };

        if (recargosModelo[this.modeloVehiculo]) {
            precioTotal += recargosModelo[this.modeloVehiculo];
        }

        // Ajustar precio base según el tipo de cobertura seleccionada
        if (this.cobertura === 'amplia') {
            precioTotal += 50; // Recargo por cobertura amplia
        } else if (this.cobertura === 'basica') {
            precioTotal += 30; // Recargo por cobertura básica
        }

        return precioTotal;
    }
}

// Función para interactuar con el usuario y mostrar el precio del seguro
function cotizarSeguro() {
    // Array para almacenar las cotizaciones
    const cotizaciones = [];

    let continuar = true;

    while (continuar) {
        let edad = parseInt(prompt('Ingrese su edad:'));
        let modeloVehiculo = prompt('Ingrese el modelo de su vehículo (economico/sedan/suv/deportivo):').toLowerCase();
        let cobertura = prompt('Ingrese el tipo de cobertura (basica/amplia):').toLowerCase();

        // Validar la entrada del usuario
        const modelosValidos = ['economico', 'sedan', 'suv', 'deportivo'];
        if (isNaN(edad) || !modelosValidos.includes(modeloVehiculo) || (cobertura !== 'básica' && cobertura !== 'amplia')) {
            alert('Por favor, ingrese datos válidos.');
            continue;
        }

        // Crear un nuevo objeto Seguro y calcular el precio
        let seguro = new Seguro(edad, modeloVehiculo, cobertura);
        let precioSeguro = seguro.calcularPrecio();

        // Almacenar la cotización en el array
        cotizaciones.push({ seguro, precioSeguro });

        // Mostrar el precio del seguro al usuario
        alert('El precio de su seguro es: $' + precioSeguro);

        // Preguntar al usuario si quiere realizar otra cotización
        continuar = confirm('¿Desea realizar otra cotización?');
    }

    // Mostrar todas las cotizaciones realizadas
    console.log('Cotizaciones realizadas:');
    cotizaciones.forEach((cotizacion, index) => {
        console.log(`Cotización ${index + 1}: Edad - ${cotizacion.seguro.edad}, Modelo del Vehículo - ${cotizacion.seguro.modeloVehiculo}, Cobertura - ${cotizacion.seguro.cobertura}, Precio - $${cotizacion.precioSeguro}`);
    });
}

// Llamar a la función para cotizar el seguro
cotizarSeguro();
