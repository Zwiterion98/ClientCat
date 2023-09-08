let clientesSinCuestionario = [];
let clientesConCuestionario = [];

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
    clientesSinCuestionario = [];
    clientesConCuestionario = [];
    for (const objeto of listaObjetos) {
        console.log(objeto.cuestionary.length)
        if (objeto.cuestionary && objeto.cuestionary.length > 0) {
            clientesConCuestionario.push(objeto)
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
        else{
            clientesSinCuestionario.push(objeto);
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

let select_respuestas_d ="";
document.querySelector("#select_respuestas").addEventListener("change", async ()=>{
select_respuestas_d = document.querySelector("#select_respuestas").value;
console.log(select_respuestas_d)
estadistica()
});

const estadistica = async () => {
    let listaObjetos = await obtenerClientes();
    let listaObjetosFinal = [];
    let _users;
    console.log(currentPM)
    if(currentPM == "" ||  currentPM == "todos"){
        listaObjetosFinal = listaObjetos; 
    }
    else{
        _users = await obtenerUsuariosPorNombre(currentPM);
        let keys = Object.keys(_users[0].clients);
        keys.forEach(client => {
            listaObjetos.forEach(_client =>{
                if(_client.name == client){
                    console.log( _client)
                    listaObjetosFinal.push(_client)
                }
            })
        })
    }
    if (Array.isArray(listaObjetosFinal) && listaObjetosFinal.length > 0) {
        const estadisticas = calcularEstadisticasCuestionarios(listaObjetosFinal);

        const estadisticasInversionPorTipo = calcularEstadisticasInversionPorTipo(estadisticas, listaObjetos);

        // Obtener el contenedor de gráficos de barras
        const graficosContainer = document.getElementById('graficosContainer');

         // Obtener el contenedor de nombres analizados
         const listaNombresAnalizados = document.getElementById('listaNombresAnalizados');
         const listaNombresSinAnalizar = document.getElementById("listaNombresSinAnalizar");

          // Limpiar contenido previo
        graficosContainer.innerHTML = '';
        listaNombresAnalizados.innerHTML = '';

        // Destroy existing charts before creating new ones
        Chart.helpers.each(Chart.instances, (instance) => {
            instance.destroy();
        }); 

        // Clear existing child elements
        listaNombresSinAnalizar.innerHTML = '';
        console.log(listaNombresSinAnalizar);

        // Iterate over clientesSinCuestionario and create new list items
        clientesSinCuestionario.forEach(nombre => {
            const listItem = document.createElement('li');
            listItem.textContent = nombre.name;
            listaNombresSinAnalizar.appendChild(listItem);
        });

   

        clientesConCuestionario.forEach(nombre => {
            console.log(nombre)
        const listItem = document.createElement('li');
        listItem.textContent = nombre.name;
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
    console.log(listaNombresAnalizados.childNodes.length)
    const clientA = document.getElementById("clientA");
    const clientB = document.getElementById("clientB");
    const clientC = document.getElementById("clientC");
    clientC.innerHTML = '';
    clientB.innerHTML = '';
    clientA.innerHTML = '';
    let isTiempo = false;
    let isIdeal = false;
    let isAspiracional = false;
    let tiempo = ["reuniones", "propuestas", "mail", "tareas"];
    if(select_respuestas_d == "tiempo"){
        isTiempo = true;
        isIdeal = false;
        isAspiracional = false;
    }
   
    let aspiracional = ["cambios", "predisposicion", "urgencia", "contacto", "pedido", "conocimiento", "organizacion", "pago"];
    if(select_respuestas_d == "aspiracional"){
        isTiempo = false;
        isIdeal = false;
        isAspiracional = true;
    }
   
    let ideal = ["pago", "presupuesto", "presencia", "contrato"];
    if(select_respuestas_d == "ideal"){
        isTiempo = false;
        isIdeal = true;
        isAspiracional = false;
    }
    if(listaNombresAnalizados.childNodes.length > 0){
         // Crear un gráfico de barras para cada valor de respuesta
         for (const respuesta in estadisticas) {
            if((select_respuestas_d == "" || (isTiempo && tiempo.includes(respuesta)) || (isAspiracional && aspiracional.includes(respuesta)) || (isIdeal && ideal.includes(respuesta))) && respuesta != "inversion" && respuesta != "inversionMax" && respuesta != "inversionMin" ){
                console.log(respuesta)
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
            
        }
        // Mostrar tabla tipo de clientes

        
        let clientesConCuestionarioFinal = [];
        console.log(currentPM)
        if(currentPM == "" ||  currentPM == "todos"){
            clientesConCuestionarioFinal = clientesConCuestionario; 
        }
        else{
            _users = await obtenerUsuariosPorNombre(currentPM);
            let keys = Object.keys(_users[0].clients);
            console.log(keys)
            keys.forEach(client => {
                clientesConCuestionario.forEach(_client =>{
                    if(_client.name == client){
                        console.log( _client)
                        clientesConCuestionarioFinal.push(_client)
                    }
                })
            })
        }
        
        clientesConCuestionarioFinal.forEach( client => {
        if(client.type == "C"){
            console.log("C")
            const listItem = document.createElement('li');
            listItem.textContent = client.name;
            clientC.appendChild(listItem);
        }
        else if (client.type == "B"){
            console.log("B")
            const listItem = document.createElement('li');
            listItem.textContent = client.name;
            clientB.appendChild(listItem);
        }
        else if (client.type == "A"){
            console.log("A")
            const listItem = document.createElement('li');
            listItem.textContent = client.name;
            clientA.appendChild(listItem);
        }
        });
        // Mostrar estadísticas de inversión
        const inversionStats = document.getElementById('inversionStats');
        inversionStats.innerHTML = `
        <p>Máximo: USD ${estadisticas.inversionMax}</p><br>
        <p>Mínimo: USD ${estadisticas.inversionMin}</p><br>
        <p>Media: USD ${Math.round(estadisticas.inversion.total/estadisticas.analizados)}</p>
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
    }
    

    } else {
        console.log("No hay datos para calcular estadísticas.");
    }
}

const filtrarClientes = async(filtro, lista, pm) => {
    

}

estadistica();

let i_usuarios = document.getElementById('i_usuarios');
const setPM = async () =>{
    let PM_list = await obtenerUsuarios();
    console.log(PM_list.length);
    for(let i = 0; i < PM_list.length; i++){
        i_usuarios.innerHTML+= `<option value="${PM_list[i].name}">${PM_list[i].name}</option>`;
    }
}

setPM();

let currentPM = "";
i_usuarios.addEventListener("click", ()=>{

    if(currentPM != i_usuarios.value){
        currentPM = i_usuarios.value;
        estadistica();
    }

});

function closeClientDivs(){
    categoria_cliente.classList.remove("buttonSelected");
    ingresos_cliente.classList.remove("buttonSelected");
    cuestionario_cliente.classList.remove("buttonSelected");
    document.querySelector("#cuestionario_cliente").classList.add("hide");
    document.querySelector("#ingresos_cliente").classList.add("hide");
   // document.querySelector("#buscador_cliente").classList.add("hide");
    document.querySelector("#div_categoria").classList.add("hide");
}

const categoria_cliente = document.querySelector("#bt_categoria_cliente");
categoria_cliente.addEventListener("click", ()=>{
closeClientDivs();
document.querySelector("#div_categoria").classList.remove("hide");
categoria_cliente.classList.add("buttonSelected");
});
const ingresos_cliente = document.querySelector("#bt_ingresos_cliente");
ingresos_cliente.addEventListener("click", ()=>{
    closeClientDivs();
    document.querySelector("#ingresos_cliente").classList.remove("hide");
    ingresos_cliente.classList.add("buttonSelected");
});
const cuestionario_cliente = document.querySelector("#bt_cuestionario_cliente");
cuestionario_cliente.addEventListener("click", ()=>{
    closeClientDivs();
    document.querySelector("#cuestionario_cliente").classList.remove("hide");
    cuestionario_cliente.classList.add("buttonSelected");
});
const buscador_cliente = document.querySelector("#bt_buscador_cliente");