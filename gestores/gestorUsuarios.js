
class Usuario{
    constructor(nombre,correo,contrasena, telefono, departamento,fecha,direccion,rol){
        this.nombre = nombre || "indefenido";
        this.correo = correo || "indefinido";
        this.contrasena = contrasena || "indefinido";
        this.telefono = telefono || "indefinido";
        this.departamento = departamento || "indefinido";
        this.fechaNacimiento = fecha || "indefinido";
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
            usuario.fechaNacimiento,
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
        if(this.usuarios.length == 0){
            return 1
        }
        else{
            let id;
            for(let usuario of this.usuarios){
                id = Math.max(usuario.id);
            }
            console.log('ID mas alto',id)
            return id + 1
        }
    }

    // desactivarUsuario(usuario){
    //     usuario.activo = false;
    //     this.guardarUsuarios()
    // }

    mostrarLista(){
        console.log("listaUsuarios", this.usuarios) 
    }

    eliminarUsuario(correo){
        let usuario = this.buscarPorCorreo(correo)
        console.log(usuario)
        this.usuarios = this.usuarios.filter(usuario => usuario.correo != correo);
        this.guardarUsuarios()
    }
}

export default{GestorUsuarios, Usuario}