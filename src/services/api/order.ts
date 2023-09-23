import publicAxios from "../instance/publiceAxios"

export const getAllOrders = async (pageNumber: Number, deliverStatus: string) => {
    const respons = await publicAxios.get(`/orders?page=${pageNumber}&limit=10&deliveryStatus=${deliverStatus}`);

    return await
        {
            orders: respons.data.data.orders,
            page: respons.data.page,
            totalPages: respons.data.total_pages
        };
}

export const editOrderStatus = async (id:string) => {
     await publicAxios.patch(`/orders/${id}`,{deliveryStatus:true});
}