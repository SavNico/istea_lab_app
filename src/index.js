import { Card } from "./components/cards.js"

// Para el listado de productos de la grilla
const productsGrid = document.querySelector('#products-grid')
// Para el listado de productos del carrito
const cartSection = document.querySelector('.offcanvas-body') 
// Buscador
const searchProduct = document.querySelector('#buscar-productos') 

//-------------- Ejemplo para Usar las cards
let cards = ''
for (let index = 0; index < 4; index++) {
    cards += Card(
        index, //ID del producto
        "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg", 
        "alt", 
        "Card Title", 
    )
}
productsGrid.innerHTML = cards
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
