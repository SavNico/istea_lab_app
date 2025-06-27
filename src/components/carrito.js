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


/**
 * Incrementa la cantidad de un producto específico en el carrito.
 * @param {number} idProducto - El ID del producto cuya cantidad se quiere aumentar.
 */
export function sumarCantidadProducto(idProducto) {
    const item = carrito.find(p => p.id === idProducto);
    if (item) {
        item.cantidad++;
        guardarCarrito();
    }
}

/**
 * Decrementa la cantidad de un producto específico en el carrito.
 * Si la cantidad llega a 0, el producto es eliminado del carrito.
 * @param {number} idProducto - El ID del producto cuya cantidad se quiere disminuir.
 */
export function restarCantidadProducto(idProducto) {
    const itemIndex = carrito.findIndex(p => p.id === idProducto);
    if (itemIndex > -1) {
        if (carrito[itemIndex].cantidad > 1) {
            carrito[itemIndex].cantidad--;
        } else {
            // Si la cantidad es 1 y se intenta restar, elimina el producto
            carrito.splice(itemIndex, 1);
        }
        guardarCarrito();
    }
}

/**
 * Elimina un producto completamente del carrito, independientemente de su cantidad.
 * @param {number} idProducto - El ID del producto a eliminar.
 */
export function eliminarProductoDelCarrito(idProducto) {
    carrito = carrito.filter(item => item.id !== idProducto);
    guardarCarrito();
}
