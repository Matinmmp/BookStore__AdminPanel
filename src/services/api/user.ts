import privateAxios from "../instance/privateAxios";
import publicAxios from "../instance/publiceAxios";

export const logOut = async () => {
    await privateAxios.get('/auth/logout');
}

export const getUserById=async(id:string)=>{
   const response =await publicAxios.get(`/users/${id}`);
   return response.data.data.user;
   
}