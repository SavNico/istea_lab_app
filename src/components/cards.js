export function Card(productId, imgUrl, alt, cardTitle) {
    return `
    <div class="col">
        <div class="card card-hover">
        <img src="${imgUrl}" class="card-img-top" alt="${alt}" style="max-height: 300px; height: 100%;">
        <div class="card-body">
            <h5 class="card-title text-center">${cardTitle}</h5>
            <div class="text-center"> 
                <button class="btn btn-outline-dark detalle-btn" data-id="${productId}" id="btn-product-${productId}">Más detalles</button>
            </div>
        </div>
        </div>
    </div>
    `
}