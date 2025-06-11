export function Card(productId, imgUrl, alt, cardTitle) {
    return `
    <div class="col">
        <div class="card card-hover h-100 d-flex flex-column">
            <img src="${imgUrl}" class="card-img-top mt-2" alt="${alt}" style="height: 250px; object-fit: contain;">
            <div class="card-body d-flex flex-column">
            <h5 class="card-title text-center">${cardTitle}</h5>
            <div class="text-center"> 
                <button class="btn btn-outline-dark detalle-btn" data-id="${productId}" id="btn-product-${productId}">Más detalles</button>
            </div>
        </div>
        </div>
    </div>
    `
}
