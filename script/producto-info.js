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
	'<section class="infoProductoCard">' +
		'<img src="' + producto.foto + '" alt="' + producto.nombre + '">' +

		'<h2>' + producto.nombre + '</h2>' +

		'<p>Precio: $' + producto.precio + '</p>' +

		'<p>Información:' + producto.descripcion + '</p>' +

		'<p>Categoría: ' + producto.categoria + '</p>' +

		'<p>IVA: ' + producto.iva + '</p>' +

		'<p>Stock: ' + producto.stock + '</p>' +

		'<button class="boton" onclick="agregarCarrito(' + producto.nroIdentificador + ')">' +
			'Agregar al carrito' +
		'</button>' +
	'</section>';	
	
	
	
		});
	
	