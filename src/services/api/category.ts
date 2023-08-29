import { Category } from "../../models/Types";
import privateAxios from "../instance/privateAxios";
import publicAxios from "../instance/publiceAxios"

export const getAllCategories = async (): Promise<Category[]> => {
    const respons = await publicAxios.get('/categories');
    return await respons.data.data.categories
}

export const getCategory =async(id:string):Promise<Category> =>{
    const respons = await publicAxios.get(`/categories/${id}`);
    return respons.data.data.category;
}

export const postCategory = async (category:FormData) => {
    const response = await privateAxios.post('/categories',category)
}   

