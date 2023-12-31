import { Product } from "../../models/Types";
import { motion } from 'framer-motion';
import Row from './Row';


type IProps = {
    products: Product[];
}

const Table = ({ products }: IProps) => {

    return (
        <div className="relative  shadow-md sm:rounded-lg overflow-auto">
            <motion.table layout className="w-full text-left shadow-md min-w-[45rem]" >
                <motion.thead layout className=" text-white flex bg-accent  text-[.9rem]">
                    <motion.tr className="flex w-full justify-around text-center">
                        <th scope="col" className="px-6 py-3 w-3/12">
                            تصویر
                        </th>
                        <th scope="col" className="px-6 py-3 w-3/12">
                            نام
                        </th>
                        <th scope="col" className="px-6 py-3 w-3/12">
                            قیمت
                        </th>
                        <th scope="col" className="px-6 py-3 w-3/12">
                            موجودی
                        </th>
                    </motion.tr>
                </motion.thead>

                <motion.tbody className="text-center max-h-[55vh] flex flex-col overflow-auto w-full">
                    {products.length > 0 ? products.map((item) => <Row key={item._id} product={item} />) : null}
                </motion.tbody>
            </motion.table>
        </div>
    )
}

export default Table
