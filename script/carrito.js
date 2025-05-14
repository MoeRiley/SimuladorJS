let cartProducts = localStorage.getItem("cartProducts")

cartProducts = JSON.parse(cartProducts)

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
                                            <div class="d-flex justify-content-center align-items-center gap-3">
                                                <button class="btn btn-secondary minus" id="${producto.id}">-</button>
                                                <span class="counter" id="counter-${producto.id}">${producto.cantidad}</span>
                                                <button class="btn btn-primary plus" id="${producto.id}">+</button>
                                            </div>
                                            <button class="productoEliminar btn btn-danger" id="${producto.id}">Eliminar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>`
        cartContainer.appendChild(cart)
    })
    deleteElementButton()
    addOneToCart()
    removeOneToCart()
}
renderCarrito(cartProducts)

function deleteElementButton() {
    const deleteButtons = document.querySelectorAll(".productoEliminar")
    deleteButtons.forEach(button => {
        button.onclick = (e) => {
            const productId = Number(e.currentTarget.id)
            clearEmptyProduct(productId)
        }
    })
}

function clearEmptyProduct(id){
    const productId = id
    cartProducts = cartProducts.filter(producto => producto.id !== productId)
    localStorage.setItem("cartProducts", JSON.stringify(cartProducts))
    if (cartContainer) { cartContainer.innerHTML = "" }
    renderCarrito(cartProducts)
}

let clearCarrito = document.getElementById("clear")
clearCarrito.onclick = () => {
    localStorage.clear()
    cartContainer.innerHTML = ""
}


function addOneToCart () {
    plusButton = document.querySelectorAll(".plus")
    plusButton.forEach(button => {
        button.onclick = (e) => {
            console.log('clickenboton')
            const productId= e.currentTarget.id
            let cartProduct =  cartProducts.find(producto => producto.id == productId)
            cartProduct['cantidad'] += 1
            localStorage.setItem("cartProducts", JSON.stringify(cartProducts))
            productCounter = document.querySelector(`#counter-${productId}`)
            productCounter.innerHTML = cartProduct['cantidad']
        }
    })
}

function removeOneToCart () {
    minusButton = document.querySelectorAll(".minus")
    minusButton.forEach(button => {
        button.onclick = (e) => {
            const productId = Number(e.currentTarget.id);
            console.log(productId)
            let cartProduct =  cartProducts.find(producto => producto.id == productId)
            cartProduct['cantidad'] -= 1
            if (cartProduct['cantidad'] == 0) {
                clearEmptyProduct(productId)
            } else {
                productCounter = document.querySelector(`#counter-${productId}`)
                productCounter.innerHTML = cartProduct['cantidad']
            }
            localStorage.setItem("cartProducts", JSON.stringify(cartProducts))
        }
    })
}