// Minibase de datos que se usará para las compras
let infoProductos = [{
    id: 1,
    nombre: "Cuaderno",
    categoria: "Cuadernos y anotaciones",
    descripcion: "Cuaderno de 100 hojas rayado",
    precio: 5000
}, {
    id: 2,
    nombre: "Lapicero",
    categoria: "Implementos para escribir",
    descripcion: "Lapicero negro, excelente para tomar notas",
    precio: 2000
}, {
    id: 3,
    nombre: "Lápiz",
    categoria: "Implementos para escribir",
    descripcion: "Lápiz Mongol #2",
    precio: 1000
}, {
    id: 4,
    nombre: "Morral",
    categoria: "Bolsos y estuches",
    descripcion: "Morral de tela gruesa",
    precio: 50000
}, {
    id: 5,
    nombre: "Marcador",
    categoria: "Implementos para escribir",
    descripcion: "Marcador borrable de color negro",
    precio: 2000
}, {
    id: 6,
    nombre: "Resaltador",
    categoria: "Implementos para escribir",
    descripcion: "Resaltador verde",
    precio: 3000
}, {
    id: 7,
    nombre: "Carpeta",
    categoria: "Bolsos y estuches",
    descripcion: "Carpeta naranja para llevar hojas sueltas",
    precio: 8000
}, {
    id: 8,
    nombre: "Cartuchera",
    categoria: "Bolsos y estuches",
    descripcion: "Cartuchera con correa para llevar como riñonera",
    precio: 30000
}, {
    id: 9,
    nombre: "Block",
    categoria: "Cuadernos y anotaciones",
    descripcion: "Block de 100 hojas tamaño carta",
    precio: 5000
}, {
    id: 10,
    nombre: "Libreta",
    categoria: "Cuadernos y anotaciones",
    descripcion: "Libreta 5 materias, para llevar todos tus apuntes",
    precio: 15000
}]

// Clase producto con sus características
class Producto {
    constructor(id, nombre, categoria, descripcion, precio) {
        this.id = id;
        this.nombre = nombre;
        this.categoria = categoria;
        this.descripcion = descripcion;
        this.precio = Intl.NumberFormat('es-CO').format(precio);
        this.precioReal = precio;
    }
    hacerDescuento(porcentaje) {
        return this.precio * (1 - porcentaje / 100)
    }
}
// DECLARACION DE VARIABLES
let usuario;
const productos = [];
let listaCategorias = ["Todos los productos"];
let productosElegidos = [];
let carritoCompras = [];
const totalEnHTML = document.getElementById("total");
const categoriasEnHTML = document.getElementById("categorias")
// Creación de productos a partir de la base de datos
infoProductos.forEach((productoInfo) => {
    productos.push(new Producto(productoInfo.id, productoInfo.nombre, productoInfo.categoria, productoInfo.descripcion, productoInfo.precio))
})

// Creación de la lista de categorías
infoProductos.forEach((producto) => {
    if (!listaCategorias.includes(producto.categoria)) listaCategorias.push(producto.categoria)
})

// Inicialización de la página
elegirProductos("Todos los productos");
mostrarCategoriasEnHTML();
mostrarCarritoEnHTML();


function mostrarCategoriasEnHTML() {
    for (const categoria of listaCategorias) {
        let boton = document.createElement("button");
        boton.innerText = categoria;
        boton.classList.add('btn', 'btn-sm', 'btn-outline-success');

        boton.addEventListener("click", function () { elegirProductos(categoria) }, false);
        categoriasEnHTML.appendChild(boton);
    }
}

// Dependiendo del boton que se pulse, se elegirán productos
function elegirProductos(cat) {
    if (cat == "Todos los productos") {
        productosElegidos = productos;
    } else {
        productosElegidos = productos.filter(
            (prod) => {
                if (prod.categoria == cat) return prod;
            }
        )
    }
    let listadoEnHTML = document.getElementById("lista-productos");

    listadoEnHTML.innerHTML = '';
    for (const producto of productosElegidos) {
        let contenedor = document.createElement("div");
        contenedor.classList.add('col');
        let boton = document.createElement("button");
        boton.innerText = "Compra";
        boton.classList.add('btn', 'btn-sm', 'btn-outline-success');
        boton.addEventListener("click", function () { anadirAlCarrito(producto) }, false);
        contenedor.innerHTML = `<div class="card shadow-sm">
                                <div class="card-body">
                                <h3>${producto.nombre}</h3>
                                <p>${producto.descripcion}</p>
                                <h4>Precio: $${producto.precio}</h4>
                                <div id="boton-prod-${productosElegidos.indexOf(producto)}" class=" btn-group d-flex">
                                </div>
                                </div>
                            </div>`;
        listadoEnHTML.appendChild(contenedor);
        let divBoton = document.getElementById(`boton-prod-${productosElegidos.indexOf(producto)}`);
        divBoton.appendChild(boton);
    }
};

function anadirAlCarrito(prod) {
    carritoCompras.push(prod);
    mostrarCarritoEnHTML();
}

function mostrarCarritoEnHTML() {
    let carritoEnHTML = document.getElementById("carrito")
    carritoEnHTML.innerHTML = '';
    if (carritoCompras.length > 0) {
        const carritoSinDuplicados = [...new Set(carritoCompras)];

        carritoSinDuplicados.forEach((item) => {
            const numeroUnidadesItem = carritoCompras.reduce((total, obj) => {
                return obj.id === item.id ? total += 1 : total;
            }, 0);

            const miNodo = document.createElement('li');
            miNodo.classList.add('list-group-item', 'text-right', 'd-flex', 'justify-content-between');
            miNodo.innerHTML = `<span><strong>${item.nombre}</strong> - $${item.precio} (${numeroUnidadesItem}) </span>`;

            // Boton de borrar
            const miBoton = document.createElement('button');
            miBoton.classList.add('btn', 'btn-secondary');
            miBoton.innerText = 'Quitar';
            miBoton.addEventListener("click", function () { borrarElementoDelCarrito(item.id) }, false);
            // Mezclamos nodos
            miNodo.appendChild(miBoton);
            carritoEnHTML.appendChild(miNodo);
        });
        // Renderizamos el precio total en el HTML
        totalEnHTML.innerHTML = calcularTotal();
    } else {
        const miNodo = document.createElement('li');
        miNodo.classList.add('list-group-item', 'text-right', 'd-flex', 'justify-content-between');
        miNodo.innerHTML = `<span>No hay elementos en el carrito</span>`;
        carritoEnHTML.appendChild(miNodo);
    }
    totalEnHTML.innerHTML = calcularTotal();
}

function borrarElementoDelCarrito(id) {
    console.log("el id del producto a borrar es: " + id);
    const posicion = carritoCompras.lastIndexOf(carritoCompras.find(elemento => elemento.id == id));
    console.log("Está en la posición " + posicion);
    carritoCompras.splice(posicion, 1);
    mostrarCarritoEnHTML();
}

function calcularTotal() {
    const total = carritoCompras.reduce(function (total, obj) {
        return parseInt(total + obj.precioReal);
    }, 0);
    return total != 0 ? "Total: $" + Intl.NumberFormat('es-CO').format(total) : '';

}
