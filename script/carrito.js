let cartStorage = localStorage.getItem("cartProducts")

cartStorage = JSON.parse(cartStorage)

let cartContainer = document.getElementById("cart-section")

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
                                            <button class="productoEliminar btn btn-danger" id="${producto.id}">Eliminar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>`
        cartContainer.appendChild(cart)
    })
    deleteElementButton()
}
renderCarrito(cartStorage)

function deleteElementButton() {
    const deleteButtons = document.querySelectorAll(".productoEliminar")
    deleteButtons.forEach(button => {
        button.onclick = (e) => {
            const productId = Number(e.currentTarget.id)
            cartStorage = cartStorage.filter(producto => producto.id !== productId)
            localStorage.setItem("cartProducts", JSON.stringify(cartStorage))
            cartContainer.innerHTML = ""
            renderCarrito(cartStorage)
            console.log(cartStorage)
        }
    })
}

let clearCarrito = document.getElementById ("clear")
clearCarrito.onclick = () => {
    localStorage.clear()
    cartContainer.innerHTML = ""
}