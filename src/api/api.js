export async function getProducts() {
    try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) throw new Error("Error al obtener productos");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error en getProducts():", error);
        return [];
    }
}
