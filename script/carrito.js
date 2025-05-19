let cartProducts = localStorage.getItem("cartProducts")

cartProducts = JSON.parse(cartProducts)

let cartContainer = document.getElementById("cart-section")

try {
    const storedProducts = localStorage.getItem("cartProducts")
    cartProducts = storedProducts ? JSON.parse(storedProducts) : []
} catch (error) {
    console.error("Error al parsear cartProducts:", error)
    cartProducts = []
}

if (cartProducts.length === 0) {
    cartContainer.innerHTML = "<span>El carrito está vacío.</span>"
} else {
    function renderCarrito(cartItems) {
        cartItems.forEach(producto => {
            const cart = document.createElement("div")
            cart.innerHTML =   `<div class="card mb-3 text-center">
                                    <div class="row g-0">
                                        <div class="col-md-4">
                                            <img src=${producto.imagen} class="img-fluid rounded-start" alt="Imagen del Producto">
                                        </div>
                                        <div class="col-md-8">
                                            <div class="card-body">
                                                <h3 class="card-title mb-5">${producto.nombre}</h3>
                                                <p class="card-text mb-5">$${producto.precio}</p>
                                                <div class="d-flex justify-content-center align-items-center gap-3">
                                                    <button class="btn btn-secondary minus mb-5" id="${producto.id}">-</button>
                                                    <span class="counter mb-5" id="counter-${producto.id}">${producto.cantidad}</span>
                                                    <button class="btn btn-primary plus mb-5" id="${producto.id}">+</button>
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
}

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
    Swal.fire({
        title: "Estás seguro?",
        text: "Esto eliminará todos los productos del carrito!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, vaciar carrito",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.clear()
            cartProducts = []
            cartContainer.innerHTML = "<span>El carrito está vacío.</span>"
            
            Swal.fire({
                title: "Carrito vaciado!",
                text: "Todos los productos fueron eliminados.",
                icon: "success"
            })
        }
    });
}

function addOneToCart () {
    plusButton = document.querySelectorAll(".plus")
    plusButton.forEach(button => {
        button.onclick = (e) => {
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
