import publicAxios from '../instance/publiceAxios';

export const refreshToken = async (token: string | undefined) => {
    // console.log(token);
    const res =await publicAxios.post("/auth/token", {refreshToken: token}).then(res => res.data);
    console.log(res);
    
    return await res
}