import { SubCategory } from "../../models/Types";
import publicAxios from "../instance/publiceAxios"

export const getAllSubCategories = async (id:string): Promise<SubCategory[]> => {
    const respons = await publicAxios.get(`subcategories?category=${id}`);
    return await respons.data.data.subcategories
}