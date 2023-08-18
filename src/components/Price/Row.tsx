import { Product } from "../../models/Types";


interface IProps {
    product: Product;
}
const Row = ({ product }: IProps) => {


    return (
        <tr className="bg-white border-b flex items-center dark:bg-gray-800 dark:border-gray-700 hover:bg-accent-focus w-full text-white">


            <td className="px-6 py-4 w-6/12">
                {product.name}
            </td>

            <td className="px-6 py-4 w-3/12">
                {product.price}
            </td>

            <td className="px-6 py-4  w-3/12">
                {product.quantity}
            </td>

        </tr>

    )

}

export default Row
