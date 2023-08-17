import { Category } from "../../models/Types"

interface IProps {
    category: Category;
    id: number
}
const Row = ({ category, id }: IProps) => {
    console.log(category);

    return (
        // <tr>
        //     <th>{id+1}</th>
        //     <td>
        //         <div className="flex items-center justify-center space-x-3">
        //             <div className="avatar">
        //                 <div className="mask mask-squircle w-12 h-12">
        //                     <img src={category.icon} alt="Avatar Tailwind CSS Component" />
        //                 </div>
        //             </div>
        //         </div>
        //     </td>
        //     <td>{category.name}</td>
        //     <td>
        //         <div className="flex gap-2 justify-center">
        //             <button className="btn btn-error">حذف</button>
        //             <button className="btn btn-warning">ویرایش</button>
        //         </div>
        //     </td>

        // </tr>

        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {id}
            </th>
            <td className="px-6 py-4">
                <div className="flex items-center justify-center space-x-3">
                    <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                            <img src={category.icon} alt="Avatar Tailwind CSS Component" />
                        </div>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4">
                {category.name}
            </td>

            <td className=" text-right max-w-[5rem]">
                <div className="flex gap-2 justify-center">
                    <button className="btn btn-error">حذف</button>
                    <button className="btn btn-warning">ویرایش</button>
                </div>
            </td>
        </tr>
    )

}

export default Row
