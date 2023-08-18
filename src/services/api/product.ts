import publicAxios from "../instance/publiceAxios"

export const getAllProducts = async (pageNumber:Number) => {
    const respons =await publicAxios.get(`/products?page=${pageNumber}&limit=10`);

    return await respons.data;
}