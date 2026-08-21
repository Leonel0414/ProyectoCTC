import { Producto } from './producto.js';
import { GestorProductos } from '../gestores/gestorProductos.js';

let gestor = new GestorProductos();


let compras = JSON.parse(localStorage.getItem("compras"));

let contenedorProducto = document.getElementById('productos-tarjeta');
let recibo = document.getElementById('recibo');

document.addEventListener('DOMContentLoaded', function(){

	let botonCrearProducto = document.getElementById('botonCrearProducto');

	let botonModificarProducto = document.getElementById('botonModificarProducto');

	let botonBuscarProducto = document.getElementById('botonBuscarProducto');

	let botonBorrarProducto = document.getElementById('botonBorrarProducto');


	botonCrearProducto.addEventListener('click', function(){
		crearProducto();
	})


	botonModificarProducto.addEventListener('click',function(){
		modificar();
	})


	botonBuscarProducto.addEventListener('click',function(){
		buscarYMostrar();
	})


	botonBorrarProducto.addEventListener('click',function(){
		borrarProducto();
	})

});

function crearProducto(){
	
	if(document.getElementById("nombreProducto").value == ""){
		alert('Agregue un nombre!');
		return
		
	}
	else if(document.getElementById("cantidadProducto").value == "" || document.getElementById("cantidadProducto").value < 1){
		alert('Ingrese un stock valido');
		return
		
	}
	else if(document.getElementById("precioProducto").value == '' || document.getElementById("precioProducto").value < 1){
		alert('Ingrese un precio valido');
		return
	}
	else if(document.getElementById("imagenProducto").value == ''){
		alert('Ingrese una direccion de imagen');
		return
	}
	else if(document.getElementById("ivaProducto").value == ''){
		alert('Seleccione un tipo de iva');
		return
	}
	else if(document.getElementById("categoriaProducto").value == ''){
		alert('Seleccione una categoria');
		return
	}
	else if(document.getElementById("infoProducto").value == ''){
		alert('Agregue una descripcion');
		return
	}
	
	 

	let producto = new Producto(
		document.getElementById("nombreProducto").value,
		document.getElementById("cantidadProducto").value,
		document.getElementById("precioProducto").value,
		document.getElementById("imagenProducto").value,
		document.getElementById("ivaProducto").value,
		document.getElementById("categoriaProducto").value,
		document.getElementById("infoProducto").value,
		
	)


	gestor.agregarProducto(producto);	
	alert("Producto " + producto.nombre + " agregado correctamente!");
	
	
	borrar(2);
}

addEventListener('DOMContentLoaded',function(){
	

for(let i = 0; i< gestor.productos.length; i++){
	
	parrafo.innerHTML += '<ul> ' + ' <li> ' + gestor.productos[i].nombre + '</li>' + ' </ul>' 
	
}	
}


)

addEventListener('DOMContentLoaded', function () {

    if (compras == null) return;

    if (compras.length) {

        for (let i = 0; i < compras.length; i++) {

            let card = '<div class="admin_Card"><p><strong>Nombre de comprador</strong>: ' + compras[i].nombreComprador + '</p><br> ';
            
            

            for (let j = 0; j < compras[i].productos.length; j++) {

                card += ' <p><strong>Producto '+ (j + 1) + ':</strong> ' + compras[i].productos[j].nombre + ' ' +'<strong>Subtotal:</strong> $'+ compras[i].productos[j].subtotal + ' ' + '<strong>Iva:</strong> $' + compras[i].productos[j].totalIva + '</p><br>'
                
            }

            card += '<hr><hr><br> Precio Total: $' + compras[i].totalCompra + '<br>Fecha: '+ compras[i].fecha + '</div>';

            recibo.innerHTML += card;
        }
    }
});





function borrarProducto(){
	let productoABuscar = document.getElementById("productoABuscar").value

		if(!document.getElementById("productoABuscar").value){
			
			alert('Elemento no existente!');
			return
		}

	// productos = productos.filter(function(producto)
	// {
	// return producto.nombre != document.getElementById("productoABuscar").value
	// });
	gestor.borrarProducto(productoABuscar);

	
	alert('Producto ' + document.getElementById('productoABuscar').value + ' eliminado correctamente!');
	borrar(2);
	location.reload()
	
}

function contadorIdentificador(){
	return identificacionSinMostrar
	
}



function cargarinputs(posicion){
	document.getElementById('nombreProductoAModificar').value = gestor.productos[posicion].nombre;
	document.getElementById('precioProductoAModificar').value =  gestor.productos[posicion].precio;
	document.getElementById('cantidadProductoAModificar').value =  gestor.productos[posicion].stock;
	document.getElementById('imagenAModificar').value =  gestor.productos[posicion].foto;
	document.getElementById('ivaProductoAModificar').value =  gestor.productos[posicion].iva;
	document.getElementById('categoriaProductoAModificar').value =  gestor.productos[posicion].categoria;
	document.getElementById('infoProductoAModificar').value =  gestor.productos[posicion].descripcion;
}


function buscarProducto(){
    let nombreProductoABuscar = document.getElementById("productoABuscar").value;
	let producto = gestor.buscarProducto(nombreProductoABuscar);
    if(!nombreProductoABuscar)
{
    alert('Producto no existente');
    return -1;
}
else{
		return producto;

}
}

function buscarYMostrar(){
	
	let indice = buscarProducto();

	if(indice !== -1){
		cargarinputs(indice);
}
	
}



function modificar(){

	let producto = buscarProducto();
	
	
	
	if(document.getElementById('nombreProductoAModificar').value != ''){
		gestor.productos[producto].nombre = document.getElementById('nombreProductoAModificar').value;

	}
	
	let inputImagen = document.getElementById('imagenAModificar').value;

	if (inputImagen != "") {
		gestor.productos[producto].foto = inputImagen;
	}
    if(document.getElementById('cantidadProductoAModificar').value)
	{
		gestor.productos[producto].stock = document.getElementById('cantidadProductoAModificar').value;
	}
	
	
	
	if(document.getElementById('precioProductoAModificar').value != '' || parseInt(document.getElementById('precioProductoAModificar').value) < 1){
		gestor.productos[producto].precio = document.getElementById('precioProductoAModificar').value;

	}
	
	
	
	if(document.getElementById('ivaProductoAModificar').value != ''){
		gestor.productos[producto].iva = document.getElementById('ivaProductoAModificar').value;

	}
	
	if(document.getElementById('categoriaProductoAModificar').value != '')
	{
		gestor.productos[producto].categoria = document.getElementById('categoriaProductoAModificar').value;

	}
	if(document.getElementById('infoProductoAModificar').value != '')
	{
		gestor.productos[producto].descripcion = document.getElementById('infoProductoAModificar').value;

	}
	if(producto === -1){
		return
	}
	
	alert('Producto modificado correctamente!');
	
	gestor.guardar();	
	borrar(1);
	location.reload()

}


function borrar(a)
{
	
	
	if(a == 2){
location.reload();	
	return
	}
	if(a == 1){
		
		document.getElementById('nombreProductoAModificar').value = '';
	document.getElementById('precioProductoAModificar').value = '';
	document.getElementById('cantidadProductoAModificar').value = '';
	document.getElementById('imagenAModificar').value = '';
	document.getElementById('ivaProductoAModificar').value = '';
	document.getElementById('categoriaProductoAModificar').value = '';

	}
	
}


