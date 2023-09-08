const reuniones_i = document.getElementById("reuniones_i");
let reuniones_d = "";
reuniones_i.addEventListener("change", () => {
    reuniones_d = reuniones_i.value;
    console.log(reuniones_d);
});

const propuestas_i = document.getElementById("propuestas_i");
let propuestas_d = "";
propuestas_i.addEventListener("change", () => {
    propuestas_d = propuestas_i.value;
    console.log(propuestas_d);
});


const mail_i = document.getElementById("mail_i");
let mail_d = "";
mail_i.addEventListener("change", () => {
    mail_d = mail_i.value;
    console.log(mail_d);
});

const tareas_i = document.getElementById("tareas_i");
let tareas_d = "";
tareas_i.addEventListener("change", () => {
    tareas_d = tareas_i.value;
    console.log(tareas_d);
});

const inversion_i = document.getElementById("inversion_i");
let inversion_d = "";
inversion_i.addEventListener("change", () => {
    inversion_d = inversion_i.value;
    console.log(inversion_d);
});

const contrato_si = document.getElementById("contrato_si");
const contrato_no = document.getElementById("contrato_no");
let contrato_d = "";
contrato_si.addEventListener("click", () => {
contrato_d = "si";
contrato_no.checked = false;
console.log(contrato_d)
});
contrato_no.addEventListener("click", () => {
    contrato_d = "no";
    contrato_si.checked = false;
    console.log(contrato_d)
});

const presupuesto_si = document.getElementById("presupuesto_si");
const presupuesto_no = document.getElementById("presupuesto_no");
let presupuesto_d = "";
presupuesto_si.addEventListener("click", () => {
presupuesto_d = "si";
presupuesto_no.checked = false;
console.log(presupuesto_d)
});
presupuesto_no.addEventListener("click", () => {
    presupuesto_d = "no";
    presupuesto_si.checked = false;
    console.log(presupuesto_d)
});

const presencia_si = document.getElementById("presencia_si");
const presencia_no = document.getElementById("presencia_no");
let presencia_d = "";
presencia_si.addEventListener("click", () => {
presencia_d = "si";
presencia_no.checked = false;
console.log(presencia_d)
});
presencia_no.addEventListener("click", () => {
    presencia_d = "no";
    presencia_si.checked = false;
    console.log(presencia_d)
});

const pago_i = document.getElementById("pago_i");
let pago_d = "";
pago_i.addEventListener("change", () => {
    pago_d = pago_i.value;
    console.log(pago_d);
});

const predisposicion_si = document.getElementById("predisposicion_si");
const predisposicion_no = document.getElementById("predisposicion_no");
let predisposicion_d = "";
predisposicion_si.addEventListener("click", () => {
predisposicion_d = "si";
predisposicion_no.checked = false;
console.log(predisposicion_d)
});
predisposicion_no.addEventListener("click", () => {
    predisposicion_d = "no";
    predisposicion_si.checked = false;
    console.log(predisposicion_d)
});

const organizacion_si = document.getElementById("organizacion_si");
const organizacion_no = document.getElementById("organizacion_no");
let organizacion_d = "";
organizacion_si.addEventListener("click", () => {
organizacion_d = "si";
organizacion_no.checked = false;
console.log(organizacion_d)
});
organizacion_no.addEventListener("click", () => {
    organizacion_d = "no";
    organizacion_si.checked = false;
    console.log(organizacion_d)
});

const conocimiento_si = document.getElementById("conocimiento_si");
const conocimiento_no = document.getElementById("conocimiento_no");
let conocimiento_d = "";
conocimiento_si.addEventListener("click", () => {
conocimiento_d = "si";
conocimiento_no.checked = false;
console.log(conocimiento_d)
});
conocimiento_no.addEventListener("click", () => {
    conocimiento_d = "no";
    conocimiento_si.checked = false;
    console.log(conocimiento_d)
});

const pedido_si = document.getElementById("pedido_si");
const pedido_no = document.getElementById("pedido_no");
let pedido_d = "";
pedido_si.addEventListener("click", () => {
pedido_d = "si";
pedido_no.checked = false;
console.log(pedido_d)
});
pedido_no.addEventListener("click", () => {
    pedido_d = "no";
    pedido_si.checked = false;
    console.log(pedido_d)
});

const urgencia_si = document.getElementById("urgencia_si");
const urgencia_no = document.getElementById("urgencia_no");
let urgencia_d = "";
urgencia_si.addEventListener("click", () => {
urgencia_d = "si";
urgencia_no.checked = false;
console.log(urgencia_d)
});
urgencia_no.addEventListener("click", () => {
    urgencia_d = "no";
    urgencia_si.checked = false;
    console.log(urgencia_d)
});

const contacto_si = document.getElementById("contacto_si");
const contacto_no = document.getElementById("contacto_no");
let contacto_d = "";
contacto_si.addEventListener("click", () => {
contacto_d = "si";
contacto_no.checked = false;
console.log(contacto_d)
});
contacto_no.addEventListener("click", () => {
    contacto_d = "no";
    contacto_si.checked = false;
    console.log(contacto_d)
});

const cambios_i = document.getElementById("cambios_i");
let cambios_d = "";
cambios_i.addEventListener("change", () => {
    cambios_d = cambios_i.value;
    console.log(cambios_d);
});

const submit_cuestion = document.getElementById("submit_cuestion");



submit_cuestion.addEventListener("click", async () => {
    let completed = true;
    let respuesta = {
        "reuniones":reuniones_d,
        "propuestas":propuestas_d,
        "mail":mail_d,
        "tareas":tareas_d,
        "inversion":inversion_d,
        "contrato":contrato_d,
        "presupuesto":presupuesto_d,
        "presencia":presencia_d,
        "pago":pago_d,
        "predisposicion":predisposicion_d,
        "organizacion":organizacion_d,
        "conocimiento":conocimiento_d,
        "pedido":pedido_d,
        "urgencia":urgencia_d,
        "contacto":contacto_d,
        "cambios":cambios_d
    }
    if(respuesta.reuniones == ""){
        completed = false;
    }
    if(respuesta.propuestas == ""){
        completed = false;
    }
    if(respuesta.mail == ""){
        completed = false;
    }
    if(respuesta.tareas == ""){
        completed = false;
    }
    if(respuesta.inversion == ""){
        completed = false;
    }
    if(respuesta.contrato == ""){
        completed = false;
    }
    if(respuesta.presupuesto == ""){
        completed = false;
    }
    if(respuesta.presencia == ""){
        completed = false;
    }
    if(respuesta.pago == ""){
        completed = false;
    }
    if(respuesta.predisposicion == ""){
        completed = false;
    }
    if(respuesta.organizacion == ""){
        completed = false;
    }
    if(respuesta.conocimiento == ""){
        completed = false;
    }
    if(respuesta.pedido == ""){
        completed = false;
    }
    if(respuesta.urgencia == ""){
        completed = false;
    }
    if(respuesta.contacto == ""){
        completed = false;
    }
    if(respuesta.cambios == ""){
        completed = false;
    }
    if(completed == true){
        inversion_i.value ="";
        cambios_i.value ="";
        reuniones_i.value = "";
        propuestas_i.value = "";
        mail_i.value = "";
        tareas_i.value = "";
        contrato_no.checked = false;
        contrato_si.checked = false;
        pedido_no.checked = false;
        pedido_si.checked = false;
        urgencia_no.checked = false;
        urgencia_si.checked = false;
        presupuesto_no.checked = false;
        presupuesto_si.checked = false;
        presencia_no.checked = false;
        presencia_si.checked = false;
        pago_i.value = "";
        predisposicion_si.checked = false;
        predisposicion_no.checked = false;
        organizacion_si.checked = false;
        organizacion_no.checked = false;
        conocimiento_no.checked = false;
        conocimiento_si.checked = false;
        pedido_si.checked = false;
        pedido_no.checked = false;
        urgencia_si.checked = false;
        urgencia_no.checked = false;
        cambios_i.value = "";
        contacto_si.checked = false;
        contacto_no.checked = false;
        let cat = obtenerCategoria(respuesta);
        await ingresarClientCat(current_client[0].name, cat);
        await ingresarCuestionario(current_client[0].name, respuesta);
        document.querySelector("#progress_cuestionary").classList.remove("hide");
        document.querySelector("#section_persona").classList.remove("hide");
        document.querySelector("#section_cuestionario_ideal").classList.add("hide");
        cuestionary_part = 0;
        document.querySelector("#cliente_i").value = "";
        
    }
    console.log(respuesta.reuniones);
    setPM();
});

let PM_list;

const getIDbyID = (lista, id) =>{
    console.log(lista.lenght)
    for(let i = 0; i < lista.lenght; i++){
        if(lista[i].id == id){
            return i;
        }
    }
    return -1;
}

const getIDbyName = (lista, name) =>{
    console.log(lista.lenght)
    for(let i = 0; i < lista.lenght; i++){
        if(lista[i].name == name){
            return i;
        }
    }
    return -1;
}


const pm_i = document.getElementById("pm_i");
let pm_d = "";
pm_i.addEventListener("change", () => {
    if(pm_i.value != ""){
        pm_d = pm_i.value;
        setClients(PM_list,pm_d, client_list);
    }
});
let client_list = []

const setPM = async () => {
    pm_i.innerHTML = ` <option value="">Seleccionar</option>`;
    PM_list = await obtenerUsuarios();
    client_list = await obtenerClientes();
    console.log(PM_list.length);
    for(let i = 0; i < PM_list.length; i++){
        pm_i.innerHTML+= `<option value="${i}">${PM_list[i].name}</option>`;
    }

}

const getItemByName = (array, name) => {
    return array.find(item => item.name === name);
};

const cliente_i = document.getElementById("cliente_i");
const setClients = (list, index, clientes) =>{
    cliente_i.innerHTML = `<option value="">Seleccionar</option>`

    console.log(list[index])
    let Client_list = () =>{
        let keys = Object.keys(list[index].clients);
        keys.forEach(element => {
            console.log(element)
            let client = getItemByName(clientes, element)
            console.log(client)
            
                if(undefined != client){
                    const lastItem = client.cuestionary[client.cuestionary.length - 1];
                    const option = document.createElement("option");
                    if(client.cuestionary.length > 0){
                        if (lastItem.timestamp) {
                            const now = new Date();
                            const twoMonthsAgo = new Date();
                            twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);
                
                            
                            
                            option.value = element;
                            option.text = element;
            
                            if (new Date(lastItem.timestamp) +2 >= twoMonthsAgo) {
                                    option.disabled = false;
                            } else {
                                    option.disabled = true;
                            }
                            } else {
                                option.disabled = true;
                            }
                            cliente_i.add(option);
                    } else {
                        option.value = element;
                        option.text = element;
                        cliente_i.add(option);
                    }
                }
                
                
            });
    }
    Client_list();
}



let cliente_d = "";
let current_client;
cliente_i.addEventListener("change", async () => {
    cliente_d = cliente_i.value;
    console.log(cliente_d);
    current_client = await obtenerClientesPorNombre(cliente_d);
    console.log(current_client);
});


setPM();

function obtenerCategoria(response){
    let categoria;
    if(response.inversion > 2000){
        categoria = "A";
    }
    else if(response.inversion > 1115){
        categoria = "B";
    }
    else{
        categoria = "C";
    }
    if(categoria == "A" && (((response.pago == "2a4") && (response.urgencia == "no" && response.predisposicion == "no" && response.cambios == "+5"))  ||  (response.pago == "+5" && ((response.urgencia == "no" && (response.predisposicion == "no" || response.cambios == "+5")) || (response.predisposicion == "no" && response.cambios == "+5"))))){
        categoria = "B";
    }
    else if(categoria == "B" && ((response.inversion + 117 >= 2000) && (response.pago != "+5") && (response.presupuesto == "si" || response.presencia == "si") && ((response.urgencia == "si" && (response.predisposicion == "si" || response.pedido == "si")) || (response.predisposicion == "si" && response.pedido == "si")))){
        categoria = "A";
    }
    else if(categoria == "B" && (((response.pago == "2a4") && (response.urgencia == "no" && response.predisposicion == "no" && response.cambios == "+5"))  || ((response.pago == "+5") && ((response.urgencia == "no" && (response.predisposicion == "no" || response.cambios == "+5")) || (response.predisposicion == "no" && response.cambios == "+5"))))){
        categoria = "C";
    }
    else if(categoria == "C"  && ((response.inversion + 223 >= 1115) && (response.pago != "+5") && (response.presupuesto == "si" || response.presencia == "si") && ((response.urgencia == "si" && (response.predisposicion == "si" || response.pedido == "si")) || (response.predisposicion == "si" && response.pedido == "si")))){
        categoria = "B";
    }
    console.log(categoria);
    return categoria;
}
let cuestionary_part = 0;
const button_siguiente = document.querySelector("#siguiente_cuestionario");
button_siguiente.addEventListener("click", async ()=>{
    if(cuestionary_part == 0){
        if(pm_d != "" && cliente_d != ""){
            cuestionary_part =1;
            document.querySelector("#section_persona").classList.add("hide")
            document.querySelector("#section_cuestionario_tiempo").classList.remove("hide");
        }
        
    }
    else if(cuestionary_part == 1){
        if(reuniones_d != "" && mail_d != "" && tareas_d != "" && propuestas_d != ""){
            cuestionary_part =2;
            document.querySelector("#section_cuestionario_tiempo").classList.add("hide")
            document.querySelector("#section_cuestionario_inversion").classList.remove("hide");
        }
    }
    else if(cuestionary_part == 2){
        if(inversion_d != ""){
            cuestionary_part =3;
            document.querySelector("#section_cuestionario_inversion").classList.add("hide")
            document.querySelector("#section_cuestionario_aspiracional").classList.remove("hide");
       }
    }
    else if(cuestionary_part == 3){
        if(contrato_d != "" && presupuesto_d != "" && presencia_d != "" && pago_d !=""){
            cuestionary_part =4;
            document.querySelector("#section_cuestionario_aspiracional").classList.add("hide")
            document.querySelector("#progress_cuestionary").classList.add("hide")
            document.querySelector("#section_cuestionario_ideal").classList.remove("hide");
       }
    }
    console.log(cuestionary_part)
})


//0 select user and client
//1 time
//2 inversion
//3 aspircional
//4 ideal
