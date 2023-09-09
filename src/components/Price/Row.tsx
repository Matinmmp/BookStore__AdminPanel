import { ChangeEvent, useState, useContext, useEffect, KeyboardEvent } from "react";
import { MainContext } from "../../context/Store";
import { Product } from "../../models/Types";

interface IProps {
    product: Product;
}

type Quantity = {
    id: string
    quantity: number
}

type Price = {
    id: string
    price: number
}

const Row = ({ product }: IProps) => {
    const numberRegex = /^\d+$/;
    const [activePrice, setActivePrice] = useState(false);
    const [activeQuantity, setActiveQuantity] = useState(false);
    const { addToPricesProdutList, addToQuantitiesProdutList,
        pricesProdutList, quantitiesProdutList, deleteFromPriceProductList, deleteFromQuantityProductList } = useContext(MainContext)
    const [price, setPrice] = useState<Price>({ id: product._id, price: product.price });
    const [quantity, setQuantity] = useState<Quantity>({ id: product._id, quantity: product.quantity });

    const handlePrice = (e: ChangeEvent<HTMLInputElement>) => {
        if (numberRegex.test(e.target.value))
            setPrice((item) => {
                return { ...item, price: Number(e.target.value) }
            });
    }

    const handleQuantity = (e: ChangeEvent<HTMLInputElement>) => {
        if (numberRegex.test(e.target.value))
            setQuantity((item) => {
                return { ...item, quantity: Number(e.target.value) }
            });
    }

    useEffect(() => {
        if (!pricesProdutList.length && !quantitiesProdutList.length) {
            setActivePrice(false);
            setActiveQuantity(false);
            setQuantity((item) => {
                return { ...item, quantity: product.quantity }
            });
            setPrice((item) => {
                return { ...item, price: product.price }
            });
        }
    }, [pricesProdutList, quantitiesProdutList])

    const addQuantity = () => {
        if (product.quantity !== quantity.quantity)
            addToQuantitiesProdutList(quantity);
    }

    const addPrice = () => {
        if (product.price !== price.price)
            addToPricesProdutList(price);
    }

    const handleCancelPrice = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Escape") {
            setActivePrice(false);
            setPrice((item) => {
                return { ...item, price: product.price }
            });
            deleteFromPriceProductList(price);
        }
    }

    const handleCancelQuantity = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Escape") {
            setActiveQuantity(false);
            setQuantity((item) => {
                return { ...item, quantity: product.quantity }
            });
            deleteFromQuantityProductList(quantity);
        }
    }

    return (
        <tr className=" flex justify-around items-center hover:bg-accent-focus hover:text-white transition-all w-full">

            <td className="px-6 py-4 w-3/12">
                <div className="flex items-center justify-center space-x-3">
                    <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                            <img src={`http://localhost:8000/images/products/thumbnails/${product.thumbnail}`} alt="Avatar Tailwind CSS Component" />
                        </div>
                    </div>
                </div>
            </td>

            <td className="px-6 py-4 w-3/12">
                {product.name}
            </td>

            <td className="px-6 py-4 w-3/12 ">
                <input type="text" placeholder="قیمت" onKeyDown={handleCancelPrice}
                    value={price.price} onChange={handlePrice} onBlur={addPrice}
                    className={`input input-bordered input-sm w-32 ${!activePrice && 'hidden'}`} />
                <span className={`cursor-pointer ${activePrice && 'hidden'}`}
                    onDoubleClick={() => setActivePrice(true)}>{product.price}</span>
            </td>

            <td className="px-6 py-4 w-3/12 ">
                <input type="text" placeholder="تعداد" onBlur={addQuantity} onKeyDown={handleCancelQuantity}
                    value={quantity.quantity} onChange={handleQuantity}
                    className={`input input-bordered input-sm w-32 ${!activeQuantity && 'hidden'}`} />
                <span className={`cursor-pointer ${activeQuantity && 'hidden'}`} onDoubleClick={() => setActiveQuantity(true)}>
                    {product.quantity}</span>
            </td>

        </tr>
    )
}

export default Row
