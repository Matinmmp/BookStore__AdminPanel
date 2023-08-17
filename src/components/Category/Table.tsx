import { Category } from "../../models/Types";
import { getAllCategories } from "../../services/api/category"
import Row from './Row';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Table = () => {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        getAllCategories().then(res => setCategories(res));
    }, []);

    ;

    return (
        <div className="">
            <div className="relative overflow-auto shadow-md sm:rounded-lg">
                <motion.table layout className="w-full text-left shadow-md " >
                    <motion.thead layout className=" text-white flex bg-accent  text-[.9rem]">
                        <motion.tr className="flex w-full justify-around text-center">
                            <th scope="col" className="px-6 py-3 ">
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
                        </motion.tr>
                    </motion.thead>

                    <motion.tbody className="text-center max-h-[60vh] flex flex-col overflow-y-auto w-full">
                        {categories.length > 0 ? categories.map((item, id) => <Row key={item._id} category={item} id={id} />) : null}
                     

                    </motion.tbody>

                </motion.table>
            </div>

        </div>


    )
}

export default Table
