import gestores from '../gestores/gestorUsuarios.js'

const gestor = new gestores.GestorUsuarios();
let usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo'));

gestor.mostrarLista()
console.log("usuarioActivo",usuarioActivo);

//admin
let adminEncontrado = gestor.buscarPorCorreo('admin@');

if(!adminEncontrado){
        let administrador = new gestores.Usuario('admin','admin@','1234','','','','admin')
        gestor.crearUsuario(administrador)
}

//login

let botonIngresar = document.getElementById('btnIngresar')
if(botonIngresar){
    botonIngresar.addEventListener("click", ()=>{

        let correoLogin = document.getElementById('correoLogin').value;
        let contrasenaLogin = document.getElementById('contrasenaLogin').value;

        let mensajeErrorCorreoLogin = document.getElementById('mensajeErrorCorreoLogin');
        let mensajeErrorContrasenaLogin = document.getElementById('mensajeErrorContrasenaLogin');

        mensajeErrorCorreoLogin.textContent = '';
        mensajeErrorContrasenaLogin.textContent = '';

        let usuarioEncontrado = gestor.buscarPorCorreo(correoLogin);
 
        if(!usuarioEncontrado){
            mensajeErrorCorreoLogin.textContent = "Correo electronico no existe";
            return;
        }
 
        if(!usuarioEncontrado.validarContrasena(contrasenaLogin)){
            mensajeErrorContrasenaLogin.textContent = "contrasena incorrecta";
            return;
        }
        
        localStorage.setItem('usuarioActivo', JSON.stringify(usuarioEncontrado));

        if(usuarioEncontrado.esAdmin()){
                window.location.replace('admin.html');
                return;
        }
        else{
            window.location.replace('index.html');
            return;
        }

    })
} 

//Registro

let botonRegistrar = document.getElementById('btnRegistrar');
if(botonRegistrar){
    botonRegistrar.addEventListener("click", async () => {
        
        let formularioRegistro = document.getElementById('formRegistro');
        let mensajeErrorNombreRegistro = document.getElementById("mensajeErrorNombreRegistro");
        let mensajeErrorCorreoRegistro = document.getElementById("mensajeErrorCorreoRegistro");
        let mensajeErrorContrasenaRegistro = document.getElementById("mensajeErrorContrasenaRegistro");
        let mensajeErrorConfirmarContrasenaRegistro = document.getElementById("mensajeErrorConfirmarContrasenaRegistro");
        mensajeErrorNombreRegistro.textContent = "";
        mensajeErrorContrasenaRegistro.textContent = "";
        mensajeErrorCorreoRegistro.textContent = "";
        mensajeErrorConfirmarContrasenaRegistro.textContent = "";

        let nombreRegistro = document.getElementById('nombreRegistro').value;
        let correoRegistro = document.getElementById('correoRegistro').value;
        let contrasenaRegistro = document.getElementById('contrasenaRegistro').value;
        let confirmarContrasenaRegistro = document.getElementById('confirmacionContrasenaRegistro').value;
        let telefonoRegistro = document.getElementById('telefonoRegistro').value;
        let departamentoRegistro = document.getElementById('departamentoRegistro').value;
        let fechaNacimientoRegistro = document.getElementById('fechaNacimientoRegistro').value;
        let direccionRegistro = document.getElementById('direccionRegistro').value;

        let mensajeError = document.getElementById('mensajeError');
        mensajeError.textContent = ""
        
        switch(true){
            case nombreRegistro === "":
            case correoRegistro === "":
            case contrasenaRegistro === "":
            case confirmarContrasenaRegistro === "":
            case departamentoRegistro === "":
            case direccionRegistro === "":
                mensajeError.style = "color: white; font-weight:bold; text-align:center;"
                mensajeError.textContent = "Completa todos lo campos correctamente";
                return
                break;
        }

        if(nombreRegistro.length <= 3){
            mensajeErrorNombreRegistro.style = "color: white; font-weight:bold; text-align:center;";
            mensajeErrorNombreRegistro.textContent = "ERROR - Ingrese un nombre valido!";
            return;
        }
                
        if(correoRegistro.length <= 3){
            mensajeErrorCorreoRegistro.style = "color: white; font-weight:bold; text-align:center;";
            mensajeErrorCorreoRegistro.textContent = "ERROR - Ingrese un correo valido!";
            return;
        }
                
        if(contrasenaRegistro.length <= 7){
            mensajeErrorContrasenaRegistro.style = "color: white; font-weight:bold;";
            mensajeErrorContrasenaRegistro.textContent = "ERROR - Ingrese una contrasena de 8 digitos o mas!";
            return;
        }

        if(gestor.buscarPorCorreo(correoRegistro)){
            mensajeErrorCorreoRegistro.style = "color: white; font-weight:bold; text-align:center;";
            mensajeErrorCorreoRegistro.textContent = "Correo ya existente.";
            return;
        }

        if(contrasenaRegistro !== confirmarContrasenaRegistro){
            mensajeErrorConfirmarContrasenaRegistro.style = "color: white; font-weight:bold;"
            mensajeErrorConfirmarContrasenaRegistro.textContent = "ERROR - confirmacion de contrasena equivocada."
            return;
        }

        let usuario = new gestores.Usuario(nombreRegistro,
            correoRegistro,
            contrasenaRegistro,
            telefonoRegistro,
            departamentoRegistro,
            direccionRegistro
        );

        gestor.crearUsuario(usuario);
        formularioRegistro.reset();
	    window.location.href = 'login.html';
        })
}


//logout
let botonLogOut = document.getElementById('login_log-out');

if(botonLogOut){
    if(!usuarioActivo){       
        botonLogOut.textContent = 'login';
        botonLogOut.addEventListener('click', ()=>{
            window.location.replace('login.html')
        })
    }
    else{
        botonLogOut.textContent = 'log-out';

        botonLogOut.addEventListener("click",() => {
            localStorage.removeItem('usuarioActivo');
            usuarioActivo = null;

            window.location.replace('index.html');
        })
    }
}

if(usuarioActivo && usuarioActivo.rol === 'admin'){
    let divisorHeaderIndex = document.getElementById('divisorHeaderIndex');
    
    if(divisorHeaderIndex){
        let botonAdministrador = document.createElement('button');
    
        botonAdministrador.className = 'login_button';
        botonAdministrador.textContent = 'admin';
        botonAdministrador.type = 'button'
        botonAdministrador.style = "margin-right: 10px"
        botonAdministrador.addEventListener('click',() =>{
            window.location.replace('admin.html')
        })
        divisorHeaderIndex.prepend(botonAdministrador);
    }
 }

 //prueba

// let botonEliminar = document.getElementById('btnEliminar')
// let correoEliminar = document.getElementById('correoEliminar').value

//  if(botonEliminar && correoEliminar){
//      botonEliminar.addEventListener('click', ()=>{
//         console.log('usuario')
//         gestor.eliminarUsuario(correoEliminar)
//         window.location.reload()
//         })
//  }
