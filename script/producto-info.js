import { GestorProductos } from '../gestores/gestorProductos.js';

import { agregarCarrito } from './carrito-de-compras.js';


let contenedorProducto = document.getElementById('productos-tarjeta');  

let gestor = new GestorProductos;  

let params = new URLSearchParams(window.location.search);  

let productoID = params.get("id");  

console.log(productoID) 


document.addEventListener("DOMContentLoaded", function(){  

	let producto;  
	  
	function encontrarProducto(){  
		  
		for(let i = 0 ; i < gestor.productos.length; i++){  

			if(gestor.productos[i].nroIdentificador == productoID){

				return gestor.productos[i] 

			}

		}		  
	}
	  
	producto = encontrarProducto(); 

	console.log(producto.nombre);  
	  
	contenedorProducto.innerHTML +=  
'<div class="card mx-auto" style="max-width: 540px;">'+  
 ' <div class="row g-0">' + 
    '<div class="col-md-4">' +   
     ' <img src="' + producto.foto + '" class="img-fluid rounded-start" alt="' + producto.nombre + '">'+  
    '</div>'+  
    '<div class="col-md-8">'+  
      '<div class="card-body">'+  
        '<h5 class="card-title">' + producto.nombre + ' </h5>'+  
        '<p class="card-text">' + producto.descripcion + '</p>'+  
		'<p>Categoría: ' + producto.categoria + '</p>' +  
		'<p>Precio: $' + producto.precio + '</p>' +  
		'<p>IVA: ' + producto.iva + '</p>' +  
		'<button class="boton" id="botonCarrito">' +  
			'Agregar al carrito' +  
		'</button>'+  
      '</div>'+  
    '</div>'+  
  '</div>'+  
'</div>';  


	let botonCarrito = document.getElementById('botonCarrito');


	botonCarrito.addEventListener('click', function(){

		agregarCarrito(producto.nroIdentificador);

	});

});