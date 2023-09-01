import privateAxios from "../instance/privateAxios";
import publicAxios from "../instance/publiceAxios"


export const getAllProducts = async (pageNumber: Number) => {
    const respons = await publicAxios.get(`/products?page=${pageNumber}&limit=10`);
    return await
        {
            products: respons.data.data.products,
            page: respons.data.page,
            totalPages: respons.data.total_pages
        };
}

export const postProduct = async (product: FormData) => {
    const response = await privateAxios.post('/products', product);
    return response;
}

export const deleteProduct = async (id: string) => {
    await privateAxios.delete(`/products/${id}`);
}

export const editProductPriceAndQuantity = async (id:string,formData:FormData) => {
   const response = await privateAxios.patch(`/products/${id}`,formData);
   return  response ;
}













// export async function convertImage(value) {
//     if (typeof value === "string") {
//     try {
//     const url = `http://localhost:8000/images/products/images/${value}`;
//     const response = await fetch(url);
//     const blob = await response.blob();
//     const file = new File([blob], "image.jpg", { type: "image/jpeg" });
//     console.log(file);
//     return file;
//     } catch (error) {
//     throw new Error("can not convert that image to file");
//     }
//     } else {
//     return value;
//     }
//     }


// export async function handleMedias(images) {
//     let isAllString = images.find((item) => typeof item !== "string")
//     ? false
//     : true;
//     const medias = [];
//     if (!isAllString) {
//     for (let index = 0; index < images.length; index++) {
//     const mediaFile = await convertImage(images[index]);
//     medias.push(mediaFile);
//     }
//     return medias;
//     } else {
//     return undefined;
//     }
//     }