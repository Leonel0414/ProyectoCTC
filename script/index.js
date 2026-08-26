import { GestorProductos } from '../gestores/gestorProductos.js';
import { Producto } from './producto.js';
import {agregarCarrito} from './carrito-de-compras.js'

let gestor = new GestorProductos();

let productosPredeterminados = [];

let contenedorRecomendados = document.getElementById('contenedorProductosRecomendados');

let identificacionSinMostrar = 0 ;
let nrosIdentificacion = JSON.parse(localStorage.getItem("nrosIdentificacion"));

function contadorIdentificador(){
	return identificacionSinMostrar
	
}

let remera = new Producto (
		'Remera',
		10,
		600,
		'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZpePYg_wXBuFtbwHmCLK8J9WwWJ1hodtOPVcXNAqSWQ&s=10',
		'Basico',
		'ropa',
		'La mejor remera del mundo'
);
	


let heladera = new Producto(
		'Heladera',
		10,
		25000,
		'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHoRzrGqCF_jN_zcu83LSpWIFcYuqpAfDS4Q11BPHofQ&s',
		'Minimo',
		'electrodomestico'		,
		'La mejor heladera del mundo',

)
	
let ligthyear = new Producto(
		'Buzz Lightyear',
		10,
		560,
		' https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1-XTE8QKmngh0TobclNpjGQmYP_pQafPqVNB9wd_7_A&s=10',
		'Minimo',
		'juguetes' ,
		'El mejor juguete del mundo',
	
)


let pantalon = new Producto(
		'Pantalon',
		10,
		2500,
		'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJv2nXSqo171gJP8ndkByfFetQZxzluIUS76ds0RfQiw&s',
		'Basico',
		'ropa',
		'El mejor pantalon del mundo',
	
)
productosPredeterminados = [remera,heladera,ligthyear,pantalon];

if(!gestor.productos.some(producto => producto.nombre.includes('mera'))){
   
	gestor.agregarProducto(remera)
	gestor.guardar();
	console.log(remera);
	console.log(remera.nroIdentificador);
}

if(!gestor.productos.some(producto => producto.nombre.includes('adera'))){
    
	gestor.agregarProducto(heladera);
	gestor.guardar();
}


if(!gestor.productos.some(producto => producto.nombre.includes('ear'))){
    
	gestor.agregarProducto(ligthyear);
	gestor.guardar();
}

if(!gestor.productos.some(producto => producto.nombre.includes('lon'))){
   
	gestor.agregarProducto(pantalon);
	gestor.guardar()
}


function buscaElProducto(idProducto){
	
	window.location.href = "producto-info.html?id="+idProducto;
}



	
console.log(gestor.productos);	
	


mostrarProductosIndex(gestor.productos)

let botonCarrito = document.getElementById('botonCarrito');

let botonProducto = document.getElementById('botonProducto');


function mostrarProductosIndex(productos){

	let ul = document.getElementById('ul_productos');

	ul.innerHTML = '';

	productos.forEach(producto =>{

		if(producto.stock != 0){

			let li = document.createElement('li');

			li.className = 'productosIndex';

			li.innerHTML = `
				<img class = 'img_productosIndex' src= "${producto.foto}">

				<p><span>Nombre del producto:</span><br>${producto.nombre}</p>

				<p><span>Precio:</span><br>$${producto.precio}</p>

				<p><span>Disponibles:</span><br>${producto.stock}</p>

				<div>

					<button type="button" class="boton botonCarrito">
						Agregar al carrito
					</button>

					<button type="button" class="boton botonProducto">
						Ver Producto
					</button>

				</div>
			`;

			let botonCarrito = li.querySelector('.botonCarrito');

			let botonProducto = li.querySelector('.botonProducto');


			botonCarrito.addEventListener('click', function(){

				agregarCarrito(producto.nroIdentificador);

			});

			botonProducto.addEventListener('click', function(){

				buscaElProducto(producto.nroIdentificador);

			});


			ul.appendChild(li);

		}
	})
}
let inputBuscarProductoHTML  = document.getElementById('buscadorProducto');
let inputCategoria = document.getElementById('selectorCategoria');

inputBuscarProductoHTML.addEventListener('input', inputBuscarProducto);
inputCategoria.addEventListener('change',selectorCategoria);

function inputBuscarProducto(){

let buscadorProducto = document.getElementById('buscadorProducto').value.toLowerCase();

	let resultado = gestor.productos.filter(producto => producto.nombre.toLowerCase().includes(buscadorProducto));
	mostrarProductosIndex(resultado);
	
	
}

function selectorCategoria(){
	let selectorCategoria = document.getElementById('selectorCategoria').value

	if(selectorCategoria == 'sinCategoria'){
		mostrarProductosIndex(gestor.productos)
		return
	}

	let resultado = gestor.productos.filter(producto => producto.categoria == selectorCategoria);
	mostrarProductosIndex(resultado);
}