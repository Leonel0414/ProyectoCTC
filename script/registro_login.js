class Usuario{
    constructor(datos){
        this.nombre = datos.nombre || "indefenido"
        this.correo = datos.correo || "indefinido"
        this.contrasena = datos.contrasena || "indefinido"
        this.telefono = datos.telefono || "indefinido"
        this.departamento = datos.departamento || "indefinido"
        this.direccion = datos.direccion || "indefinido"

        this.id = usuariosRegistrados.length + 1
        this.rol = datos.rol || "usuario"
    }

    validarContrasena(contrasena){
        return this.contrasena === contrasena;
    }

    esAdmin(){
        return this.rol === "admin";
    }
}

let usuariosRegistrados = JSON.parse(localStorage.getItem('usuariosRegistrados')) || [];
usuariosRegistrados = usuariosRegistrados.map(usuario => new Usuario(usuario));

let usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo'));

console.log("usuarioActivo",usuarioActivo);
console.log("usuarioRegistrado",usuariosRegistrados);



//admin
let adminEncontrado = false;

for(let usuario of usuariosRegistrados){
    if(usuario.rol === "admin"){
        adminEncontrado = true;
    }
}

if(!adminEncontrado){
        let administrador = new Usuario({
            nombre:'administrador',
            correo:"admin@",
            contrasena:"1234",
            rol:"admin"
        })

        usuariosRegistrados.push(administrador);
        localStorage.setItem('usuariosRegistrados', JSON.stringify(usuariosRegistrados));
}




//login

let botonIngresar = document.getElementById('btnIngresar')
if(botonIngresar){
    botonIngresar.addEventListener("click", ()=>{

        let formularioLogin = document.getElementById('formLogin')

        let correoLogin = document.getElementById('correoLogin').value;
        let contrasenaLogin = document.getElementById('contrasenaLogin').value;

        let mensajeErrorCorreoLogin = document.getElementById('mensajeErrorCorreoLogin');
        let mensajeErrorContrasenaLogin = document.getElementById('mensajeErrorContrasenaLogin');

        mensajeErrorCorreoLogin.textContent = '';
        mensajeErrorContrasenaLogin.textContent = '';

        let usuarioEncontrado;

        for(let usuario of usuariosRegistrados){

            if(correoLogin === usuario.correo){
                usuarioEncontrado = usuario;
                console.log('usuarioEncontrado',usuarioEncontrado);
            }
        }
            
        if(!usuarioEncontrado){
            mensajeErrorCorreoLogin.textContent = "Correo electronico no existe";
            return;
        }
        
        console.log(usuarioEncontrado);
        console.log(usuarioEncontrado instanceof Usuario);
        console.log(typeof usuarioEncontrado.validarContrasena);
        
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

        formularioLogin.reset()
    })
} 

//Registro

let botonRegistrar = document.getElementById('btnRegistrar');
if(botonRegistrar){
    botonRegistrar.addEventListener("click", () => {
        
        let formularioRegistro = document.getElementById('formRegistro')

        let nombreRegistro = document.getElementById('nombreRegistro').value;
        let correoRegistro = document.getElementById('correoRegistro').value;
        let contrasenaRegistro = document.getElementById('contrasenaRegistro').value;
        let confirmarContrasenaRegistro = document.getElementById('confirmacionContrasenaRegistro').value;
        let telefonoRegistro = document.getElementById('telefonoRegistro').value;
        let departamentoRegistro = document.getElementById('departamentoRegistro').value;
        let direccionRegistro = document.getElementById('direccionRegistro').value;

        let divisorError = document.getElementById('mensajeError');
        divisorError.textContent = ""
        
        let mensajeError = document.createElement('p');

        switch(true){
            case nombreRegistro === "":
            case correoRegistro === "":
            case contrasenaRegistro === "":
            case confirmarContrasenaRegistro === "":
            case departamentoRegistro === "":
            case direccionRegistro === "":
                mensajeError.textContent = "Completa todos lo campos correctamente";
                divisorError.appendChild(mensajeError);
                return
                break;
        }

        for(let usuario of usuariosRegistrados){
            if(correoRegistro === usuario.correo){
                mensajeError.textContent = "Correo ya existente.";
                divisorError.appendChild(mensajeError);
                return;
            }
        }

        if(contrasenaRegistro !== confirmarContrasenaRegistro){
            mensajeError.textContent = "confirmacion de contrasena diferente. Escribe correctamente la contrasena."
            divisorError.appendChild(mensajeError);
            return;
        }

        let usuario = new Usuario({
            nombre:nombreRegistro,
            correo:correoRegistro,
            contrasena:contrasenaRegistro,
            telefono:telefonoRegistro,
            departamento:departamentoRegistro,
            direccion:direccionRegistro
        })

        usuariosRegistrados.push(usuario);
        localStorage.setItem('usuariosRegistrados',JSON.stringify(usuariosRegistrados));
        formularioRegistro.reset()
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
    let divisorHeaderIndex = document.getElementById('divisorHeaderIndex')
    
    if(divisorHeaderIndex){
        let botonAdministrador = document.createElement('button');
    
        botonAdministrador.className = 'login_button';
        botonAdministrador.textContent = 'admin';
        botonAdministrador.style = "margin-right: 10px"
        divisorHeaderIndex.prepend(botonAdministrador);
        
        botonAdministrador.addEventListener('click',() =>{
            window.location.replace('admin.html')
        })
    }
 }
