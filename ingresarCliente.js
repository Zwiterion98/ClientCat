const input_nameClient = document.getElementById("nameClient");
const button_sendClient = document.getElementById("sendClient");

button_sendClient.addEventListener("click", async () => {
    await handleClient();
} );


const handleClient = async () => {
    let name = input_nameClient.value;

    let user_valid = true;

    if(name == ""){
        console.log("Ingresar un nombre valido");
        document.querySelector("p").classList.remove("hide");
        input_nameClient.value = "";
        user_valid = false;
    }
    
    if(user_valid){
        console.log(name);
        document.querySelector("p").classList.add("hide");
        let status = await createClient(name);
        console.log(status)
        input_nameClient.value = "";
        if(status === 0){
            document.getElementById('aviso').setAttribute('data-on','on');
            document.getElementById('aviso_msj').innerHTML= `Cliente creado con exito <br> (click para continuar)`;
        }
    }
}

