let productos = []

class produc {
    static id = 0
    constructor (nombre, precio, descripcion, imagen) {
        this.id = ++produc.id,
        this.nombre = nombre,
        this.precio = precio,
        this.descripcion = descripcion,
        this.imagen = imagen
    }
}

productos.push(new produc("Cart TE 30", 180000, "Carro de Terciado de pino barnizado, con cubierta lisa, que soporta 30 kg de carga. Ideal para todo tipo de eventos.", "../media/carrito-te30.jpg"))
productos.push(new produc("Cart RD 60", 200000, "Carro de Terciado Ranurado de pino barnizado, con cubierta lisa, que soporta 30 kg de carga. Ideal para todo tipo de eventos.", "../media/carrito-rd30.jpg"))
productos.push(new produc("Barra JD", 90000, "Barra de Barriles Jack Daniels, con cubierta lisa de pino barnizado, que soporta 30 kg de carga. Ideal para eventos de catering y mixología.", "../media/barra-tarros.jpg"))
productos.push(new produc("Barra BT", 60000, "Barra estilo Bar con ranuras en formato cava, con cubierta lisa de pino barnizado, que soporta 30 kg de carga. Ideal para decorar espacios dedicados.", "../media/barra-botellas.jpg"))