import { ChangeEvent, useState, useContext, useEffect } from "react";
import { Product } from "../../models/Types";
import { MainContext } from "../../context/Store";

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
    const [activePrice, setActivePrice] = useState(false);
    const [activeQuantity, setActiveQuantity] = useState(false);
    const { addToPricesProdutList, addToQuantitiesProdutList, pricesProdutList, quantitiesProdutList } = useContext(MainContext)

    const [price, setPrice] = useState<Price>({ id: product._id, price: product.price });
    const [quantity, setQuantity] = useState<Quantity>({ id: product._id, quantity: product.quantity });


    const handlePrice = (e: ChangeEvent<HTMLInputElement>) => {
        setPrice((item) => {
            return { ...item, price: Number(e.target.value) }
        });
    }

    const handleQuantity = (e: ChangeEvent<HTMLInputElement>) => {
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

    window.addEventListener('keydown', (e) => {

        // if (e.key === "Escape") {
        //     setActivePrice(false);
        //     setActiveQuantity(false);
        //     setQuantity((item) => {
        //         return { ...item, quantity: product.quantity }
        //     });
        //     setPrice((item) => {
        //         return { ...item, price: product.price }
        //     });
        // }
    });

    const addQuantity = () => {
        if (product.quantity !== quantity.quantity)
            addToQuantitiesProdutList(quantity);
    }
    const addPrice = () => {
        if (product.price !== price.price)
            addToPricesProdutList(price);
    }

    return (
        <tr className=" flex justify-around items-center hover:bg-accent-focus hover:text-white transition-all w-full">

            <td className="px-6 py-4 w-6/12">
                {product.name}
            </td>

            <td className="px-6 py-4 w-3/12 ">
                <input type="number" placeholder="قیمت"
                    value={price.price} onChange={handlePrice} onBlur={addPrice}
                    className={`input input-bordered input-sm w-32 ${!activePrice && 'hidden'}`} />
                <span className={`cursor-pointer ${activePrice && 'hidden'}`}
                    onDoubleClick={() => setActivePrice(true)}>{product.price}</span>
            </td>

            <td className="px-6 py-4 w-3/12 ">
                <input type="number" placeholder="تعداد" onBlur={addQuantity}
                    value={quantity.quantity} onChange={handleQuantity}
                    className={`input input-bordered input-sm w-32 ${!activeQuantity && 'hidden'}`} />
                <span className={`cursor-pointer ${activeQuantity && 'hidden'}`} onDoubleClick={() => setActiveQuantity(true)}>{product.price}</span>
            </td>

        </tr>
    )
}

export default Row
