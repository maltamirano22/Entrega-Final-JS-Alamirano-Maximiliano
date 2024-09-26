const contenedorTarjetas = document.getElementById('carrito-container');
const unidadesElement = document.getElementById('unidades');
const precioElement = document.getElementById('precio');
const totalesElement = document.getElementById('totales');
const reiniciarCarritoElement = document.getElementById('reiniciar-carrito');

// Crea tarjeta de producto en el DOM "Carrito"
function crearTarjetasProductosCarrito() {    
    contenedorTarjetas.innerHTML = ""; 
    const prod1 = JSON.parse(localStorage.getItem("stockProductos")) || [];
    
    if (prod1.length > 0) {
        prod1.forEach(producto => {
            const nuevoProducto = document.createElement("div");
            nuevoProducto.classList = "tarjeta-producto";
            nuevoProducto.innerHTML = `
                <img src="${producto.img}">
                <h3>${producto.nombre}</h3>
                <p>$${producto.precio}</p>
                <div>
                    <button>-</button> 
                    <span class="cantidad">${producto.cantidad}</span> 
                    <button>+</button>
                </div>
            `;

            // Suma producto al carrito
            nuevoProducto.getElementsByTagName("button")[1].addEventListener("click", () => {
                agregarAlCarrito(producto);
                crearTarjetasProductosCarrito();
                actualizarTotales();
            });

            // Resta producto del carrito
            nuevoProducto.getElementsByTagName("button")[0].addEventListener("click", () => {  
                restarAlCarrito(producto);
                crearTarjetasProductosCarrito();
                actualizarTotales();
            });

            contenedorTarjetas.appendChild(nuevoProducto);      
        });
    } else {
      
        contenedorTarjetas.classList="carrito-vacio";
        contenedorTarjetas.innerHTML = "<p>El carrito está vacío</p>"; // Mensaje cuando no hay productos
    }
}

function actualizarTotales() {
    const prod1 = JSON.parse(localStorage.getItem("stockProductos")) || [];
    let unidades = 0;
    let precio = 0;

    if (prod1.length > 0) {
        prod1.forEach(producto => {
            unidades += producto.cantidad;
            precio += producto.precio * producto.cantidad;
        });
    }

    unidadesElement.innerText = unidades;
    precioElement.innerText = precio;
}



function reiniciarCarrito() {
    const prod1 = JSON.parse(localStorage.getItem("stockProductos")) || [];
    // Mostrar el SweetAlert antes de vaciar el carrito
    if (prod1.length > 0) {
    Swal.fire({
        title: '¿Estás seguro?',
        text: "¡Está a punto de vaciar el carrito!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, vaciar carrito',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem("stockProductos");
            
            Swal.fire(
                'Carrito vacío',
                '¡Usted vació el carrito!',
                'success'
            );
            crearTarjetasProductosCarrito();    
            actualizarTotales();
            actualizarNumeroCarrito();
        }
    });
}
}
reiniciarCarritoElement.addEventListener("click", reiniciarCarrito);


crearTarjetasProductosCarrito();
actualizarTotales();

