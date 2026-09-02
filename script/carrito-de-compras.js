
import { GestorProductos } from '../gestores/gestorProductos.js';
import { Producto } from './producto.js';
//API MONeda

let euro = JSON.parse(localStorage.getItem('Euro'));
let peso = JSON.parse(localStorage.getItem('Peso'));

console.log(euro);
 
let gestorCarrito = new GestorProductos; 
let productosRegistrados = gestorCarrito.productos; 
let usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo')); 
//CARRITO DE COMPRAS 
let listaCarritoGuardado = JSON.parse(localStorage.getItem('listaCarrito')) || []; 
 
let listaCarrito = []; 
 
for(let i = 0; i < listaCarritoGuardado.length; i++){ 
 
    let producto = listaCarritoGuardado[i]; 
 
    let productoCarrito = new Producto( 
        producto._nombre, 
        producto._stock, 
        producto._precio, 
        producto._foto, 
        producto._iva, 
        producto._categoria, 
        producto._descripcion 
    ); 
    productoCarrito.nroIdentificador = producto._nroIdentificador; 
 
    productoCarrito.cantidad = producto.cantidad; 
    listaCarrito.push(productoCarrito); 
 
} 
 
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
 
    for(let producto of gestorCarrito.productos){ 
 
        if(producto.nroIdentificador == id){ 
 
            producto.cantidad = 1; 
 
            listaCarrito.push(producto); 
 
            alert(producto.nombre + ' agregado al carrito') 
 
            localStorage.setItem('listaCarrito', JSON.stringify(listaCarrito)) 
 
        }} 
 
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
 
async function mostrarCarrito(){

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
                <img src="${producto.foto}"> 
                <p>${producto.nombre} <span>Disponible: ${producto.stock}</span></p> 
                <div class="carrito_item-input"> 
 
                    <button class="BtnCantidades botonRestar">-   </button> 
                     
                    <input type="number" class="input" value="${producto.cantidad}" id="cantidadProducto${producto.nroIdentificador}" readOnly> 
 
                    <button class="BtnCantidades botonSumar">+</button> 
                </div> 
 
 
                <p class="carrito_item-precio"> 
                    ${producto.cantidad} x $${productoPrecio} 
                </p> 
                <p> 
                    IVA ${producto.iva}: $${productoIva.toFixed(1)} 
 
                </p> 
 
 
                <button type="button" class="botonBorrar">X</button> 
                
            `; 
 
            let botonSumarProducto = li.querySelector('.botonSumar'); 
            let botonRestarProducto = li.querySelector('.botonRestar'); 
            let botonBorrarProducto = li.querySelector('.botonBorrar'); 
            botonSumarProducto.addEventListener('click', function(){ 
 
                botonSumar(producto.nroIdentificador, producto.stock); 
 
            }); 
 
            botonRestarProducto.addEventListener('click', function(){ 
 
                botonRestar(producto.nroIdentificador); 
 
            }); 
 
            botonBorrarProducto.addEventListener('click', function(){ 
 
                borrarProductoCarrito(producto.nroIdentificador); 
 
            }); 
 
            ul.appendChild(li); 
        }) 
 
        //resumen 
 
        if(listaCarrito.length == 0){ 
 
            ul.innerHTML = 
            '<center><p style="color:white; text-transform: uppercase; font-weight:bold; margin: 10px 0;">Carrito vacio</p></center>'; 
 
        } 
        else{ 
            resumen.innerHTML = 
            '<p>SubTotal: $' + TotalPrecio + 
            ' + IVA: $' + TotalIva.toFixed(1) + 
            ' = <br><br><span id="precioCompra">TOTAL: $' + total.toFixed(1) + ' USD</span></p>' +
            '<select id="selectMoneda">' +
            '<option value="USD">Dolares</option>' +
            '<option value="EUR">Euros</option>' +
            '<option value="UYU">Pesos uruguayos</option>' +
            '</select>' +
            '<button id="botonComprar">Comprar</button>'; 
 
            let selectMoneda = document.getElementById('selectMoneda');
            let precioCompra = document.getElementById('precioCompra');

            selectMoneda.addEventListener('change', function(){

                if(selectMoneda.value == 'USD'){
                    precioCompra.textContent = `TOTAL: $${total.toFixed(1)} USD`;
                }

                else if(selectMoneda.value == 'EUR'){
                    if(euro){
                        let precioEuro = total * euro;
                        precioCompra.textContent = `TOTAL: €${precioEuro.toFixed(2)} Euros`;
                    }
                }

                else if(selectMoneda.value == 'UYU'){
                    if(peso){
                        let precioUyu = total * peso;
                        precioCompra.textContent = `TOTAL: $${precioUyu.toFixed(2)} Pesos uruguayos`;
                    }
                }

            });
 
            let botonComprarProducto = document.getElementById('botonComprar'); 
 
            botonComprarProducto.addEventListener('click', function(){ 
 
                botonComprar(); 
 
            }); 
 
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
 
    for(let producto of listaCarrito){ 
            if(id == producto.nroIdentificador){ 
 
                if(producto.cantidad < stock){ 
 
                    producto.cantidad++ 
                    localStorage.setItem('listaCarrito',JSON.stringify(listaCarrito)); 
                    document.getElementById('carritoLista').innerHTML = ''; 
 
                    mostrarCarrito() 
 
                } 
            }} 
 
} 
 
function botonRestar(id){ 
    for(let producto of listaCarrito){ 
        if(id == producto.nroIdentificador){ 
            if(producto.cantidad > 1){ 
                producto.cantidad-- 
                localStorage.setItem('listaCarrito',JSON.stringify(listaCarrito)); 
 
                document.getElementById('carritoLista').innerHTML = ''; 
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

