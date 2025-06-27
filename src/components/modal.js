export function Modal(product) {
    return `
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="productModalLabel">${product.title}</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <img src="${product.image}" class="img-fluid mb-3" alt="${product.title}">
                    <p>${product.description}</p>
                    <p><strong>Precio:</strong> $${product.price}</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    <button type="button" class="btn btn-dark" id="add-to-cart-btn" data-id="${product.id}">Agregar al carrito</button>
                </div>
            </div>
        </div>`;
}