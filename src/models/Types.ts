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
    _id: string,
    category: string,
    subcategory: string,
    name: string,
    slugname: string,
    price: number
    quantity: number
    brand: string,
    description: string,
    thumbnail: string,
    images: string,
    rating: Rating,
}

export type  SubCategory={
    _id:string,
    name:string
}


type Rating = {
    rate: Number,
    count: Number,
}
export type Order = {
    _id: string
    user: string
    products: { products: Product[], count: number },
    totalPrice: number
    deliveryDate: Date
    deliveryStatus: boolean
    createdAt: Date
    updatedAt: Date
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

