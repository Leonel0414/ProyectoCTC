export class Producto {
	constructor(nombre,stock,precio,foto,iva,categoria,descripcion){
		this._nombre = nombre;
		this._stock = stock;
		this._precio = precio;
		this._foto = foto;
		this._iva = iva;
		this._categoria = categoria;
		this._descripcion = descripcion;
		this._nroIdentificador = null;
	}

	get nombre(){
		return this._nombre;
	}
	set nombre(nuevoNombre){
		if(nuevoNombre.length > 4 && nuevoNombre < 20){
			this._nombre = nuevoNombre;		
		}
	}

	get stock(){
		return this._stock;
	}

	set stock(nuevoStock){
		if(nuevoStock > 0){
			this._stock = nuevoStock;
		}
	}

	get precio(){
		return this._precio;
	}
	set precio(nuevoPrecio){
		if(nuevoPrecio > 0){
			this._precio = nuevoPrecio;
		}
	}
	get foto(){
		return this._foto;
	}
	set foto(nuevaFoto){
		if(nuevaFoto.length > 5){
			this._foto = nuevaFoto;
		}
	}
	get iva(){
		return this._iva;
	}
	set iva(nuevoIva){
		if(nuevoIva == 'Basico' || nuevoIva == 'Minimo' || nuevoIva == 'Extento'){
			this._iva = nuevoIva;
		}
	}
	get categoria(){
		return this._categoria;
	}
	set categoria(nuevaCategoria){
		if(nuevaCategoria == 'ropa' || nuevaCategoria == 'juguetes' || nuevaCategoria == 'electrodomestico'){
			this._categoria = nuevaCategoria;
		}
	}

	get descripcion(){
		return this._descripcion;
	}

	set descripcion(nuevaDescripcion){
		if(nuevaDescripcion.length > 10){
			this._descripcion = nuevaDescripcion;
		}

	}
	get nroIdentificador(){
    return this._nroIdentificador;
	}

	set nroIdentificador(nuevoIdentificador){
		this._nroIdentificador = nuevoIdentificador;
	}

	modificar(nombre,stock,precio,foto,iva,categoria,descripcion){
		this.nombre = nombre;
		this.stock = stock;
		this.precio = precio;
		this.foto = foto;
		this.iva = iva;
		this.categoria = categoria;
		this.descripcion = descripcion;
			

	}

}