import { Category } from "../../models/Types";
import { BiEditAlt } from 'react-icons/bi';
import { AiOutlineDelete } from 'react-icons/ai';

interface IProps {
    category: Category;
    id: number
}
const Row = ({ category, id }: IProps) => {
    console.log(category);

    return (
        <tr className= "bg-white border-b flex justify-around items-center dark:bg-gray-800 dark:border-gray-700 hover:bg-accent-focus w-full text-white">
            <th className="px-6 py-4 font-medium whitespace-nowrap dark:text-white">
                {id}
            </th>
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
                <div className="flex gap-2 justify-center ">
                    <button className="btn btn-error ">حذف <AiOutlineDelete /></button>
                    <button className="btn btn-warning">ویرایش <BiEditAlt /></button>
                </div>
            </td>
        </tr>
      
    )

}

export default Row
