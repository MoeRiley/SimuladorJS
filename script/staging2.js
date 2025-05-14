let cartStorage = JSON.parse(localStorage.getItem("cartProducts")) || {};

let cartContainer = document.getElementById("cart-section");

function renderCarrito(cartItems) {
    cartContainer.innerHTML = ""; // Limpiar antes de renderizar

    Object.keys(cartItems).forEach(id => {
        const producto = productos.find(p => p.id == id);
        if (producto) {
            const cantidad = cartItems[id];
            const cart = document.createElement("div");
            cart.innerHTML = `
                <div class="card mb-3 text-center" style="max-width: 540px;">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src=${producto.imagen} class="img-fluid rounded-start" alt="Imagen del Producto">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h3 class="card-title">${producto.nombre}</h3>
                                <p class="card-text">Cantidad: ${cantidad}</p>
                                <p class="card-text">Precio total: $${producto.precio * cantidad}</p>
                                <button class="productoEliminar btn btn-danger" id="${producto.id}">Eliminar</button>
                            </div>
                        </div>
                    </div>
                </div>`;
            cartContainer.appendChild(cart);
        }
    });

    deleteElementButton();
}
renderCarrito(cartStorage);

function deleteElementButton() {
    const deleteButtons = document.querySelectorAll(".productoEliminar");
    deleteButtons.forEach(button => {
        button.onclick = (e) => {
            const productId = e.currentTarget.id;
            delete cartStorage[productId];
            localStorage.setItem("cartProducts", JSON.stringify(cartStorage));
            renderCarrito(cartStorage);
        };
    });
}

let clearCarrito = document.getElementById("clear");
clearCarrito.onclick = () => {
    localStorage.removeItem("cartProducts");
    cartStorage = {};
    cartContainer.innerHTML = "";
};

Object.entries(cartStorage).forEach(([id, cantidad]) => {
    const producto = productos.find(p => p.id == id);
    if (producto) {
        console.log({
            id: producto.id,
            nombre: producto.nombre,
            precioUnitario: producto.precio,
            cantidad: cantidad,
            total: producto.precio * cantidad
        });
    }
});
