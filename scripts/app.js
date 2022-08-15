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
    }
    hacerDescuento(porcentaje) {
        return this.precio * (1 - porcentaje / 100)
    }
}
// DECLARACION DE VARIABLES
const productos = [];
let listaCategorias = ["Todos los productos"];
let carritoCompras = [];
let seguirComprando = true;
let totalAPagar = 0;

// Creación de productos a partir de la base de datos
infoProductos.forEach((productoInfo) => {
    productos.push(new Producto(productoInfo.id, productoInfo.nombre, productoInfo.categoria, productoInfo.descripcion, productoInfo.precio))
})

// Creación de la lista de categorías
infoProductos.forEach((producto) => {
    if (!listaCategorias.includes(producto.categoria)) {
        listaCategorias.push(producto.categoria);

        
    }
})
// Creación de Botones de categorías
let categoriasEnHTML = document.getElementById("categorias")
for (const categoria of listaCategorias){
    let boton = document.createElement("button");
    boton.innerText = categoria;
    boton.classList.add('btn', 'btn-sm', 'btn-outline-success');
    categoriasEnHTML.appendChild(boton);
    boton.addEventListener("click", function(){elegirProductos(categoria)},false);
}

function elegirProductos(cat){
    if (cat == "Todos los productos"){
        alert(cat);
    } else {
        alert("wehuu "+cat);
    }
};

// En esta parte, se irán agregando los productos al html
let listadoEnHTML = document.getElementById("lista-productos");
for (const producto of productos) {
    let contenedor = document.createElement("div");
    contenedor.classList.add('col');
    contenedor.innerHTML = `<div class="card shadow-sm">
                                <div class="card-body">
                                <h3>${producto.nombre}</h3>
                                <p>${producto.descripcion}</p>
                                <h4>Precio: $${producto.precio}</h4>
                                <div class=" btn-group d-flex">
                                    <button type="button" class="btn btn-sm btn-outline-success">Comprar</button>
                                </div>
                                </div>
                            </div>`;
    listadoEnHTML.appendChild(contenedor);
}




// // Bienvenida
// alert("BIENVENIDO A LA TIENDA DE ÚTILES ESCOLARES 'EL ESTUDIANTE'");
// alert("¿Qué tipo de producto te interesa hoy?")
// console.log(carritoCompras.length);
// // Inicio de un bucle while, donde se irán haciendo las compras, y anexando los prodcutos elegidos a un carrito de compras
// while (seguirComprando) {

//     // Variables temporales que se necesitan
//     let eleccion;
//     let catElegida;
//     let productosElegidos = [];

//     // Se pregunta un número para cada categoría existente.
//     do {
//         eleccion = parseInt(prompt("Elige un número de acuerdo a la categoría (Presiona 0 para salir):\n" + numerarElementos(listaCategorias)));

//     } while (!Number.isInteger(eleccion) || (eleccion < 0 || eleccion > listaCategorias.length));

//     // Dependiendo de la elección, se realiza una asignación de categoría y productos
//     switch (eleccion) {
//         case 0: {

//             // 0 para salir, por eso seguirComprando se hace false
//             alert("Pulsaste 0, finalización de compra");
//             seguirComprando = false;

//             break;
//         }
//         case 1: {

//             // 1 para 'Todos los productos', por lo que los productos elegidos será el mismo array de productos
//             catElegida = listaCategorias[eleccion - 1];
//             productosElegidos = productos;
//             break;
//         }
//         default: {

//             // Para el resto de casos, se hace elección de los productos que coincidad con la categoría elegida
//             catElegida = listaCategorias[eleccion - 1];
//             for (i = 0; i < productos.length; i++) {
//                 if (productos[i].categoria == catElegida) {
//                     productosElegidos.push(productos[i])
//                 }
//             }
//             break;
//         }
//     }
//     if (seguirComprando) {

//         // Si se decide hacer una compra, se mostrarán todos los productos elegidos y su precio
//         let mensaje = "";
//         for (let el of productosElegidos) {
//             if (el.categoria == catElegida || catElegida == "Todos los productos") {
//                 mensaje += el.nombre + " - Precio: $" + el.precio + " (" + (1 + productosElegidos.indexOf(el)) + ")\n";
//             }
//         }
//         do {
//             eleccion = parseInt(prompt("En la categoria '" + catElegida + "' se tienen los siguientes items:\n\nPresiona el número del producto par elegirlo o 0 para cancelar compra:\n\n" + mensaje));

//         } while (!Number.isInteger(eleccion) || (eleccion < 0 || eleccion > productosElegidos.length));

//         let articuloAComprar;
//         if (eleccion == 0) {
//             alert("No se eligió un producto");

//         } else {
//             // Se muestra en pantalla el producto a elegir
//             articuloAComprar = productosElegidos[eleccion - 1];
//             mensaje = "Elegiste el artículo '" + articuloAComprar.nombre + "'";
//             mensaje += "\nPrecio: $" + articuloAComprar.precio;
//             mensaje += "\nDescripción: " + articuloAComprar.descripcion;
//             alert(mensaje);

//             // Se confirma la compra. en caso positivo se agrega al array articuloAComprar
//             let confirmarCompra = confirm("¿Deseas comprarlo?");
//             if (confirmarCompra) {
//                 carritoCompras.push(articuloAComprar);
//                 alert("¡Agregado al Carrito!");
//                 alert("tienes " + carritoCompras.length + " artículo(s) en tu carrito\nPrecio Total de Artículos en el Carrito: $" + calcularVrTotArticulos(carritoCompras));
//             }
//         }

//         // Se pregunta si se desea seguir comprando
//         seguirComprando = confirm("¿Volver a Elegir Categoría?");
//     }
// }

// // Al final se muestran los artículos comprados
// if(carritoCompras.length > 0){
//     let mensaje = "";
//     for (let el of carritoCompras) {
//             mensaje += el.nombre + " - Precio: $" + el.precio + " (" + (1 + carritoCompras.indexOf(el)) + ")\n";
//     }
//     alert("Tus artículo(s) elegidos fueron:\n"+mensaje);
//     alert("Valor a Pagar: $"+calcularVrTotArticulos(carritoCompras));
// } else {
//     alert("Esperamos que la próxima vez podamos ofrecerte lo que estás buscando");
// }

// alert("Gracias por tu visita");

// function calcularVrTotArticulos(articulos) {
//     return articulos.reduce(function (total, obj) { return total + obj.precio; }, 0)
// }
// function numerarElementos(arreglo) {
//     let arregloNumerado = [];
//     for (let i = 0; i < arreglo.length; i++) {
//         arregloNumerado.push(arreglo[i] + " (" + (i + 1) + ")");
//     }
//     return arregloNumerado.join("\n");
// }