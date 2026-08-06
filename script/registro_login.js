let administrador = JSON.parse(localStorage.getItem('administrador'));
let usuariosRegistrados = JSON.parse(localStorage.getItem('usuariosRegistrados')) || [];

class Usuario{
    constructor(datos){
        this.nombre = datos.nombre
        this.correo = datos.correo
        this.contrasena = datos.contrasena
        this.telefono = datos.telefono
        this.departamento = datos.departamento
        this.direccion = datos.direccion
    }

}

if(!administrador){
    administrador = {
        usuario: 'admin',
        contrasena: 111222
    }
    localStorage.setItem('administrador',JSON.stringify(administrador));
}

function ingresar(){
    let usuarioInput = document.getElementById('usuarioLogin').value;
    let usuarioContrasena = document.getElementById('usuarioContrasena').value;

    if(usuarioInput == administrador.usuario && usuarioContrasena == administrador.contrasena){
        window.location.replace('admin.html')
    }
}

let botonIngresar = document.getElementById('btnIngresar')
botonIngresar.addEventListener('click',ingresar)

//Registro

let botonRegistrar = document.getElementById('btnRegistrar');
botonRegistrar.addEventListener("click", ()=>{
    
    let nombreRegistro = document.getElementById('nombreRegistro').value;
    let correoRegistro = document.getElementById('correoRegistro').value;
    let contrasenaRegistro = document.getElementById('contrasenaRegistro').value;
    let confirmarContrasenaRegistro = document.getElementById('confirmacionContrasenaRegistro')
    let departamentoRegistro = document.getElementById('departamentoRegistro').value;
    let direccionRegistro = document.getElementById('direccionRegistro').value

    let divisorError = document.getElementById('mensajeError');
    let mensajeError = document.createElement('p');
    mensajeError.innerHTML = ""

    switch(true){
        case nombreRegistro === "":
        case correoRegistro === "":
        case contrasenaRegistro === "":
        case departamentoRegistro === "":
        case direccionRegistro === "":
            mensajeError.innerHTML = "<p>Completa todos lo campos correctamente</p>"
            divisorError.appendChild(mensajeError)
            return
            break;
        
    }

    if(contrasenaRegistro !== confirmarContrasenaRegistro){
        mensajeError.innerHTML = "<p>confirmacion de contrasena diferente. Escribe correctamente la contrasena.</p>"
    }

    let usuario = new Usuario({
        nombre:nombreRegistro,
        correo:correoRegistro,
        contrasena:contrasenaRegistro,
        departamento:departamentoRegistro,
        direccion:direccionRegistro
    })

    usuariosRegistrados.push(usuario);
    localStorage.setItem('usuariosRegistrados',JSON.stringify(usuariosRegistrados));
})