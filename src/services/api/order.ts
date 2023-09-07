import publicAxios from "../instance/publiceAxios"

export const getAllOrders = async (pageNumber:Number,deliverStatus:string) => {
    const respons =await publicAxios.get(`/orders?page=${pageNumber}&limit=10&deliveryStatus=${deliverStatus}`);
    
    return await respons.data;
}