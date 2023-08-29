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

export const postProduct = async (product: FormData) => {
    const response = await privateAxios.post('/products', product);
    return response;
}

export const deleteProduct = async (id: string) => {
    await privateAxios.delete(`/products/${id}`);
}

export const editProductPriceAndQuantity = async (id:string,formData:FormData) => {
   const response = await privateAxios.patch(`/products/${id}`,formData);
   return  response ;
}