let productos = [];
let productosPredeterminados = [];

let productosRegistrados = JSON.parse(localStorage.getItem("productosRegistrados"))
let contenedorRecomendados = document.getElementById('contenedorProductosRecomendados');
if(productosRegistrados){
	
	productos = productosRegistrados;

}
let identificacionSinMostrar = 0 ;
let nrosIdentificacion = JSON.parse(localStorage.getItem("nrosIdentificacion"));

function contadorIdentificador(){
	return identificacionSinMostrar
	
}

let remera = {
		nombre :'Remera',
		stock : 10,
		precio: 600,
		foto : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZpePYg_wXBuFtbwHmCLK8J9WwWJ1hodtOPVcXNAqSWQ&s=10',
		iva : 'Basico',
		categoria :'ropa',
		descripcion : 'La mejor remera del mundo',
		nroIdentificador: identificacionSinMostrar++
	};
	


let heladera = {
		nombre :'Heladera',
		stock : 10,
		precio: 25000,
		foto : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHoRzrGqCF_jN_zcu83LSpWIFcYuqpAfDS4Q11BPHofQ&s',
		iva : 'Minimo',
		categoria : 'electrodomestico'		,
		descripcion : 'La mejor heladera del mundo',
		nroIdentificador: identificacionSinMostrar++

}	
	
let ligthyear ={
		nombre :'Buzz Lightyear',
		stock : 10,
		precio: 560,
		foto :' https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1-XTE8QKmngh0TobclNpjGQmYP_pQafPqVNB9wd_7_A&s=10',
		iva : 'Minimo',
		categoria : 'juguetes' ,
		descripcion : 'El mejor juguete del mundo',
		nroIdentificador: identificacionSinMostrar++
	
}


let pantalon = {
		nombre :'Pantalon',
		stock : 10,
		precio: 2500,
		foto : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJv2nXSqo171gJP8ndkByfFetQZxzluIUS76ds0RfQiw&s',
		iva : 'Basico',
		categoria :'ropa',
		descripcion : 'El mejor pantalon del mundo',
		nroIdentificador: identificacionSinMostrar++
	
}
productosPredeterminados = [remera,heladera,ligthyear,pantalon];

if(!productos.some(producto => producto.nombre.includes('mera'))){
    productos.push(remera);
    identificacionSinMostrar++;
}

if(!productos.some(producto => producto.nombre.includes('adera'))){
    productos.push(heladera);
    identificacionSinMostrar++;
}

if(!productos.some(producto => producto.nombre.includes('ear'))){
    productos.push(ligthyear);
    identificacionSinMostrar++;
}

if(!productos.some(producto => producto.nombre.includes('lon'))){
    productos.push(pantalon);
    identificacionSinMostrar++;
}
localStorage.setItem('nrosIdentificacion', identificacionSinMostrar);
localStorage.setItem('productosRegistrados',JSON.stringify(productos));


function buscaElProducto(idProducto){
	
	window.location.href = "producto-info.html?id="+idProducto;
}


addEventListener('DOMContentLoaded',function(){

	let cantidad = 0;

	for(let i = 0;i<4;i++){
		if(productos[i].stock != 0){
			cantidad++
			contenedorRecomendados.innerHTML += '<div class="producto_Recomendado">' + '<h3> ' +  productos[i].nombre  + '</h3>' + '<p>Precio: $' + productos[i].precio + '</p>' + '<p> Stock: ' + productos[i].stock + '</p>' + ' <p>IVA: ' + productos[i].iva + '</p> <img class = "img_productoRecomendado" src="'+ productos[i].foto +'"  id="imagenProductoRecomendado" > <div class="contenedorBotonesAdmin" ><button type="button" class="boton" onclick="agregarCarrito(' + productos[i].nroIdentificador + ' )">Agregar al carrito</button><button type="button" class="boton" onclick="buscaElProducto(' + productos[i].nroIdentificador + ')">Ver Producto</button></div></div>'
		};

		if(cantidad === 5){
			return
		}
	}	
})

function mostrar(){
	
console.log(productos);	
	
}

mostrarProductosIndex(productos)



function mostrarProductosIndex(array){


	let ul = document.getElementById('ul_productos');
	ul.innerHTML = '';

	array.forEach(producto =>{
		if(producto.stock != 0){
		let li = document.createElement('li')
		li.className = 'productosIndex';
		li.innerHTML = `
			<img class = 'img_productosIndex' src= "${producto.foto}">
			<p><span>Nombre del producto:</span><br>${producto.nombre}</p>
			<p><span>Precio:</span><br>$${producto.precio}</p>
			<p><span>Disponibles:</span><br>${producto.stock}</p>
			<div>
				<button type="button" class="boton" onclick="agregarCarrito(${producto.nroIdentificador})">Agregar al carrito</button><br>
				<button type="button" class="boton" onclick="buscaElProducto(${producto.nroIdentificador})">Ver Producto</button>
			</div>
			`
		ul.appendChild(li);
	}})
}

function inputBuscarProducto(){

let buscadorProducto = document.getElementById('buscadorProducto').value.toLowerCase();

	let resultado = productos.filter(producto => producto.nombre.toLowerCase().includes(buscadorProducto));
	mostrarProductosIndex(resultado);
	
	
}

function selectorCategoria(){
	let selectorCategoria = document.getElementById('selectorCategoria').value

	if(selectorCategoria == 'sinCategoria'){
		mostrarProductosIndex(productos)
		return
	}

	let resultado = productos.filter(producto => producto.categoria == selectorCategoria);
	mostrarProductosIndex(resultado);
}