export type User = {
    _id:string
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


export enum Theme{
    System,
    Dark,
    Light
}

