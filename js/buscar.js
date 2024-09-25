// Función para buscar productos
function buscarProductos(productos, query) {
    
    if (query.trim() === "") {
        return [];
    }
    return productos.filter(producto => producto.nombre.toLowerCase().includes(query.toLowerCase()));
}

// Muestra resultados en el DOM
function mostrarResultados(resultados) {
    const res = document.getElementById('resultado');
    res.innerHTML = ''; 

    if (resultados.length === 0) {
    res.innerHTML = '<li>No se encontraron productos</li>';
    } else {
        resultados.forEach(producto => {
            const prod = document.createElement('div');
            prod.classList='buscar-prod'
            prod.innerHTML= `
            <img src="${producto.img}">
            <h3>${producto.nombre}</h3>
            <p>$${producto.precio}</p>
            `
            res.appendChild(prod);

        });
    }
}

// Fetch para obtener los productos desde productos.json

fetch('../stockProductos.json')
    .then(prod1 => prod1.json())
    .then(productos => {
        const inputBuscador = document.getElementById('buscar');
        
        inputBuscador.addEventListener('input', (event) => {
            const query = event.target.value;
            const resultados = buscarProductos(productos, query);
            mostrarResultados(resultados);
        });
    })
    .catch(error => {
        console.error('Error al cargar los productos:', error);
    });