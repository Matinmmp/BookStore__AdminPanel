import { Order} from "../../models/Types";
import Row from './Row';
import { motion } from 'framer-motion';



type IProps = {
    orders:Order[];
}

const Table = ({orders}:IProps) => {
    return (
        <div className="relative  shadow-md sm:rounded-lg overflow-y-auto">
            <motion.table layout className="w-full text-left shadow-md min-w-[45rem]" >
                <motion.thead layout className=" text-white flex bg-accent  text-[.9rem]">
                    <motion.tr className="flex w-full justify-around text-center">
                        <th scope="col" className="px-6 py-3 w-3/12">
                            نام
                        </th>
                        <th scope="col" className="px-6 py-3 w-3/12">
                            مجموع مبلغ
                        </th>
                        <th scope="col" className="px-6 py-3 w-3/12">
                             زمان ثبت سفارش
                        </th>
                        <th scope="col" className="px-6 py-3 w-3/12">
                            عملیات
                        </th>
                    </motion.tr>
                </motion.thead>

                <motion.tbody className="text-center max-h-[55vh] flex flex-col overflow-auto w-full">
                    {orders.length > 0 ? orders.map((item) => <Row key={item._id} order={item} />) : null}
                </motion.tbody>
            </motion.table>
        </div>
    )
}

export default Table
