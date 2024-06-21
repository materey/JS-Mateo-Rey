// Definir una clase para el Seguro
class Seguro {
    constructor(edad, modeloVehiculo, cobertura, domicilio) {
        this.edad = edad;
        this.modeloVehiculo = modeloVehiculo;
        this.cobertura = cobertura;
        this.domicilio = domicilio;
    }

    // Método para calcular el precio del seguro
    calcularPrecio(recargosDomicilio) {
        let precioBase = 50; // Precio base del seguro
        let precioTotal = precioBase;

        // Ajustar precio base según la edad del asegurado
        if (this.edad < 25) {
            precioTotal += 20; // Recargo para menores de 25 años
        } else if (this.edad > 65) {
            precioTotal += 30; // Recargo para mayores de 65 años
        }

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

        if(recargosDomicilio[this.domicilio]) {
            precioTotal += recargosDomicilio[this.domicilio];
        }
        
        return precioTotal;
    }
}


document.getElementById('cotizarBtn').addEventListener('click', function() {
    let edad = parseInt(document.getElementById('edad').value);
    let modeloVehiculo = document.getElementById('modeloVehiculo').value;
    let cobertura = document.getElementById('cobertura').value.toLowerCase();
    let domicilio = document.getElementById('domicilio').value;


    const modelosValidos = ['economico', 'sedan', 'suv', 'deportivo'];
    const zonasValidas = ['zonaOeste', 'zonaSur', 'zonaNorte', 'zonaEste'];
    if (isNaN(edad) || !modelosValidos.includes(modeloVehiculo) || (cobertura !== 'basica' && cobertura !== 'amplia') || !zonasValidas.includes(domicilio)) {
        alert('Por favor, ingrese datos válidos.');
        return;
    }

    fetch('data/zonas.json')
        .then(response => response.json())
        .then(recargosDomicilio => { 
            let seguro = new Seguro(edad, modeloVehiculo, cobertura, domicilio);
            let precioSeguro = seguro.calcularPrecio(recargosDomicilio);

            let cotizaciones = JSON.parse(localStorage.getItem('cotizaciones')) || [];
            cotizaciones.push({ seguro, precioSeguro });
            localStorage.setItem('cotizaciones', JSON.stringify(cotizaciones));

            mostrarCotizaciones([ { seguro, precioSeguro } ]);
        })
        .catch(error => console.error('Error al cargar recargos por zona:', error));
});


        function mostrarCotizaciones(cotizaciones) {
            let resultadosDiv = document.getElementById('resultados');
            resultadosDiv.innerHTML = ''; 
        
            cotizaciones.forEach(cotizacion => {
                let cotizacionDiv = document.createElement('div');
                cotizacionDiv.innerHTML = `Edad: ${cotizacion.seguro.edad}, Modelo del Vehículo: ${cotizacion.seguro.modeloVehiculo}, Cobertura: ${cotizacion.seguro.cobertura}, Domicilio: ${cotizacion.seguro.domicilio}, Precio: $${cotizacion.precioSeguro}`;
                resultadosDiv.appendChild(cotizacionDiv);
            });
        }

        document.addEventListener('DOMContentLoaded', function() {
            let cotizaciones = JSON.parse(localStorage.getItem('cotizaciones')) || [];
            
        
            
            fetch('data/vehicles.json') 
                .then(response => response.json())
                .then(data => {
                    console.log('Datos cargados:', data);
                })
                .catch(error => console.error('Error al cargar datos:', error));
        });