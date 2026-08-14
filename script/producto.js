class Producto {
	constructor(nombre,stock,precio,foto,iva,categoria,descripcion){
		this.nombre = nombre,
		this.stock = stock,
		this.precio = precio,
		this.foto = foto,
		this.iva = iva,
		this.categoria = categoria,
		this.descripcion = descripcion
	}

	modificar(nombre,stock,precio,foto,iva,categoria,descripcion){

			if(nombre != ''){
				this.nombre = nombre;
			}
			if(stock != ''){
				this.stock = stock;
			}
			if(precio != ''){
				this.precio = precio;
			}
			if(foto != ''){
				this.foto = foto;
			}
			if(iva != ''){
				this.iva = iva;
			}
			if(categoria != ''){
				this.categoria = categoria;
			}
			if(descripcion != ''){
				this.descripcion = descripcion;
			}

	}

}