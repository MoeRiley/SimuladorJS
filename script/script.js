let productos = []

class produc {
    static id = 0
    constructor (nombre, precio, descripcion, imagen, cantidad) {
        this.id = ++produc.id,
        this.nombre = nombre,
        this.precio = precio,
        this.descripcion = descripcion,
        this.imagen = imagen,
        this.cantidad = cantidad
    }
}

productos.push(new produc("Cart TE 30", 180000, "Carro de Terciado de pino barnizado, con cubierta lisa, que soporta 30 kg de carga. Ideal para todo tipo de eventos.", "../media/carrito-te30.jpg", 0))
productos.push(new produc("Cart RD 60", 200000, "Carro de Terciado Ranurado de pino barnizado, con cubierta lisa, que soporta 30 kg de carga. Ideal para todo tipo de eventos.", "../media/carrito-rd30.jpg", 0))
productos.push(new produc("Barra JD", 90000, "Barra de Barriles Jack Daniels, con cubierta lisa de pino barnizado, que soporta 30 kg de carga. Ideal para eventos de catering y mixología.", "../media/barra-tarros.jpg", 0))
productos.push(new produc("Barra BT", 60000, "Barra estilo Bar con ranuras en formato cava, con cubierta lisa de pino barnizado, que soporta 30 kg de carga. Ideal para decorar espacios dedicados.", "../media/barra-botellas.jpg", 0))

let cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
console.log(cartProducts)

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
                                            <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                                                Button with data-bs-target
                                            </button>
                                            <div class="collapse" id="collapseExample">
                                                <div class="card card-body">
                                                    <button id="plus-button">+</button>
                                                    <span id="counter">0</span>
                                                    <button id="minus-button">-</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>`
        productsContainer.appendChild(card)
    })
    addToCartButton()
}
renderProductos(productos)

//botton mas y menos
let sumar = document.getElementById("plus-button")
let restar = document.getElementById("minus-button")
let counter = document.getElementById("counter")
let contador = 0

sumar.onclick = () => {
    contador++
    counter.innerHTML = contador
}

restar.onclick = () => {
    contador--
    counter.innerHTML = contador
}


function addToCartButton () {
    addButton = document.querySelectorAll(".productoAgregar")
    addButton.forEach(button => {
        button.onclick = (e) => {
            const productId= e.currentTarget.id
            const selectedProduct = productos.find(producto => producto.id == productId)
            let cartProduct =  cartProducts.find(producto => producto.id == productId)
            // Si no existe el producto en el carro
            if (!cartProduct) {
                // Agregar producto nuevo al carro
                cartProducts.push(selectedProduct) // se agrega con cant 0 por eso abajo tb se le agrega 1
                cartProduct = cartProducts.find(producto => producto.id == productId)
            }
            console.log(cartProduct)
            // Agregar uno a la cantidad de cartProduct
            cartProduct['cantidad'] += 1    
            // Actualizar info de carrito en local storage
            localStorage.setItem("cartProducts", JSON.stringify(cartProducts))
        }
    })
}
