import { Card } from "./components/cards.js"
import { getProducts } from "./api/api.js"

// Para el listado de productos de la grilla
const productsGrid = document.querySelector('#products-grid')
// Para el listado de productos del carrito
const cartSection = document.querySelector('.offcanvas-body') 
// Buscador
const searchProduct = document.querySelector('#buscar-productos') 

//-------------- Ejemplo para Usar las cards
async function renderCards() {
    const products = await getProducts();

    if (!products.length) {
        productsGrid.innerHTML = `<p class="text-center">No se pudieron cargar los productos </p>`;
        return;
    }

    let cardsHTML = "";
    products.forEach(product => {
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

renderCards();
//--------------

//*--------------- Functions
function abrirModal(productId) {
    alert('product ID: ' + productId);
}

//*--------------- Events
document.querySelectorAll('.detalle-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        abrirModal(id);
    });
});
