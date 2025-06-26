// Inicializa el carrito intentando cargar desde localStorage, sino va array vacio
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

/**
 * Agrega un producto al carrito. Si ya existe, incrementa su cantidad.
 * @param {Object} producto - El objeto producto a agregar. Debe tener `id`, `title`, y `price`.
 */
export function agregarAlCarrito(producto) {
    const existe = carrito.find(item => item.id === producto.id);

    if (existe) {
        // Si el producto ya está en el carrito, solo incrementa su cantidad
        existe.cantidad++;
    } else {
        // Si es un producto nuevo, lo añade con cantidad 1
        producto.cantidad = 1;
        carrito.push(producto);
    }
    // Guarda el estado actualizado del carrito en localStorage
    guardarCarrito();
    console.log('Producto agregado al carrito:', producto.title);
}

/**
 * Retorna el array actual del carrito.
 * @returns {Array} El carrito de compras.
 */
export function obtenerCarrito() {
    return carrito;
}

/**
 * Vacía completamente el carrito
 */
export function limpiarCarrito() {
    carrito = [];
    guardarCarrito();
    console.log('Carrito limpiado');
}

/**
 * Calcula el precio total de todos los productos en el carrito, si los hubiera
 * @returns {string} El total formateado a dos decimales.
 */
export function obtenerTotalCarrito() {
    // Reduce el array del carrito para sumar (precio * cantidad) de cada ítem
    const total = carrito.reduce((acumulador, item) => acumulador + (item.price * item.cantidad), 0);
    return total.toFixed(2); // Formatea a dos decimales
}

/**
 * Guarda el estado actual del carrito en localStorage. 
 */
function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}