import publicAxios from "../instance/publiceAxios";
import { SubCategory } from "../../models/Types";

export const getAllSubCategories = async (id:string): Promise<SubCategory[]> => {
    const respons = await publicAxios.get(`subcategories?category=${id}`);
    return await respons.data.data.subcategories
}