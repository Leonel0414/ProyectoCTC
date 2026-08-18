import { Producto } from '../script/producto.js';

export class GestorProductos {
    constructor(){
        this.productos = [];
        let productosGuardados =
            JSON.parse(localStorage.getItem("productosRegistrados"));

        if (productosGuardados) {

            for (let i = 0; i < productosGuardados.length; i++) {

                let producto = new Producto(
                    productosGuardados[i]._nombre,
                    productosGuardados[i]._stock,
                    productosGuardados[i]._precio,
                    productosGuardados[i]._foto,
                    productosGuardados[i]._iva,
                    productosGuardados[i]._categoria,
                    productosGuardados[i]._descripcion
                );
                producto.nroIdentificador =
                    productosGuardados[i]._nroIdentificador;

                this.productos.push(producto);
            }}

        let numeroGuardado =
            JSON.parse(localStorage.getItem("nroIdentificacion"));
        if (numeroGuardado != null) {

            this.nroIdentificacion = numeroGuardado;


        } else {
            this.nroIdentificacion = 1;
        }
    


    }
    guardar(){
        localStorage.setItem("productosRegistrados",JSON.stringify(this.productos));
    }

    agregarProducto(producto){

        producto.nroIdentificador = this.nroIdentificacion;

        this.nroIdentificacion++;

        localStorage.setItem("nroIdentificacion",this.nroIdentificacion);

        this.productos.push(producto);
        this.guardar();

    }
    buscarProducto(nombre){

        for(let i = 0;i < this.productos.length;i++){
            if (this.productos[i].nombre.toLowerCase() == nombre.toLowerCase()) {
                return i;
        }

    }
    return null;
    }

    borrarProducto(nombre) {

        for (let i = 0; i < this.productos.length; i++) {

            if (this.productos[i].nombre.toLowerCase() == nombre.toLowerCase()) {
                 this.productos.splice(i, 1);
                this.guardar();
                return;
            }
     
        }}
        



}