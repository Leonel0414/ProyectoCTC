

let productosPredeterminados = [];

let productos = [];
let identificacionSinMostrar = 0 ;

let productosRegistrados = JSON.parse(localStorage.getItem("productosRegistrados"));

let nrosIdentificacion = JSON.parse(localStorage.getItem("nrosIdentificacion"));

let compras = JSON.parse(localStorage.getItem("compras"));

let contenedorProducto = document.getElementById('productos-tarjeta');
let recibo = document.getElementById('recibo');
if(productosRegistrados){
	
	productos = productosRegistrados;
}


if(nrosIdentificacion){
	identificacionSinMostrar = nrosIdentificacion;	
}





function crearProducto(){
	
	if(document.getElementById("nombreProducto").value == ""){
		alert('Agregue un nombre!');
		return
		
	}
	else if(document.getElementById("cantidadProducto").value == "" || document.getElementById("cantidadProducto").value < 1){
		alert('Ingrese un stock valido');
		return
		
	}
	else if(document.getElementById("precioProducto").value == ''){
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
	
	 




	let producto = {
		nombre : document.getElementById("nombreProducto").value,
		stock : document.getElementById("cantidadProducto").value,
		precio: document.getElementById("precioProducto").value,
		foto :document.getElementById("imagenProducto").value,
		iva :document.getElementById("ivaProducto").value,
		categoria : document.getElementById("categoriaProducto").value,
		descripcion : document.getElementById("infoProducto").value,
		nroIdentificador: contadorIdentificador()
	};
	

	

	
	productos.push(producto);
	identificacionSinMostrar++;
	localStorage.setItem('nrosIdentificacion', identificacionSinMostrar);
	localStorage.setItem('productosRegistrados',JSON.stringify(productos));
	
	alert("Producto " + producto.nombre + " agregado correctamente!");
	
	
	borrar(2);
}

addEventListener('DOMContentLoaded',function(){
	

for(let i = 0; i< productos.length; i++){
	
	parrafo.innerHTML += '<ul> ' + ' <li> ' + productos[i].nombre + '</li>' + ' </ul>' 
	
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
		if(!document.getElementById("productoABuscar").value){
			
			alert('Elemento no existente!');
			return
		}
	productos = productos.filter(function(producto)
	{
	return producto.nombre != document.getElementById("productoABuscar").value
	});
	
	alert('Producto ' + document.getElementById('productoABuscar').value + ' eliminado correctamente!');
	borrar(2);
		
	console.log(productos);
	localStorage.setItem('productosRegistrados',JSON.stringify(productos));

	location.reload()
	
}

function contadorIdentificador(){
	return identificacionSinMostrar
	
}



function cargarinputs(posicion){
	document.getElementById('nombreProductoAModificar').value = productos[posicion].nombre;
	document.getElementById('precioProductoAModificar').value = productos[posicion].precio;
	document.getElementById('cantidadProductoAModificar').value = productos[posicion].stock;
	document.getElementById('imagenAModificar').value = productos[posicion].foto;
	document.getElementById('ivaProductoAModificar').value = productos[posicion].iva;
	document.getElementById('categoriaProductoAModificar').value = productos[posicion].categoria;
	document.getElementById('infoProductoAModificar').value = productos[posicion].descripcion;
}


function buscarProducto(){
    let nombreProductoABuscar = document.getElementById("productoABuscar").value;

    for(let i = 0; i < productos.length; i++){
        if(nombreProductoABuscar.toLowerCase() == productos[i].nombre.toLowerCase()){
            return i;
    }
    }

    alert('Producto no existente');
    return -1;
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
		productos[producto].nombre = document.getElementById('nombreProductoAModificar').value;

	}
	
	let inputImagen = document.getElementById('imagenAModificar').value;

	if (inputImagen != "") {
		productos[producto].foto = inputImagen;
	}
    if(document.getElementById('cantidadProductoAModificar').value)
	{
		productos[producto].stock = document.getElementById('cantidadProductoAModificar').value;
	}
	
	
	
	if(document.getElementById('precioProductoAModificar').value != ''){
		productos[producto].precio = document.getElementById('precioProductoAModificar').value;

	}
	
	
	
	if(document.getElementById('ivaProductoAModificar').value != ''){
		productos[producto].iva = document.getElementById('ivaProductoAModificar').value;

	}
	
	if(document.getElementById('categoriaProductoAModificar').value != '')
	{
		productos[producto].categoria = document.getElementById('categoriaProductoAModificar').value;

	}
	if(document.getElementById('infoProductoAModificar').value != '')
	{
		productos[producto].descripcion = document.getElementById('infoProductoAModificar').value;

	}
	if(producto === -1){
		return
	}
	
	alert('Producto modificado correctamente!');
	
	localStorage.setItem('productosRegistrados',JSON.stringify(productos));
	
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


