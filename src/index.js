import { Card } from "./components/cards.js"
import { Modal } from './components/modal.js';
import { getProducts } from "./api/api.js"
import { agregarAlCarrito, obtenerCarrito, limpiarCarrito, obtenerTotalCarrito } from './components/carrito.js'; 


// Para el listado de productos de la grilla
const productsGrid = document.querySelector('#products-grid')
// Para el listado de productos del carrito (el div offcanvas-body)
const cartSection = document.querySelector('.offcanvas-body') 
// Buscador
const searchProduct = document.querySelector('#buscar-productos') 

// --- ELEMENTOS DEL DOM PARA EL CARRITO ---
// Creamos y adjuntamos los elementos del carrito 
const cartItemsList = document.createElement('ul'); 
cartItemsList.id = 'cart-items-list';
cartItemsList.className = 'list-group mb-3';
cartSection.appendChild(cartItemsList); 

const cartSummaryDiv = document.createElement('div'); 
cartSummaryDiv.id = 'cart-summary';
cartSummaryDiv.className = 'd-flex justify-content-between align-items-center mb-3';
cartSummaryDiv.innerHTML = `
    <strong>Total:</strong> 
    <span id="cart-total">$0.00</span>
`;
cartSection.appendChild(cartSummaryDiv);

const cartTotalElement = cartSummaryDiv.querySelector('#cart-total'); 

const clearCartBtn = document.createElement('button'); 
clearCartBtn.id = 'clear-cart-btn';
clearCartBtn.className = 'btn btn-danger w-100';
clearCartBtn.textContent = 'Vaciar Carrito';
cartSection.appendChild(clearCartBtn);

// Referencia al botón del carrito en el navbar (el que abre el offcanvas)
const cartOffcanvasBtn = document.querySelector('#cart-btn');

let allProducts = []

// --- funciones definidas antes de ser llamadas ---

async function renderCards(productList) {
    if (!productList.length) {
        productsGrid.innerHTML = `<p class="text-center">No se encontraron productos</p>`;
        return;
    }

    let cardsHTML = "";
    productList.forEach(product => {
        cardsHTML += Card(
            product.id,
            product.image,
            product.title,
            product.title
        );
    });

    productsGrid.innerHTML = cardsHTML;

    // Adjunta los listeners a los botones de detalle una vez que las tarjetas se han renderizado
    document.querySelectorAll('.detalle-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = e.currentTarget.getAttribute('data-id');
            abrirModal(id);
        });
    });
}

function abrirModal(productId) {
    const product = allProducts.find(p => p.id == productId);
    if (!product) return;

    const modalContainer = document.getElementById('productModal');
    modalContainer.innerHTML = Modal(product); 

    const modalInstance = new bootstrap.Modal(modalContainer, {
        backdrop: 'static',
        keyboard: true
    });
    modalInstance.show();

    /*acá escucha al botón de "agregar al carrito"*/
    setTimeout(() => {
        const addToCartBtn = document.getElementById('add-to-cart-btn');
        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', () => {
                agregarAlCarrito(product); 
                modalInstance.hide();
                mostrarMensaje(`${product.title} fue agregado al carrito.`);
                renderizarCarrito(); // Llama para actualizar la vista del carrito
            });
        }
    }, 0);
}

function mostrarMensaje(mensaje) {
    const div = document.createElement('div');
    div.className = 'alert alert-success alert-dismissible fade show position-fixed top-0 end-0 m-4';
    div.style.zIndex = 9999;
    div.role = 'alert';
    div.innerHTML = `
        ${mensaje}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    document.body.appendChild(div);
    setTimeout(() => {
        div.remove();
    }, 5000); 
}

// Renderiza los productos actualmente en el carrito dentro del offcanvas-body

function renderizarCarrito() {
    const carritoActual = obtenerCarrito(); 
    cartItemsList.innerHTML = ''; 

    if (carritoActual.length === 0) {
        cartItemsList.innerHTML = '<li class="list-group-item text-center text-muted">El carrito está vacío.</li>';
        cartTotalElement.textContent = '$0.00';
        clearCartBtn.disabled = true; 
        return; 
    }

    clearCartBtn.disabled = false; 

    carritoActual.forEach(item => {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
        listItem.innerHTML = `
            <div class="d-flex align-items-center">
                <img src="${item.image}" alt="${item.title}" style="width: 50px; height: 50px; object-fit: contain; margin-right: 10px;">
                <div>
                    <h6 class="my-0">${item.title}</h6>
                    <small class="text-muted">Cant: ${item.cantidad} x $${item.price.toFixed(2)}</small>
                </div>
            </div>
            <span class="text-muted">$${(item.price * item.cantidad).toFixed(2)}</span>
        `;
        cartItemsList.appendChild(listItem);
    });

    cartTotalElement.textContent = `$${obtenerTotalCarrito()}`;
}

//*--------------- End functions



//*--------------- Events ---

searchProduct.addEventListener("input", () => {
    const searchTerm = searchProduct.value.toLowerCase();
    const filtered = allProducts.filter(product =>
        product.title.toLowerCase().includes(searchTerm)
    );
    renderCards(filtered);
});


// Eventos del carrito
if (clearCartBtn) { 
    clearCartBtn.addEventListener('click', () => {
        limpiarCarrito(); 
        renderizarCarrito(); 
        mostrarMensaje('El carrito ha sido vaciado.');
    });
}

if (cartOffcanvasBtn) {
    cartOffcanvasBtn.addEventListener('click', () => {
        renderizarCarrito(); 
    });
}

// Inicialización. Carga los productos y renderiza el carrito al cargar la página.
document.addEventListener('DOMContentLoaded', () => {
    // Carga inicial de productos
    getProducts().then(products => {
        allProducts = products;
        renderCards(allProducts);
    });

    // Renderiza el carrito para mostrar ítems previos
    renderizarCarrito(); 
});