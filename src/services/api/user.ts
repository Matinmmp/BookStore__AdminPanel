import privateAxios from "../instance/privateAxios"

export const logOut = async () => {
    await privateAxios.get('/auth/logout');
}