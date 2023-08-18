
const pm_i = document.getElementById("pm_i");
let pm_d = "";
pm_i.addEventListener("change", () => {
   
    if(pm_i.value != ""){
        pm_d = pm_i.value;
        setClientsRemove(PM_list,pm_d, client_list);
        setClientsAdd(PM_list,pm_d, client_list);
    }
    document.getElementById("selected_pm").textContent = PM_list[pm_d].name;
    document.getElementById("addClient").disabled = false;
    document.getElementById("removeClient").disabled = false;
});
let client_list = []

const setPM = async () => {
    PM_list = await obtenerUsuarios();
    client_list = await obtenerClientes();
    console.log(PM_list.length);
    pm_i.innerHTML = `<option value="">Seleccionar</option>`;
    for(let i = 0; i < PM_list.length; i++){
        pm_i.innerHTML+= `<option value="${i}">${PM_list[i].name}</option>`;
    }

}

document.getElementById("addClient").addEventListener("click", () =>{
    document.getElementById("pm_select_client_add").classList.remove("hide");
    document.getElementById("pm_select_client_remove").classList.add("hide");
});

document.getElementById("removeClient").addEventListener("click", () =>{
    document.getElementById("pm_select_client_remove").classList.remove("hide");
    document.getElementById("pm_select_client_add").classList.add("hide");
});

const getItemByName = (array, name) => {
    return array.find(item => item.name === name);
};

const cliente_i_remove = document.getElementById("cliente_i_remove");
const setClientsRemove = (list, index, clientes) =>{
    cliente_i_remove.innerHTML = `<option value="">Seleccionar</option>`

    console.log(list[index])
    
    let Client_list = () =>{
        let keys = Object.keys(list[index].clients);
        keys.forEach(element => {
            console.log(element)
            let client = getItemByName(clientes, element)
            console.log(client)
            const option = document.createElement("option");
            option.value = element;
            option.text = element;
            cliente_i_remove.add(option);            
            });
    }
    Client_list();
}

let cliente_d = "";
let current_client;
cliente_i_remove.addEventListener("change", async () => {
    cliente_d = cliente_i_remove.value;
    console.log(cliente_d);
    current_client = await obtenerClientesPorNombre(cliente_d);
    console.log(current_client);
});

const cliente_i_add = document.getElementById("cliente_i_add");
const setClientsAdd = (list, index, clientes) =>{
    cliente_i_add.innerHTML = `<option value="">Seleccionar</option>`
   
    let list_aux = [];
    let remove_client_list = () =>{
        
        let keys = Object.keys(list[index].clients);
        keys.forEach(element => {
                list_aux.push(getItemByName(clientes, element)) 
                
        });
        function arrayDifference(arr1, arr2) {
            // Crea un nuevo Set a partir de los elementos de arr2
            const set2 = new Set(arr2);
          
            // Filtra los elementos de arr1 que no están en set2
            const difference = arr1.filter(element => !set2.has(element));
          
            return difference;
          }
        
        list_aux = arrayDifference(clientes, list_aux);
       
    }

    let Client_list = () =>{
        remove_client_list();
        
        list_aux.forEach(element => {
            console.log(element)
            console.log(element.name)
            const option = document.createElement("option");
            option.value = element.name;
            option.text = element.name;
            cliente_i_add.add(option);            
            });
    }
    Client_list();
}

cliente_i_add.addEventListener("change", async () => {
    cliente_d = cliente_i_add.value;
    console.log(cliente_d);
    current_client = await obtenerClientesPorNombre(cliente_d);
    console.log(current_client);
});


document.getElementById("button_add_client").addEventListener("click", async () =>{
    let list_aux = await obtenerUsuarios();
    console.log(list_aux[pm_d]);
    let client_list_aux = list_aux[pm_d].clients;
    Object.assign(client_list_aux, {[current_client[0].name]:""})
    console.log(client_list_aux);    
    modificarUser(list_aux[pm_d].id, "clients", client_list_aux);
});

document.getElementById("button_remove_client").addEventListener("click", async () =>{
    let list_aux = await obtenerUsuarios();
    
    console.log(list_aux[pm_d]);
    let client_list_aux = list_aux[pm_d].clients;
    delete client_list_aux[current_client[0].name];
    console.log(client_list_aux);
    modificarUser(list_aux[pm_d].id, "clients", client_list_aux);
});

const modificar_i = document.getElementById("modificar_i");
modificar_i.addEventListener("change", () =>{
    if(modificar_i.value == "pm"){
        setPM();
        document.getElementById("seleccion_persona").classList.remove("hide");
        document.getElementById("seleccion_cliente").classList.add("hide");
    }
    else if(modificar_i.value == "cliente"){
        setClients();
        document.getElementById("seleccion_persona").classList.add("hide")
        document.getElementById("seleccion_cliente").classList.remove("hide")
    }
});

/////////////////////CLIENTES/////////////////////////////////////////

const clients_i = document.getElementById("cliente_i");
const setClients = async () =>{
    let list = await obtenerClientes();
    console.log(list);
    let Client_list = () =>{
        list.forEach(element => {
            clients_i.innerHTML+= `<option value="${element.name}">${element.name}</option>`;
        });
    }
    Client_list();
}

clients_i.addEventListener("change", ()=>{
    document.getElementById("client_selected").innerHTML = clients_i.value;
    current_client = clients_i.value;
});