export async function calcularEdad(date){
    try{
        let respuesta = await fetch(`https://digidates.de/api/v1/age/${date}`);
        respuesta = await respuesta.json();

        if(respuesta.age >= 18){
            return true
        }
        else{
            return false
        }
    }
    catch(error){
        console.error('Error en calcular edad',error)
    }
}