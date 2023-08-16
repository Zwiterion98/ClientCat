function calcularEstadisticasCuestionarios(listaObjetos) {
    const estadisticas = {
        reuniones: { mensual: 0, quincenal: 0, semanal: 0 },
        propuestas: { mensual: 0, quincenal: 0, semanal: 0 },
        mail: { quincenal: 0, semanal: 0, diario: 0 },
        tareas: { quincenal: 0, semanal: 0, diario: 0 },
        inversion: { total: 0, max: -Infinity, min: Infinity },
        contrato: { si: 0, no: 0 },
        presupuesto: { si: 0, no: 0 },
        presencia: { si: 0, no: 0 },
        pago: { '0a2': 0, '2a4': 0, '+5': 0 },
        predisposicion: { si: 0, no: 0 },
        organizacion: { si: 0, no: 0 },
        conocimiento: { si: 0, no: 0 },
        pedido: { si: 0, no: 0 },
        urgencia: { si: 0, no: 0 },
        contacto: { si: 0, no: 0 },
        cambios: { '0a2': 0, '2a4': 0, '+5': 0 },
        tipos: { A: 0, B: 0, C: 0 },
        analizados: 0,
        nombresAnalizados: [],
        inversionMax: -Infinity,
        inversionMin: Infinity
    };

    for (const objeto of listaObjetos) {
        console.log(objeto.cuestionary.length)
        if (objeto.cuestionary && objeto.cuestionary.length > 0) {
            console.log("entre")
            const cuestionario = objeto.cuestionary[0].responses;
            console.log(objeto.name)
            if (cuestionario && Object.keys(cuestionario).length > 0) {
                estadisticas.analizados++;
                estadisticas.nombresAnalizados.push(objeto.name);

                for (const clave in cuestionario) {
                    if (estadisticas.hasOwnProperty(clave)) {
                        if (typeof estadisticas[clave] === 'object') {
                            estadisticas[clave][cuestionario[clave]]++;
                            if (clave === 'inversion') {
                                const inversionValue = parseInt(cuestionario[clave]) || 0;
                                estadisticas.inversion.total += inversionValue;
                                estadisticas.inversionMax = Math.max(estadisticas.inversionMax, inversionValue);
                                estadisticas.inversionMin = Math.min(estadisticas.inversionMin, inversionValue);
                            }
                        } else {
                            estadisticas[clave][cuestionario[clave]]++;
                        }
                    }
                }

                // Contar tipos
                const tipo = objeto.type;
                if (tipo && estadisticas.tipos.hasOwnProperty(tipo)) {
                    estadisticas.tipos[tipo]++;
                }
            }
        }
    }

    // Calcular el promedio de inversion
    if (estadisticas.analizados > 0) {
        estadisticas.inversion.promedio = estadisticas.inversion.total / estadisticas.analizados;
    }

    return estadisticas;
}

function calcularEstadisticasInversionPorTipo(estadisticas, listaObjetos) {
    const inversionPorTipo = {
        A: [],
        B: [],
        C: []
    };

    for (const objeto of listaObjetos) {
        if (objeto.type && estadisticas.tipos.hasOwnProperty(objeto.type)) {
            const tipo = objeto.type;
            const inversionValue = parseInt(objeto.cuestionary[0].responses.inversion) || 0;
            inversionPorTipo[tipo].push(inversionValue);
        }
    }

    const resultados = {};
    for (const tipo in inversionPorTipo) {
        if (inversionPorTipo[tipo].length > 0) {
            resultados[tipo] = {
                max: Math.max(...inversionPorTipo[tipo]),
                min: Math.min(...inversionPorTipo[tipo]),
                promedio: inversionPorTipo[tipo].reduce((sum, value) => sum + value, 0) / inversionPorTipo[tipo].length
            };
        }
    }

    return resultados;
}

const estadistica = async () => {
    let listaObjetos = await obtenerClientes();
    if (Array.isArray(listaObjetos) && listaObjetos.length > 0) {
        const estadisticas = calcularEstadisticasCuestionarios(listaObjetos);

        const estadisticasInversionPorTipo = calcularEstadisticasInversionPorTipo(estadisticas, listaObjetos);

        // Obtener el contenedor de gráficos de barras
        const graficosContainer = document.getElementById('graficosContainer');

         // Obtener el contenedor de nombres analizados
         const listaNombresAnalizados = document.getElementById('listaNombresAnalizados');

          // Limpiar contenido previo
        graficosContainer.innerHTML = '';
        listaNombresAnalizados.innerHTML = '';
        // Crear un gráfico de barras para cada valor de respuesta
        for (const respuesta in estadisticas) {
            if (respuesta !== 'analizados' && respuesta !== 'nombresAnalizados' && respuesta !== 'tipos') {
                const canvas = document.createElement('canvas');
                canvas.id = `grafico${respuesta}`;
                graficosContainer.appendChild(canvas);
                
                const ctxBar = canvas.getContext('2d');

                const chart = new Chart(ctxBar, {
                    type: 'bar',
                    data: {
                        labels: Object.keys(estadisticas[respuesta]),
                        datasets: [{
                            label: `Respuestas de ${respuesta}`,
                            data: Object.values(estadisticas[respuesta]),
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1
                        }]
                    },
                    options: {
                        responsive: true,
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });
            }
        }
        // Crear la tabla de nombres analizados
        estadisticas.nombresAnalizados.forEach(nombre => {
            const listItem = document.createElement('li');
            listItem.textContent = nombre;
            listItem.addEventListener('click', () => {
                // Resaltar áreas en los gráficos correspondientes al nombre seleccionado
                for (const respuesta in estadisticas) {
                    if (respuesta !== 'analizados' && respuesta !== 'nombresAnalizados' && respuesta !== 'tipos') {
                        const chart = Chart.getChart(`grafico${respuesta}`);
                        const index = estadisticas.nombresAnalizados.indexOf(nombre);
                        chart.data.datasets[0].backgroundColor = Array(estadisticas.nombresAnalizados.length).fill('rgba(75, 192, 192, 0.2)');
                        chart.data.datasets[0].backgroundColor[index] = 'rgba(75, 192, 192, 0.6)';
                        chart.update();
                    }
                }
            });
            listaNombresAnalizados.appendChild(listItem);
        });

        // Mostrar estadísticas de inversión
        const inversionStats = document.getElementById('inversionStats');
        inversionStats.innerHTML = `
        <p>Máximo: ${estadisticas.inversionMax}</p>
        <p>Mínimo: ${estadisticas.inversionMin}</p>
        <p>Media: ${estadisticas.inversion.total/estadisticas.analizados}</p>
        `;


        // Crear un gráfico de pastel para la distribución de tipos
        const ctxPie = document.getElementById('graficoPastel').getContext('2d');
        new Chart(ctxPie, {
            type: 'pie',
            data: {
                labels: ['Tipo A', 'Tipo B', 'Tipo C'],
                datasets: [{
                    label: 'Distribución por Tipo',
                    data: [estadisticas.tipos.A, estadisticas.tipos.B, estadisticas.tipos.C],
                    backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(75, 192, 192)'],
                    hoverOffset: 4
                }]
            }
        });
        console.log('Estadísticas de inversión por tipo:', estadisticasInversionPorTipo);

    } else {
        console.log("No hay datos para calcular estadísticas.");
    }
}

const filtrarClientes = async(filtro, lista, pm) => {
    

}


estadistica();



