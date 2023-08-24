import { Category, Product } from "../../models/Types";
import { BiEditAlt } from 'react-icons/bi';
import { AiOutlineDelete } from 'react-icons/ai';

interface IProps {
    product: Product;
}
const Row = ({ product }: IProps) => {


    return (
        <tr className= " flex items-center hover:bg-accent-focus w-full ">
            <td className="px-6 py-4 w-1/12">
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

            <td className="px-6 py-4 w-5/12">
               دسته بندی
            </td>

            <td className=" text-right w-3/12">
                <div className="flex gap-2 justify-center ">
                    <button className="btn btn-error ">حذف <AiOutlineDelete /></button>
                    <button className="btn btn-warning">ویرایش <BiEditAlt /></button>
                </div>
            </td>

        </tr>
      
    )

}

export default Row
