let cartStorage = localStorage.getItem("cartProducts")
let subtotal = 0
let iva = 0

try {
    cartStorage = JSON.parse(cartStorage)
    if (cartStorage.length === 0) {
        throw new Error("Carrito con datos inválidos")
    }
    
    subtotal = cartStorage.reduce((contador, producto) => contador + producto.precio*producto.cantidad, 0)
    iva = subtotal*119/100
    
    tarjeta()

} catch (err) {
    Swal.fire({
        title: "El carrito de compras esta vacío.",
        text: "No se puede realizar la operación.",
        icon: "error",
        confirmButtonText: '<a id="vuelta" href="../pages/productos.html">Volver</a>',
        allowOutsideClick: false
    })
    cartStorage = []
}

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

function tarjeta() {
    Swal.fire({
        title: "Ingrese el número de su tarjeta de crédito",
        input: "text",
        showCancelButton: false,
        confirmButtonText: "Confirmar",
        showLoaderOnConfirm: true,
        preConfirm: async (inputValue) => {
            try {
                const response = await fetch("../db/usuario.json")
                if (!response.ok) {
                    throw new Error("No se pudo cargar el archivo JSON")
                }
                const data = await response.json()
                const tarjetaValida = data[0].tarjeta

                if (inputValue !== tarjetaValida) {
                    throw new Error("Número de tarjeta incorrecto")
                }
                return true
            } catch (error) {
                Swal.showValidationMessage(`Error: ${error.message}`)
            }
        },
        allowOutsideClick: false
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                icon: "success",
                title: "Tarjeta válida",
                text: "Tarjeta aceptada."
            });
        }
    });
}