import { ChangeEvent, useState, ChangeEventHandler } from "react";
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
    const [activePrice, setActivePrice] = useState(false);
    const [activeQuantity, setActiveQuantity] = useState(false);

    const [price, setPrice] = useState<Price>({ id: product._id, price: product.price });
    const [quantity, setQuantity] = useState<Quantity>({ id: product._id, quantity: product.quantity });


    const handlePrice = (e: ChangeEvent<HTMLInputElement>) => {
        setPrice((item) => {
            return {...item,price:Number(e.target.value)}
        });
    }

    const handleQuantity = (e: ChangeEvent<HTMLInputElement>) => {
        setQuantity((item) => {
            return {...item,quantity:Number(e.target.value)}
        });
    }
    // let map = new Map();

    // map.set(1, 'str1');   // a string key
    // map.set(1, 'num1');     // a numeric key
    // map.set(true, 'bool1'); 
    // console.log(map);
    
    window.addEventListener('keydown', (e) => {
        if (e.key === "Escape") {
            setActivePrice(false);
            setActiveQuantity(false);
        }
    });

    return (
        <tr className=" flex justify-around items-center hover:bg-accent-focus hover:text-white transition-all w-full">

            <td className="px-6 py-4 w-6/12">
                {product.name}
            </td>

            <td className="px-6 py-4 w-3/12 ">
                <input type="number" placeholder="قیمت" value={price.price} onChange={handlePrice}
                    className={`input input-bordered input-sm w-32 ${!activePrice && 'hidden'}`} />
                <span className={`cursor-pointer ${activePrice && 'hidden'}`} onDoubleClick={() => setActivePrice(true)}>{product.price}</span>
            </td>

            <td className="px-6 py-4 w-3/12 ">
                <input type="number" placeholder="تعداد" value={quantity.quantity} onChange={handleQuantity}
                    className={`input input-bordered input-sm w-32 ${!activeQuantity && 'hidden'}`} />
                <span className={`cursor-pointer ${activeQuantity && 'hidden'}`} onDoubleClick={() => setActiveQuantity(true)}>{product.price}</span>
            </td>

        </tr>
    )
}

export default Row
