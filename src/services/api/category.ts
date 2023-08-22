import { Category } from "../../models/Types";
import publicAxios from "../instance/publiceAxios"

export const getAllCategories = async ():Promise<Category[]> => {
    const respons =await publicAxios.get('/categories');
    return await respons.data.data.categories
}