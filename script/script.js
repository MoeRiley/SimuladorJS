let productos = []

class product {
    static id = 0
    constructor (nombre, precio, descripcion, imagen, cantidad) {
        this.id = ++product.id,
        this.nombre = nombre,
        this.precio = precio,
        this.descripcion = descripcion,
        this.imagen = imagen,
        this.cantidad = cantidad
    }
}

const cargarProductos = async () => {
    const productosError = "<span>Lo sentimos, no se pudieron cargar los productos. Intentelo mas tarde</span>"

    try {
        const res = await fetch("../db/data.json")
        const productosRes = await res.json()

        productosRes.forEach((producto) => {
            productos.push(new product(
                producto.nombre,
                producto.precio,
                producto.descripcion,
                producto.imagen,
                producto.cantidad
            ))
        })
    }catch (err) {
        console.log("Error detectado", err)
        const container = document.getElementById("products-container")
        if (container) productsContainer.innerHTML = productosError
        
    } finally {
        renderProductos(productos)
    }    
}

cargarProductos()

let cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || []

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
                                            <h3 class="card-title mb-5">${producto.nombre}</h3>
                                            <p class="card-text mb-5">${producto.descripcion}</p>
                                            <p class="card-text mb-5">$${producto.precio}</p>
                                            <button class="productoAgregar btn btn-primary" id="${producto.id}">Agregar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>`
        productsContainer.appendChild(card)
    })
    addToCartButton()
}

function addToCartButton () {
    addButton = document.querySelectorAll(".productoAgregar")
    addButton.forEach(button => {
        button.onclick = (e) => {
            const productId= e.currentTarget.id
            const selectedProduct = productos.find(producto => producto.id == productId)
            let cartProduct =  cartProducts.find(producto => producto.id == productId)
            if (!cartProduct) {
                cartProducts.push(selectedProduct)
                cartProduct = cartProducts.find(producto => producto.id == productId)
            }
            cartProduct['cantidad'] += 1    
            localStorage.setItem("cartProducts", JSON.stringify(cartProducts))

            Toastify({
                text: `${selectedProduct.nombre} ha sido agregado al carrito`,
                duration: 2000,
                close: true,
                gravity: "top",
                position: "center",
                stopOnFocus: true,
                style: {
                    background: "linear-gradient(to right,rgb(8, 93, 219),rgb(143, 216, 238))"
                }
            }).showToast()
        }
    })
}
