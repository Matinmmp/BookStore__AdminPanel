import ModalContainer from "../../components/Modal/ModalContainer";
import { getAllCategories } from "../../services/api/category";
import AddModal from "../../components/Category/AddModal";
import Table from "../../components/Category/Table";
import { useQuery } from "@tanstack/react-query";
import { BiPlusCircle } from 'react-icons/bi';
import { createPortal } from 'react-dom';
import { useState } from 'react';

const index = () => {
    const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
    let { data, isLoading } = useQuery({ queryKey: ['categories'], queryFn: getAllCategories })

    const modalElement = document.getElementById('modal');

    const openAddCategoryModal = () => setIsAddCategoryModalOpen(() => true);
    const closeAddCategoryModal = () => setIsAddCategoryModalOpen(() => false);

    return (
        <div className="felx flex-row gap-8 px-8">
            <div className="flex flex-col lg:flex-row gap-4 justify-between py-8">

                <button className="btn btn-accent flex items-center gap-2 order-1 lg:order-2"
                    onClick={openAddCategoryModal}>اضافه کردن <BiPlusCircle className="text-xl" /></button>
            </div>
            {!isLoading && <Table categories={data?.categories} />}
            {modalElement &&
                isAddCategoryModalOpen &&
                createPortal(
                    <ModalContainer>
                        <AddModal closeModal={closeAddCategoryModal} />
                    </ModalContainer>
                    , modalElement)}
        </div>
    )
}

export default index;
