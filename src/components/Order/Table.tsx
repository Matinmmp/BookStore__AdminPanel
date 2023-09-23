import { Order} from "../../models/Types";
import Row from './Row';

type IProps = {
    orders:Order[];
}

const Table = ({orders}:IProps) => {
    return (
        <div className="relative  shadow-md sm:rounded-lg overflow-y-auto ">
            <table  className="w-full text-left shadow-md min-w-[45rem]" >
                <thead className=" text-white flex bg-accent  text-[.9rem]">
                    <tr className="flex w-full justify-around text-center">
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
                    </tr>
                </thead>

                <tbody className="text-center max-h-[55vh] flex flex-col overflow-auto w-full">
                    {orders.length > 0 ? orders.map((item) => <Row key={item._id} order={item} />) : null}
                </tbody>
            </table>
        </div>
    )
}

export default Table
