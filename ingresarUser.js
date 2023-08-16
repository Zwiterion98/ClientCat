
const input_name = document.getElementById("name");
const input_email = document.getElementById("email");
const input_rol = document.getElementById("rol");
const button_sendUser = document.getElementById("sendUser");
const button_getUsers = document.getElementById("getUsers");
const input_client = document.getElementById("clients_i");
let client_list = "{"
input_client.addEventListener("click", () => {
    if(input_client.value != "no-client"){
        const selectedOption = input_client.querySelector(`option[value="${input_client.value}"]`);
        if (selectedOption) {
            selectedOption.style.backgroundColor = "lightblue"; // Change to the desired background color
        }
        client_list += `"${input_client.value}":"",`
        console.log(client_list)
    }
});

const handleUser = async () => {
    let name = input_name.value;
    let email = input_email.value;
    let rol = input_rol.value;
    let user_valid = true;
    if(client_list[client_list.length-1]==","){
        client_list = client_list.slice(0, -1);
        client_list += "}";
    }
    console.log(client_list)
    if(name == ""){
        console.log("Ingresar un nombre valido");
        document.querySelectorAll("p")[0].classList.remove("hide");
        input_name.value = "";
        user_valid = false;
    }
    if(email == "" || -1 == email.indexOf('@') || -1 == email.indexOf('.') || email.lenght < 5){
        console.log("Ingresar un email valido");
        document.querySelectorAll("p")[1].classList.remove("hide");
        input_email.value = "";
        user_valid = false;
    }
    if(rol == "no-rol"){
        console.log("Seleccionar un rol");
        document.querySelectorAll("p")[2].classList.remove("hide");
        user_valid = false;
    }
    
    if(user_valid){
        console.log(name, email, rol, client_list);
        document.querySelectorAll("p")[0].classList.add("hide");
        document.querySelectorAll("p")[1].classList.add("hide");
        document.querySelectorAll("p")[2].classList.add("hide");
        let json = JSON.parse(client_list)
        console.log(json)
        let status = await createUser(name, email, rol, json);
        input_name.value = "";
        input_email.value = "";
        input_rol.value = "no-rol";

        if(status === 0){
            document.getElementById('aviso').setAttribute('data-on','on');
            document.getElementById('aviso_msj').innerHTML= `Usuario creado con exito <br> (click para continuar)`;
        }
    }
    
}

const getUsers = async  () =>{ 
    let users = await obtenerUsusarios();
    let html = "";
    for(let i = 0; i < Object.keys(users).lenght; i++){ // no puedo obtener el largo
        html+= `
        ${users[i].name} ${users[i].rol}  ${users.lenght}
        <br>
        ` 
    }
    console.log(users)
    document.getElementById("resultado").innerHTML = html;
   
}

button_getUsers.addEventListener("click", getUsers);
button_sendUser.addEventListener("click", handleUser);

const clients_i = document.getElementById("clients_i");
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

setClients();