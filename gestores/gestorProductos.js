class GestorProductos {
    constructor(){
        this.productos = [];
        let productosGuardados =
            JSON.parse(localStorage.getItem("productosRegistrados"));

        if (productosGuardados) {

            for (let i = 0; i < productosGuardados.length; i++) {

                let producto = new Producto(
                    productosGuardados[i].nombre,
                    productosGuardados[i].stock,
                    productosGuardados[i].precio,
                    productosGuardados[i].foto,
                    productosGuardados[i].iva,
                    productosGuardados[i].categoria,
                    productosGuardados[i].descripcion
                );
                producto.nroIdentificador =
                    productosGuardados[i].nroIdentificador;

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