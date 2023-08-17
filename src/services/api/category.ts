import publicAxios from "../instance/publiceAxios"

export const getAllCategories = async () => {
    const respons =await publicAxios.get('/categories');
    return await respons.data.data.categories
}