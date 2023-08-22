import { Category } from "../../models/Types";
import {AiFillDelete} from 'react-icons/ai';
import { HiMiniPencilSquare } from 'react-icons/hi2';

interface IProps {
    category: Category;
}
const Row = ({ category}: IProps) => {

    return (
        <tr className= "bg-white border-b flex justify-around items-center hover:bg-accent-focus transition-all w-full ">
            <td className="px-6 py-4">
                <div className="flex items-center justify-center space-x-3">
                    <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                            <img src={`http://localhost:8000/images/categories/icons/${category.icon}`} alt="Avatar Tailwind CSS Component" />
                        </div>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4">
                {category.name}
            </td>

            <td className=" text-right max-w-[5rem]">
                <div className="flex gap-2 justify-center items-center text-white">
                    <button className="btn btn-error text-xl text-white"> <HiMiniPencilSquare /></button>
                    <button className="btn btn-warning text-xl text-white"> <AiFillDelete /></button>
                </div>
            </td>
        </tr>
      
    )

}

export default Row
