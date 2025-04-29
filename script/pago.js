let cartStorage = localStorage.getItem("cartProducts")
 
cartStorage = JSON.parse(cartStorage)

const subtotal = cartStorage.reduce((contador, producto) => contador + producto.precio, 0)
const iva = cartStorage.reduce((contador,producto) => contador + producto.precio + producto.precio*19/100, 0)
console.log(subtotal)
console.log(iva)

let precioFinal = document.getElementById("totalapagar")
const card3 = document.createElement("div")
card3.innerHTML =   `<p>Subtotal: $${subtotal}</p>
                    <p>+ IVA</p>
                    <p>Total a pagar: $${iva}</p>`
precioFinal.appendChild(card3)