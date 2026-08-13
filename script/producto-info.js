let productos = [];
let identificacion = [];
let productosRegistrados = JSON.parse(localStorage.getItem("productosRegistrados"));
let nrosIdentificacion = JSON.parse(localStorage.getItem("nrosIdentificacion"));
let contenedorProducto = document.getElementById('productos-tarjeta');
if(productosRegistrados){
	
	productos = productosRegistrados;
}
if(nrosIdentificacion){
	identificacion = nrosIdentificacion;	
}

let params = new URLSearchParams(window.location.search);
let productoID = params.get("id");

document.addEventListener("DOMContentLoaded", function(){

	let producto;
	
	function encontrarProducto(){
		
		for(let i = 0 ; i < productos.length; i++)
		{

			if(productos[i].nroIdentificador == productoID)
			{return productos[i]}

		}		
	}
	
	producto = encontrarProducto();
	console.log(producto.nombre	);
	
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
	'<button class="boton" onclick="agregarCarrito(' + producto.nroIdentificador + ')">' +
			'Agregar al carrito' +
		'</button>' +
      '</div>'+
    '</div>'+
  '</div>'+
'</div>';


	
	
	
	
		});
	
	