import privateAxios from '../instance/privateAxios';

export const refreshToken = (token: string | undefined) => {
    return privateAxios.post("/auth/token", {
        refreshToken: token
    }).then(res => res.data)
}