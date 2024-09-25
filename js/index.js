
const contenedorTarjetas = document.getElementById('productos-container');
// Crea tarjeta de producto en el DOM "Index"

    
    fetch('../stockProductos.json')
        .then(prod1 => prod1.json())
        .then(productos => {
            productos.forEach(producto => {
                const nuevoProducto = document.createElement("div");
                nuevoProducto.classList = "tarjeta-producto";
                nuevoProducto.innerHTML = `
                    <img src="${producto.img}">
                    <h3>${producto.nombre}</h3>
                    <p>$${producto.precio}</p>
                    <button>Agregar al carrito</button>
                `;
                
                contenedorTarjetas.appendChild(nuevoProducto);
    
                // Agrega producto al carrito
                nuevoProducto.getElementsByTagName("button")[0]
                .addEventListener("click", () => agregarAlCarrito(producto));
            });
        })
        

