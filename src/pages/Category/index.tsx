import Table from "../../components/Category/Table"
import { BiPlusCircle } from 'react-icons/bi'
import { createPortal } from 'react-dom';
import ModalContainer from "../../components/Modal/ModalContainer";
import { useState, ChangeEvent } from 'react';
import AddModal from "../../components/Category/AddModal";

const index = () => {
    const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
    const [searchInput,setSearchInput] = useState('');
    
    const modalElement = document.getElementById('modal');

    const openAddCategoryModal = () => setIsAddCategoryOpen(() => true);
    const closeAddCategoryModal = () => setIsAddCategoryOpen(() => false);
    const searchInputHandler=(e:ChangeEvent<HTMLInputElement>)=> setSearchInput(e.target.value);

    return (
        <div className="felx flex-row gap-8 px-8">
            <div className="flex flex-col lg:flex-row gap-4 justify-between py-8">
                <div className="order-2  ">
                    <input type='text' placeholder='جست و جو' className="input input-accent w-full" value={searchInput} 
                    onChange={searchInputHandler} />
                </div>
                <button className="btn btn-accent flex items-center gap-2 order-1 lg:order-2"
                    onClick={openAddCategoryModal}
                >اضافه کردن <BiPlusCircle className="text-xl" /></button>
            </div>
            <Table searchText={searchInput}/>
            {modalElement &&
                isAddCategoryOpen &&
                createPortal(
                    <ModalContainer>
                        <AddModal closeModal={closeAddCategoryModal} />
                    </ModalContainer>
                    , modalElement)}
        </div>
    )
}

export default index
export default index