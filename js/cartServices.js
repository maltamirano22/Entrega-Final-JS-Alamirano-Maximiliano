// Suma productos al carrito.
function agregarAlCarrito(producto){
    const memoria = JSON.parse(localStorage.getItem("stockProductos"));
    console.log(memoria);
    let contador = 0;    
    if (!memoria){
        const nuevoProducto = getNuevoProductoParaMemoria(producto);
        localStorage.setItem("stockProductos",JSON.stringify([nuevoProducto]));
        contador = 1;
        }  else{
                const indiceProducto = memoria.findIndex(prod => prod.id === producto.id);
                console.log (indiceProducto)
                const nuevaMemoria = memoria;
                if (indiceProducto === -1){
                    nuevaMemoria.push(getNuevoProductoParaMemoria(producto))
                    contador = 1; 
                    }
                    else {
                        nuevaMemoria[indiceProducto].cantidad ++;
                        contador = nuevaMemoria[indiceProducto].cantidad;
                        }
                    localStorage.setItem("stockProductos",JSON.stringify(nuevaMemoria));
                }
    actualizarNumeroCarrito();
    return contador;
}

// Resta productos al carrito.

function restarAlCarrito(producto){
    const memoria = JSON.parse(localStorage.getItem("stockProductos"));
    const indiceProducto = memoria.findIndex(prod => prod.id === producto.id);
    memoria[indiceProducto].cantidad===1 ? memoria.splice(indiceProducto,1): memoria[indiceProducto].cantidad--;
    localStorage.setItem("stockProductos",JSON.stringify(memoria));
    actualizarNumeroCarrito();
}

// Toma un producto, le agrega cantidad 1 y lo devuelve 
function getNuevoProductoParaMemoria (producto){
    const nuevoProducto = producto;
    nuevoProducto.cantidad = 1;
    return nuevoProducto;
}

const CuentaCarritoElement=document.getElementById("cuenta-carrito");
function actualizarNumeroCarrito(){
    const memoria = JSON.parse(localStorage.getItem("stockProductos"));
    if (memoria && memoria.length > 0){
    const cuenta = memoria.reduce((acum,current)=> acum+current.cantidad,0);
    CuentaCarritoElement.innerText=cuenta;
}else {
    CuentaCarritoElement.innerText=0;
}
}
actualizarNumeroCarrito();
