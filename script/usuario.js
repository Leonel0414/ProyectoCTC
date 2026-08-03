let administrador = JSON.parse(localStorage.getItem('administrador'));

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