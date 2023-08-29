import publicAxios from '../instance/publiceAxios';

export const refreshToken = async (token: string | undefined) => {
    const res =await publicAxios.post("/auth/token", {refreshToken: token}).then(res => res.data);
    return await res
}