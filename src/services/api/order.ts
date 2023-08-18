import publicAxios from "../instance/publiceAxios"

export const getAllOrder = async (pageNumber:Number,deliverStatus:boolean) => {
    const respons =await publicAxios.get(`/orders?page=${pageNumber}&limit=10&deliveryStatus=${deliverStatus}`);
    console.log(respons.data);
    
    return await respons.data;
}