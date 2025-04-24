const productos= [
    {
        id: 1,
        nombre: "Carrito TE 30",
        precio: 180000,
        imagen: "/media/carrito-te30.jpg"
    },
    {
        id: 2,
        nombre: "Carrito RD 30",
        precio: 200000,
        imagen: "/media/carrito-rd30.jpg"
    },  
    {
        id: 3,
        nombre: "Barra JD",
        precio: 90000,
        imagen: "/media/barra-tarros.jpg"
    },
    {
        id: 4,
        nombre: "Barra BT",
        precio: 60000,
        imagen: "/media/barra-botellas.jpg"
    },
]

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
                                            <p class="card-text">Carro de Terciado de pino barnizado, con cubierta lisa, que soporta 30 kg de carga. Ideal para todo tipo de eventos.</p>
                                            <p class="card-text">$${producto.precio}</p>
                                            <p class="card-text"><small class="text-body-secondary">Stock disponible: 5</small></p>
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