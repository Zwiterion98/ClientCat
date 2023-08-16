const supabaseUrl = 'https://gqihrwmpsytjojehuogg.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdxaWhyd21wc3l0am9qZWh1b2dnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODkxOTA3MTUsImV4cCI6MjAwNDc2NjcxNX0.m3mLJs56G_-QHPmsf78icNhTDo-c9TDPlXawVWKQIkg'
const _supabase = supabase.createClient(supabaseUrl, supabaseKey)

//Crear usuario

const createUser = async (_name, _mail, _rol, _clients) => {
    try {
        const {data,error} = await _supabase.from('USERS') 
        .insert([
            {   name: _name,
                mail: _mail,
                rol: _rol,
                clients:_clients,
            }
        ])
        console.log(error);
        if (error) {
            console.log(error);
            return -1;
        } else {
            console.log("Cliente creado exitosamente");
            return 0;
        }
    } catch (e) {
        console.log(e);
        return -1;
    }
}

const createClient = async (_name) => {
    try {
        const {data, error} = await _supabase.from('CLIENTS')
            .insert([
                {
                    name: _name,
                    type: "",
                    finances: {},
                    cuestionary: {}
                }
            ]);
        
        if (error) {
            console.log(error);
            return -1;
        } else {
            console.log("Cliente creado exitosamente");
            return 0;
        }
    } catch (e) {
        console.log(e);
        return -1;
    }
};


const obtenerUsusarios = async () => {
    try{
        const {data,error} = await _supabase.from('USERS') 
        .select('*')
        .eq('rol', 'pm')
        console.log(data);
        return data;
    }
    catch(e){
        console.log(e);
    }
}

const obtenerClientes = async () => {
    try{
        const {data,error} = await _supabase.from('CLIENTS') 
        .select('*')

        console.log(data);
        return data;
    }
    catch(e){
        console.log(e);
    }
}

const obtenerClientesPorNombre = async (_name) => {
    try{
        const {data,error} = await _supabase.from('CLIENTS') 
        .select('*')
        .eq('name', _name)


        console.log(data);
        return data;
    }
    catch(e){
        console.log(e);
    }
}



//Buscar user por id

const buscarUserPorId = async (id) => {
    try {
        const {data,error} = await _supabase.from('USERS') 
        .select()
        .eq('id',id)
        console.log(error);
        console.log(data)
        return data;
    }
    catch(e){
        console.log(e)
    }
}

const modificarUser = async(id, key, value) => {
    try{
        if(key == "name"){
            const { data, error } = await _supabase
            .from('USERS')
            .update({ name: value })
            .eq('id', id)
        }
        else if(key == "mail"){
            const { data, error } = await _supabase
            .from('USERS')
            .update({ mail: value })
            .eq('id', id)
        }
        else if(key == "clients"){
            const { data, error } = await _supabase
            .from('USERS')
            .update({ clients: value })
            .eq('id', id)
        }
        else if(key == "rol"){
            const { data, error } = await _supabase
            .from('USERS')
            .update({ rol: value })
            .eq('id', id)
        }
        
    }
    catch(e){
        console.log(e);
    }   
}

const ingresarClientCat = async (name, cat) => {
    try{
        const { data, error } = await _supabase
        .from('CLIENTS')
        .update({ type: cat })
        .eq('name', name)
    }
    catch(e){
        console.log(e);
    }
}

const ingresarCuestionario = async (name, newResponses) => {
    try {
        console.log(name);
        console.log(newResponses);

        // Retrieve the current questionnaire responses from the database
        const { data: existingData, error: existingError } = await _supabase
            .from('CLIENTS')
            .select('cuestionary')
            .eq('name', name)
            .single();

        if (existingError) {
            console.error(existingError);
            return;
        }

        // Parse the existing JSON and make sure it's an array
        let existingResponses = [];
        if (existingData && Array.isArray(existingData.cuestionary)) {
            existingResponses = existingData.cuestionary;
        }

        // Create a new submission object with a timestamp
        const newSubmission = {
            timestamp: new Date().toISOString(),
            responses: newResponses
        };

        // Concatenate the new submission with the existing responses
        const updatedResponses = [...existingResponses, newSubmission];

        // Update the database with the concatenated responses
        const { data, error } = await _supabase
            .from('CLIENTS')
            .update({ cuestionary: updatedResponses })
            .eq('name', name);

        if (error) {
            console.error(error);
        }
    } catch (e) {
        console.error(e);
    }
};


