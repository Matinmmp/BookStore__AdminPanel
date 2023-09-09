import { getCategory } from "../../services/api/category";
import ModalContainer from "../Modal/ModalContainer";
import { HiMiniPencilSquare } from 'react-icons/hi2';
import { useQuery } from "@tanstack/react-query";
import { AiFillDelete } from 'react-icons/ai';
import { Product } from "../../models/Types";
import { createPortal } from "react-dom";
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";
import { useState } from "react";

interface IProps {
    product: Product;
}
const Row = ({ product }: IProps) => {
    const modalElement = document.getElementById('modal');
    let { data, isLoading } = useQuery({ queryKey: [`${product._id}`], queryFn: () => getCategory(product.category) },)

    const [isDeleteProductModalOpen, setIsDeleteProductModalOpen] = useState(false);
    const [isEditProductModalOpen, setIsEditProductModalOpen] = useState(false);

    const openDeleteProductModal = () => setIsDeleteProductModalOpen(() => true);
    const closeDeleteProductModal = () => setIsDeleteProductModalOpen(() => false);

    const openEditProductModal = () => setIsEditProductModalOpen(() => true);
    const closeEditProductModal = () => setIsEditProductModalOpen(() => false);

    return (
        <tr className=" flex justify-around items-center hover:bg-accent-focus hover:text-white transition-all w-full">

            <td className="px-6 py-4 w-1/12">
                <div className="flex items-center justify-center space-x-3">
                    <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                            <img src={`http://localhost:8000/images/products/thumbnails/${product.thumbnail}`} alt="Avatar Tailwind CSS Component" />
                        </div>
                    </div>
                </div>
            </td>

            <td className="px-6 py-4 w-3/12">
                {product.name}
            </td>

            <td className="px-6 py-4 w-5/12">
                {isLoading ? <div>loadin</div> : data?.name}
            </td>

            <td className=" text-right w-3/12 ">
                <div className="flex gap-2 justify-center items-center text-white">
                    <button className="btn btn-warning text-xl text-white"
                        onClick={openEditProductModal}>
                        <HiMiniPencilSquare />
                    </button>

                    <button className="btn btn-error text-xl text-white"
                        onClick={openDeleteProductModal}> <AiFillDelete />
                    </button>
                </div>
            </td>
            {modalElement &&
                isEditProductModalOpen &&
                createPortal(
                    <ModalContainer>
                        <EditModal closeModal={closeEditProductModal} product={product}/>
                    </ModalContainer>
                    , modalElement)}

            {modalElement &&
                isDeleteProductModalOpen &&
                createPortal(
                    <ModalContainer>
                        <DeleteModal closeModal={closeDeleteProductModal} name={product.name} id={product._id} />
                    </ModalContainer>
                    , modalElement)}
        </tr>

    )

}

export default Row
