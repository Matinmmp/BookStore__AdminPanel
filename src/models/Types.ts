export type User = {
    _id: string
    firstname: string,
    lastname: string,
    username: string,
    password: string,
    phoneNumber: string,
    address: string,
    role: string,
    refreshToken: string,
}

export type Product = {
    _id:string,
    category: String,
    subcategory: String,
    name: String,
    slugname: String,
    price: number
    quantity: number
    brand: String,
    description: String,
    thumbnail: String,
    images: String,
    rating: Rating,
}

type Rating={
    rate:Number,
    count:Number,
}

export type Category = {
    _id: string,
    name: string
    slugname: string
    icon: string
}

export enum AdminRoles {
    ADMIN,
    USER
}


export enum Theme {
    System,
    Dark,
    Light
}

