import { Category } from "../../models/Types";
import { getAllCategories } from "../../services/api/category"
import Row from './Row';
import { useState, useEffect } from 'react';

const Table = () => {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        getAllCategories().then(res => setCategories(res));
    }, []);

    ;

    return (
        <div className="overflow-x-auto">
            {/* <table className="table table-zebra text-center rounded-lg" >
                <thead className="bg-accent-focus text-white text-[.8rem] ">
                    <tr>
                        <th>ردیف</th>
                        <th>آیکون</th>
                        <th>نام</th>
                        <th>عملیات</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.length > 0 ? categories.map((item, id) => <Row key={item._id} category={item} id={id} />) : null}
                </tbody>
            </table> */}


            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-white  bg-accent text-center text-[.8rem]">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                            ردیف
                            </th>
                            <th scope="col" className="px-6 py-3">
                            آیکون
                            </th>
                            <th scope="col" className="px-6 py-3">
                            نام
                            </th>
                            <th scope="col" className="px-6 py-3">
                            عملیات
                            </th>

                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {/* <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Apple MacBook Pro 17"
                            </th>
                            <td className="px-6 py-4">
                                Silver
                            </td>
                            <td className="px-6 py-4">
                                Laptop
                            </td>
                            <td className="px-6 py-4">
                                $2999
                            </td>
                            <td className="px-6 py-4 text-right">
                                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                            </td>
                        </tr> */}
                         {categories.length > 0 ? categories.map((item, id) => <Row key={item._id} category={item} id={id} />) : null}
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default Table
