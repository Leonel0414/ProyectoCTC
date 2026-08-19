//storage
productosRegistrados = JSON.parse(localStorage.getItem("productosRegistrados"));
usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo'));

//CARRITO DE COMPRAS
let listaCarrito = JSON.parse(localStorage.getItem('listaCarrito')) || [];

console.log('listaCarrito:',listaCarrito);



export function agregarCarrito(id){

    if(!usuarioActivo){

        window.location.replace('login.html');

        return;

    }


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

            producto.cantidad = 1;

            listaCarrito.push(producto);

            alert(producto.nombre + ' agregado al carrito')

            localStorage.setItem('listaCarrito', JSON.stringify(listaCarrito))

        }

    }

}



export function borrarProductoCarrito(id){

    listaCarrito = listaCarrito.filter(producto => producto.nroIdentificador != id)

    localStorage.setItem('listaCarrito', JSON.stringify(listaCarrito))

    location.reload()

}



let ul = document.getElementById('carritoLista');


if(ul){

    mostrarCarrito();

}



function mostrarCarrito(){

    let resumen = document.getElementById('resumenCarrito');


    listaCarrito = listaCarrito.filter(producto => producto.stock != 0)
    localStorage.setItem('listaCarrito',JSON.stringify(listaCarrito))

    
    resumen.textContent = '';
    ul.textContent = '';
    
    let total = 0;

    if(listaCarrito){
		let totalPrecio = 0;
		let totalIva = 0;
        listaCarrito.forEach(producto =>{
        
        let productoPrecio = multiplicarPrecio(producto.cantidad,producto.precio);
        let productoIva = multiplicarIva(producto.iva,productoPrecio);
		totalIva += productoIva;
		totalPrecio += productoPrecio;

            let productoIva = multiplicarIva(producto.iva,productoPrecio);
            TotalIva += productoIva;
            TotalPrecio += productoPrecio;
            total += (productoPrecio + productoIva);

        let li = document.createElement('li');
        li.className = 'carrito_li'
        
        let productoImg = document.createElement('img');
        productoImg.src = producto.foto;
        

        let productoNombre = document.createElement('p');
        productoNombre.textContent = `${producto.nombre}`

        let productoDisponible = document.createElement('span');
        productoDisponible.textContent = `Disponible: ${producto.stock}`
        productoNombre.append(' ',productoDisponible)

        let divisorInputCarrito = document.createElement('div')
        divisorInputCarrito.className = "carrito_item-input"
        
        let botonRestarCarrito = document.createElement("button");
        botonRestarCarrito.className = "btnCantidades";
        botonRestarCarrito.textContent = '-'
        botonRestarCarrito.addEventListener('click', () =>{
            botonRestar(producto.nroIdentificador);
        })

        let inputCarrito = document.createElement('input')
        inputCarrito.className = "input";
        inputCarrito.type = "number";
        inputCarrito.value = `${producto.cantidad}`;
        inputCarrito.id = `cantidadProducto${producto.nroIdentificador}`
        
        let botonSumarCarrito = document.createElement("button");
        botonSumarCarrito.className = "btnCantidades";
        botonSumarCarrito.textContent = '+';
        botonSumarCarrito.addEventListener("click", ()=>{
            botonSumar(producto.nroIdentificador,producto.stock);
        });

        divisorInputCarrito.append(botonRestarCarrito, inputCarrito, botonSumarCarrito)

        let precioItem = document.createElement("p");
        precioItem.className = 'carrito_item-precio';
        precioItem.textContent = `${producto.cantidad} x $${producto.precio}`;

        let ivaItem = document.createElement('p');
        ivaItem.textContent = `${producto.iva}: $${productoIva.toFixed(1)}`;

        let botonEliminar = document.createElement('button');
        botonEliminar.type = 'button';
        botonEliminar.textContent = 'X';
        botonEliminar.addEventListener('click', ()=>{
            borrarProductoCarrito(producto.nroIdentificador)
        })
        
        li.append(productoImg, productoNombre, divisorInputCarrito, precioItem, ivaItem, botonEliminar)

        ul.appendChild(li)
        })

        //resumen


        if(listaCarrito.length == 0){
            let mensajeCarrito = document.createElement('p')
            mensajeCarrito.style = "text-align: center; color:white; text-transform: uppercase; font-weight:bold; margin: 10px 0;"
            mensajeCarrito.textContent ='Carrito vacio';
            ul.append(mensajeCarrito);
        }
        else{
            let totalResumen = document.createElement('p');
            totalResumen.textContent = `SubTotal: $${totalPrecio}\n + IVA:${totalIva.toFixed(1)} =\n\nTOTAL: $${total.toFixed(1)}`
            
            let botonComprarCarrito = document.createElement('button');
            botonComprarCarrito.textContent = 'COMPRAR'
            botonComprarCarrito.addEventListener('click', () =>{
                botonComprar();
            })
            
            resumen.append(totalResumen,botonComprarCarrito) 
        }
    }}



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
    else if(tipoIva == 'Extento'){

        iva = 0;

    }
    let ivaMultiplicado = (precioMultiplicado * iva);

    return ivaMultiplicado;
}

//botones


function botonSumar(id, stock){


	            document.getElementById('carritoLista').textContent = '';
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

	            document.getElementById('carritoLista').textContent = '';
                mostrarCarrito()

            }}

    }

};

//Funcion comprar
let compras = JSON.parse(localStorage.getItem('compras')) || [];

function botonComprar(){

    let total = 0;
    let productosComprados =  [];

    let nombreComprador = usuarioActivo.nombre;
    let fechaCompra = new Date();

    let opciones = {
        dia : 'long',
        mes : 'long',
        anio : 'numeric'
    };
    listaCarrito.forEach(producto =>{

        let totalPrecios =
        multiplicarPrecio(producto.cantidad, producto.precio);
        let ivaTotal =
        multiplicarIva(producto.iva, totalPrecios);

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
                    producto.stock = productosExistentes.stock;
                }

                else{
                    alert(`Stock insuficiente del producto: ${producto.nombre}`);
                    return

                }}
        }

});


    gestorCarrito.guardar();



    let compra = {

        nombreComprador: nombreComprador,

        fecha : fechaCompra.toLocaleDateString('es-UY',opciones),

        totalCompra: total,

        productos: productosComprados

    }



    compras.push(compra);

    localStorage.setItem('compras',JSON.stringify(compras));
    listaCarrito = [];
    localStorage.removeItem("listaCarrito");


    nombreComprador = "";

    mostrarCarrito();

}