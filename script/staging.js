//db
fetch("../db/data.json")
    .then(response => response.json())
    .then(data => {
        data.forEach(producto => {
            const card = document.createElement("div")
            card.innerHTML = `<h2>Producto: ${producto.nombre}</h2>
            `
            cartContainer.appendChild(card)
        })
    })

const obtenerProducto = async () => {
    const URL = "../db/data.json"
    const producError = "<span> No se pudieron cargar los productos, intente más tarde </span>"
    let renderizado = ""

    try {
        let solicitud = await fetch(URL)
        let respuesta = await solicitud.json()

        respuesta.forEach(producto => {
            renderizado += `
            <div class="card mb-3 text-center">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src=${producto.imagen} class="img-fluid rounded-start" alt="Imagen del Producto">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h3 class="card-title">${producto.nombre}</h3>
                            <p class="card-text">${producto.descripcion}</p>
                            <p class="card-text">$${producto.precio}</p>
                            <div class="d-flex justify-content-center align-items-center gap-3">
                                <button class="btn btn-secondary" id="minus-${producto.id}">-</button>
                                <span id="counter-${producto.id}">0</span>
                                <button class="btn btn-primary" id="plus-${producto.id}">+</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`
        })
    }catch (err) {
        console.log("Error detectado", err)
        renderizado = producError
    }finally {
        document.body.innerHTML = renderizado
    }
}
obtenerProducto ()

let productos = [];

class Product {
    static id = 0;
    constructor(nombre, precio, descripcion, imagen) {
        this.id = ++Product.id;
        this.nombre = nombre;
        this.precio = precio;
        this.descripcion = descripcion;
        this.imagen = imagen;
    }
}

productos.push(new Product("Cart TE 30", 180000, "Carro de Terciado de pino barnizado, con cubierta lisa, que soporta 30 kg de carga. Ideal para todo tipo de eventos.", "../media/carrito-te30.jpg"));
productos.push(new Product("Cart RD 60", 200000, "Carro de Terciado Ranurado de pino barnizado, con cubierta lisa, que soporta 30 kg de carga. Ideal para todo tipo de eventos.", "../media/carrito-rd30.jpg"));
productos.push(new Product("Barra JD", 90000, "Barra de Barriles Jack Daniels, con cubierta lisa de pino barnizado, que soporta 30 kg de carga. Ideal para eventos de catering y mixología.", "../media/barra-tarros.jpg"));
productos.push(new Product("Barra BT", 60000, "Barra estilo Bar con ranuras en formato cava, con cubierta lisa de pino barnizado, que soporta 30 kg de carga. Ideal para decorar espacios dedicados.", "../media/barra-botellas.jpg"));

let cartProducts = {}; // {id: cantidad}

const productsContainer = document.getElementById("products-container");

function renderProductos(productsArray) {
    productsArray.forEach(producto => {
        const card = document.createElement("div");
        card.innerHTML = `
            <div class="card mb-3 text-center">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src=${producto.imagen} class="img-fluid rounded-start" alt="Imagen del Producto">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h3 class="card-title">${producto.nombre}</h3>
                            <p class="card-text">${producto.descripcion}</p>
                            <p class="card-text">$${producto.precio}</p>
                            <div class="d-flex justify-content-center align-items-center gap-3">
                                <button class="btn btn-secondary" id="minus-${producto.id}">-</button>
                                <span id="counter-${producto.id}">0</span>
                                <button class="btn btn-primary" id="plus-${producto.id}">+</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
        productsContainer.appendChild(card);
    });
    initQuantityButtons();
}

function initQuantityButtons() {
    productos.forEach(producto => {
        const plusBtn = document.getElementById(`plus-${producto.id}`);
        const minusBtn = document.getElementById(`minus-${producto.id}`);
        const counter = document.getElementById(`counter-${producto.id}`);

        let cantidad = 0;

        plusBtn.addEventListener("click", () => {
            cantidad++;
            counter.textContent = cantidad;
            cartProducts[producto.id] = cantidad;
            localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
        });

        minusBtn.addEventListener("click", () => {
            if (cantidad > 0) {
                cantidad--;
                counter.textContent = cantidad;
                cartProducts[producto.id] = cantidad;
                if (cantidad === 0) {
                    delete cartProducts[producto.id];
                }
                localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
            }
        });
    });
}

renderProductos(productos);
