import Table from "../../components/Category/Table"
import { BiPlusCircle } from 'react-icons/bi'
import { createPortal } from 'react-dom';
import ModalContainer from "../../components/Modal/ModalContainer";
import { useState } from 'react';
import AddModal from "../../components/Category/AddModal";

const index = () => {
    const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);

    const handleAddCategory = () => {

    }
    const modalElement = document.getElementById('modal');

    const openAddCategoryModal = () => {
        setIsAddCategoryOpen(() => true);
    }

    const closeAddCategoryModal = () => {
        setIsAddCategoryOpen(() => false);
    }

    return (
        <div className="felx flex-row gap-8 px-8">
            <div className="flex justify-between py-8">
                <div>
                    <input type='text' placeholder='جست و جو' className="input input-accent" />
                </div>
                <button className="btn btn-accent flex items-center gap-2 text-white" onClick={openAddCategoryModal}
                >اضافه کردن <BiPlusCircle className="text-xl" /></button>
                {modalElement &&
                    isAddCategoryOpen &&
                    createPortal(
                        <ModalContainer>
                            <AddModal closeModal={closeAddCategoryModal} />
                        </ModalContainer>
                        , modalElement)}
            </div>
            <Table />
        </div>
    )
}

export default index