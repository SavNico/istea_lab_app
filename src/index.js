import { Card } from "./components/cards.js"
import { Modal } from './components/modal.js';
import { getProducts } from "./api/api.js"

// Para el listado de productos de la grilla
const productsGrid = document.querySelector('#products-grid')
// Para el listado de productos del carrito
const cartSection = document.querySelector('.offcanvas-body') 
// Buscador
const searchProduct = document.querySelector('#buscar-productos') 

//-------------- Ejemplo para Usar las cards
let allProducts = []

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

    document.querySelectorAll('.detalle-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = e.currentTarget.getAttribute('data-id');
            abrirModal(id);
        });
    });
}

getProducts().then(products => {
    allProducts = products;
    renderCards(allProducts);
});
//--------------
searchProduct.addEventListener("input", () => {
    const searchTerm = searchProduct.value.toLowerCase();
    const filtered = allProducts.filter(product =>
        product.title.toLowerCase().includes(searchTerm)
    );
    renderCards(filtered);
});

//*--------------- Functions
function abrirModal(productId) {
    /***************anterior:
    alert('product ID: ' + productId);
    ***************/

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
                mostrarMensaje(`${product.title} fue agregado al carrito`);
            });
        }
    }, 0);
}

function agregarAlCarrito(product) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.push(product);
    localStorage.setItem('carrito', JSON.stringify(carrito));
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
    }, 5000); /*se muestra el mensaje por 5 segundos, si quieren más, se puede.*/
}

//*--------------- End functions

//*--------------- Events
document.querySelectorAll('.detalle-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        abrirModal(id);
    });
});
