export async function calcularEdad(date){
    try{
        let respuesta = await fetch(`https://digidates.de/api/v1/age/${date}`);
        respuesta = await respuesta.json();
        console.log(respuesta)

        const edad = respuesta.age;
         
        if(edad >= 18){
            return true
        }
        else{
            return null
        }
    }
    catch(error){
        console.log(error)
    }
}