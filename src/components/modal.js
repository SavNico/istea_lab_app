export function Modal(product) {
    return `
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="productModalLabel">${product.title}</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-12 col-md-6 mb-3 mb-md-0">
                            <img src="${product.image}" class="img-fluid" alt="${product.title}">
                        </div>
                        <div class="col-12 col-md-6 d-flex flex-column">
                            <p class="custom-gray rounded p-3 mb-3">${product.description}</p>
                            <p class="border rounded p-3"><strong>Precio:</strong> $${product.price}</p>
                            <div class="mt-auto d-flex justify-content-end gap-2">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                <button type="button" class="btn btn-dark" id="add-to-cart-btn" data-id="${product.id}">Agregar al carrito</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
}