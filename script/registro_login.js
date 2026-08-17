class Usuario{
    constructor(nombre,correo,contrasena, telefono, departamento,direccion,rol){
        this.nombre = nombre || "indefenido";
        this.correo = correo || "indefinido";
        this.contrasena = contrasena || "indefinido";
        this.telefono = telefono || "indefinido";
        this.departamento = departamento || "indefinido";
        this.direccion = direccion || "indefinido";

        this.rol = rol || "usuario";
        // this.activo = true;
    }

    validarContrasena(contrasena){
        return this.contrasena === contrasena;
    }

    esAdmin(){
        return this.rol === "admin";
    }
}

class GestorUsuarios{
    constructor(){
        let usuariosRegistrados = JSON.parse(localStorage.getItem('usuariosRegistrados')) || [];

        this.usuarios = usuariosRegistrados.map(usuario => {
            
            let usuarioNuevo = new Usuario(
            usuario.nombre,
            usuario.correo,
            usuario.contrasena,
            usuario.telefono,
            usuario.departamento,
            usuario.direccion,
            usuario.rol
            )
            usuarioNuevo.id = usuario.id

            return usuarioNuevo;
    })

    }
    
    guardarUsuarios(){
        localStorage.setItem('usuariosRegistrados',JSON.stringify(this.usuarios))
    }

    crearUsuario(usuario){
        usuario.id = this.crearID()
        this.usuarios.push(usuario);
        this.guardarUsuarios();
    }

    buscarPorCorreo(correo){
        return this.usuarios.find(usuario => usuario.correo === correo);
    }

    buscarPorid(id){
        return this.usuarios.find(usuario => usuario.id === id);
    }

    buscarPorNombre(nombre){
        return this.usuarios.find(usuario => usuario.nombre === nombre);
    }

    crearID(){
        return this.usuarios.length + 1
    }

    // desactivarUsuario(usuario){
    //     usuario.activo = false;
    //     this.guardarUsuarios()
    // }

    mostrarLista(){
        console.log("listaUsuarios", this.usuarios) 
    }

    eliminarUsuario(){
        this.usuarios.pop()
        this.guardarUsuarios()
    }
}

const gestor = new GestorUsuarios();
let usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo'));

gestor.mostrarLista()

console.log("usuarioActivo",usuarioActivo);

//admin
let adminEncontrado = gestor.buscarPorCorreo('admin@');

if(!adminEncontrado){
        let administrador = new Usuario('admin','admin@','1234','','','','admin')
        gestor.crearUsuario(administrador)
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
    botonRegistrar.addEventListener("click", () => {
        
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

        let usuario = new Usuario(nombreRegistro,correoRegistro,contrasenaRegistro,telefonoRegistro,departamentoRegistro,direccionRegistro)

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
