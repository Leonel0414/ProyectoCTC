

//storage

productosRegistrados = JSON.parse(localStorage.getItem("productosRegistrados"))

//CARRITO DE COMPRAS

let listaCarrito = JSON.parse(localStorage.getItem('listaCarrito')) || [];

mostrarCarrito();


console.log('listaCarrito:',listaCarrito);

function agregarCarrito(id){

    let existe = false;

    for(let producto of listaCarrito){
        if(producto.nroIdentificador == id){
            existe = true
        }
    }

    if(existe){
        for(let producto of listaCarrito){
            if(producto.nroIdentificador == id && producto.cantidad < producto.stock){
                producto.cantidad++
                localStorage.setItem('listaCarrito',JSON.stringify(listaCarrito));
            }
        }
    return
    }
    
    for(let producto of productosRegistrados){
        if(producto.nroIdentificador == id){
            listaCarrito.push({
                ...producto,cantidad: 1
            })
            alert(producto.nombre + ' agregado al carrito')
            localStorage.setItem('listaCarrito', JSON.stringify(listaCarrito))
        }
    }
}

function borrarProductoCarrito(id){
    listaCarrito = listaCarrito.filter(producto => producto.nroIdentificador != id)
    
    for(let producto of listaCarrito){
        if(id == producto.nroIdentificador){
            producto.cantidad = 1;
        }
    }

    localStorage.setItem('listaCarrito', JSON.stringify(listaCarrito))
    location.reload()
}


function mostrarCarrito(){
    
    let ul = document.getElementById('carritoLista');
    let resumen = document.getElementById('resumenCarrito');
    
    listaCarrito = listaCarrito.filter(producto => producto.stock != 0)
    localStorage.setItem('listaCarrito',JSON.stringify(listaCarrito))

    
    resumen.innerHTML = '';
    ul.innerHTML = '';
    
    let total = 0;
    
    if(listaCarrito){
		let TotalPrecio = 0;
		let TotalIva = 0;
        listaCarrito.forEach(producto =>{
        
        let productoPrecio = multiplicarPrecio(producto.cantidad,producto.precio);
        let productoIva = multiplicarIva(producto.iva,productoPrecio);
		TotalIva += productoIva;
		TotalPrecio += productoPrecio;

        total += (productoPrecio + productoIva);

        let li = document.createElement('li');
        li.className = 'carrito_li'
        li.innerHTML = `
            <img src= "${producto.foto}">
            <p>${producto.nombre} <span>Disponible: ${producto.stock}</span></p>
            <div class = 'carrito_item-input'>
                <button class='BtnCantidades' onclick='botonRestar(${producto.nroIdentificador})'>-</button>
                <input type = 'number' class = 'input' value = '${producto.cantidad}' id = 'cantidadProducto${producto.nroIdentificador} readOnly'>
                <button class='BtnCantidades' onclick='botonSumar(${producto.nroIdentificador}, ${producto.stock})'>+</button>
            </div>
            <p class = 'carrito_item-precio'>${producto.cantidad} x $${productoPrecio}</p>
            <p>IVA ${producto.iva}: $${productoIva.toFixed(1)}</p>
            <button type = "button" onClick = "borrarProductoCarrito(${producto.nroIdentificador})">X</button>
            `;
        ul.appendChild(li);
        
        })
        //resumen
        if(listaCarrito.length == 0){
            ul.innerHTML ='<center><p style = "color:white; text-transform: uppercase; font-weight:bold; margin: 10px 0;">Carrito vacio</p></center>';
        }
        else{
            resumen.innerHTML = '<p>SubTotal: $' + TotalPrecio + ' + IVA: $' + TotalIva.toFixed(1) + '  = <br><br>TOTAL: $' + total.toFixed(1) + ' </p><button onclick="botonComprar()">Comprar</button>'
        }
    }
}

function multiplicarPrecio(cantidad, precio){
    let resultado = (precio * cantidad);
    return resultado
}

function multiplicarIva(tipoIva, precioMultiplicado){
    
    let iva;

    if(tipoIva == 'Minimo'){
        iva = 0.10;
    }
    else if(tipoIva == 'Basico'){
        iva = 0.22;
    }

    let ivaMultiplicado = (precioMultiplicado * iva);
    return ivaMultiplicado;
}

//botones
function botonSumar(id, stock){

    for(let producto of listaCarrito){
        if(id == producto.nroIdentificador){
            if(producto.cantidad < stock){
                producto.cantidad++
                localStorage.setItem('listaCarrito',JSON.stringify(listaCarrito));

	            document.getElementById('carritoLista').innerHTML = '';
                mostrarCarrito()
            }   
        }
    }
}

function botonRestar(id){
    for(let producto of listaCarrito){
        if(id == producto.nroIdentificador){
            if(producto.cantidad > 1){
                producto.cantidad--
                localStorage.setItem('listaCarrito',JSON.stringify(listaCarrito));

	            document.getElementById('carritoLista').innerHTML = '';
                mostrarCarrito()
            }
        }
    }
};

//Funcion comprar
let compras = JSON.parse(localStorage.getItem('compras')) || [];

function botonComprar(){
    
    let total = 0;

    let productosComprados =  [];
	
    let nombreComprador = document.getElementById('nombreComprador').value;
	if(nombreComprador == "" )
		{
		alert('Ingrese su nombre');
		return
		}

    let fechaCompra = new Date();
	let opciones = { dia : 'long' , mes: 'long', anio : 'numeric' };

    listaCarrito.forEach(producto =>{
		
        let totalPrecios = multiplicarPrecio(producto.cantidad, producto.precio);
        let ivaTotal = multiplicarIva(producto.iva, totalPrecios);
        total += totalPrecios + ivaTotal;
		
        let productoComprado = {
            nombre: producto.nombre,
            cantidad: producto.cantidad,
            subtotal: totalPrecios,
            totalIva: ivaTotal,
        }

		

        productosComprados.push(productoComprado);
		
		
        

        for(let productosExistentes of productosRegistrados){
            if(productosExistentes.nroIdentificador == producto.nroIdentificador){
                if(productosExistentes.stock >= producto.cantidad){
                    productosExistentes.stock -= producto.cantidad;
                    producto.stock = productosExistentes.stock
                    localStorage.setItem('productosRegistrados', JSON.stringify(productosRegistrados));
                }
                else{
                    alert(`Stock insuficiente del producto: ${producto.nombre}`);
                    return
                }
            }
            
        }
    });
    
    let compra = {
			nombreComprador: nombreComprador,
            fecha : fechaCompra.toLocaleDateString('es-UY',opciones),
            totalCompra: total,
			productos: productosComprados
		}
    
    compras.push(compra);
    
    localStorage.setItem('compras',JSON.stringify(compras));

    mostrarCarrito()
    alert("Compra realizada con exito")
}