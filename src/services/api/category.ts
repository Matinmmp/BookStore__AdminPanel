import privateAxios from "../instance/privateAxios";
import publicAxios from "../instance/publiceAxios";
import { Category } from "../../models/Types";

export const getAllCategories = async () => {
    const respons = await publicAxios.get('/categories');
    return await
        {
            categories: respons.data.data.categories,
            page: respons.data.page,
            totalPages: respons.data.total_pages
        };
}

export const getCategory =async(id:string):Promise<Category> =>{
    const respons = await publicAxios.get(`/categories/${id}`);
    return respons.data.data.category;
}

export const postCategory = async (category:FormData) => {
     await privateAxios.post('/categories',category)
}   

