let cartStorage = localStorage.getItem("cartProducts")
 
cartStorage = JSON.parse(cartStorage)

const subtotal = cartStorage.reduce((contador, producto) => contador + producto.precio*producto.cantidad, 0)
const iva = subtotal*119/100

let precioFinal = document.getElementById("totalapagar")
const card3 = document.createElement("div")
card3.innerHTML =   `<p>Subtotal: $${subtotal}</p>
                    <p>+ IVA</p>
                    <p>Total a pagar: $${iva}</p>`
precioFinal.appendChild(card3)

const botonPagar = document.getElementById("botonPagar")

botonPagar.onclick = () => {
    Swal.fire({
        title: "Productos comprados exitosamente!",
        icon: "success",
        draggable: true
    })
}