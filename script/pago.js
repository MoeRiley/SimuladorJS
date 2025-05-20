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
        confirmButtonText: "Ver resumen"
    }).then((result) => {
        if (result.isConfirmed) {
            const resumenContainer = document.getElementById("resumenCompra") || document.createElement("div")
            resumenContainer.id = "resumenCompra"
            let resumenHTML = "<h2>Resumen de tu compra:</h2>"
            cartStorage.forEach(producto => {
                resumenHTML += `<p>${producto.nombre} x${producto.cantidad} = $${producto.precio*producto.cantidad}</p>`
            })
            resumenHTML +=  `<p><strong>Total pagado (con IVA): $${iva}</strong></p>
                            <a href="../index.html" class="btn btn-primary">Volver a Inicio</a>`
            resumenContainer.innerHTML = resumenHTML
            if (!document.body.contains(resumenContainer)) {
                document.body.appendChild(resumenContainer)
            }
            localStorage.removeItem("cartProducts")
        }
    })
}