//el getItem
let cartStorage = localStorage.getItem("cartProducts")

//transformador JSON 
cartStorage = JSON.parse(cartStorage)

//el getElement by id
let cartContainer = document.getElementById("cart-section")

//render carrito
function renderCarrito(cartItems) {
    cartItems.forEach(producto => {
        const cart = document.createElement("div")
        cart.innerHTML =   `<div class="card mb-3 text-center" style="max-width: 540px;">
                                <div class="row g-0">
                                    <div class="col-md-4">
                                        <img src=${producto.imagen} class="img-fluid rounded-start" alt="Imagen del Producto">
                                    </div>
                                    <div class="col-md-8">
                                        <div class="card-body">
                                            <h3 class="card-title">${producto.nombre}</h3>
                                            <p class="card-text">$${producto.precio}</p>
                                            <button class="btn btn-danger" id="${producto.id}">Eliminar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>`
        cartContainer.appendChild(cart)
    })
}
renderCarrito(cartStorage)