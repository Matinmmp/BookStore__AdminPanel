import privateAxios from "../instance/privateAxios";
import publicAxios from "../instance/publiceAxios"

export const getAllProducts = async (pageNumber: Number) => {
    const respons = await publicAxios.get(`/products?page=${pageNumber}&limit=10`);
    return await
        {
            products: respons.data.data.products,
            page: respons.data.page,
            totalPages: respons.data.total_pages
        };
}

export const deleteProduct = async (id: string) => {
    const response = await privateAxios.delete(`/products/${id}`);
}