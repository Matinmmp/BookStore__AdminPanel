export type User = {
    firstname: string,
    lastname: string,
    username: string,
    password: string,
    phoneNumber: string,
    address: string,
    role: string,
    refreshToken: string,
}

export enum AdminRoles {
    ADMIN,
    USER
}