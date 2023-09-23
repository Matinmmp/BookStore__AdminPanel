import { useState } from "react";
import { Order } from "../../models/Types";
import ModalContainer from "../Modal/ModalContainer";
import { createPortal } from "react-dom";
import DetailModal from "./DetailModal";

interface IProps {
    order: Order;
}
const Row = ({ order }: IProps) => {
    const [isOpenAddProductModal, setIsOpenAddProductModal] = useState(false);
    const openAddProductModal = () => setIsOpenAddProductModal(true);
    const closeAddProductModal = () => setIsOpenAddProductModal(false);
    const createData = new Date(order.createdAt)
    console.log(createData);
    
    const modalElement = document.getElementById('modal');
    return (
        <tr className= " flex items-center hover:bg-accent-focus w-full hover:text-white transition-all">

            <td className="px-6 py-4 w-3/12">
             متین محمدی
            </td>

            <td className="px-6 py-4 w-3/12">
              {order.totalPrice}
            </td>

            <td className="px-6 py-4 w-3/12">
               {createData.toLocaleDateString("fa", { year: "numeric", month: "2-digit", day: "2-digit" })}
            </td>

            <td className=" text-right w-3/12">
                <div className="flex gap-2 justify-center ">
                    <button className="btn btn-primary " onClick={openAddProductModal}>بررسی سفارش </button>
                </div>
            </td>

            {
                modalElement &&
                isOpenAddProductModal &&
                createPortal(
                    <ModalContainer>
                        <DetailModal closeModal={closeAddProductModal} order={order} />
                    </ModalContainer>
                    , modalElement)
            }
        </tr>
    )
}

export default Row
