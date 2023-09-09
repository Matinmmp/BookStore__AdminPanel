import { Order } from "../../models/Types";

interface IProps {
    order: Order;
}
const Row = ({ order }: IProps) => {

    const createData = new Date(order.createdAt)

    return (
        <tr className= " flex items-center hover:bg-accent-focus w-full hover:text-white transition-all">

            <td className="px-6 py-4 w-3/12">
             متین محمدی
            </td>

            <td className="px-6 py-4 w-3/12">
              {order.totalPrice}
            </td>

            <td className="px-6 py-4 w-3/12">
               {createData.toDateString()}
            </td>

            <td className=" text-right w-3/12">
                <div className="flex gap-2 justify-center ">
                    <button className="btn btn-primary ">بررسی سفارش </button>
                </div>
            </td>

        </tr>
    )
}

export default Row
