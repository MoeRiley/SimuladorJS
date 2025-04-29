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

let cartProducts = []

let productsContainer = document.getElementById("products-container")

function renderProductos(productsArray) {
    productsArray.forEach(producto => {
        const card = document.createElement("div")
        card.innerHTML =   `<div class="card mb-3 text-center">
                                <div class="row g-0">
                                    <div class="col-md-4">
                                        <img src=${producto.imagen} class="img-fluid rounded-start" alt="Imagen del Producto">
                                    </div>
                                    <div class="col-md-8">
                                        <div class="card-body">
                                            <h3 class="card-title">${producto.nombre}</h3>
                                            <p class="card-text">${producto.descripcion}</p>
                                            <p class="card-text">$${producto.precio}</p>

                                            <button class="productoAgregar btn btn-primary" id="${producto.id}">Agregar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>`
        productsContainer.appendChild(card)
    })
    addToCartButton()
}
renderProductos(productos)

function addToCartButton () {
    addButton = document.querySelectorAll(".productoAgregar")
    addButton.forEach(button => {
        button.onclick = (e) => {
            const productId= e.currentTarget.id
            const selecterProducts = productos.find(producto => producto.id == productId)
            cartProducts.push(selecterProducts)
            console.log(cartProducts)
            localStorage.setItem("cartProducts", JSON.stringify(cartProducts))
        }
    })
}