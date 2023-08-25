import Table from "../../components/Products/Table"
import { BiPlusCircle } from 'react-icons/bi';
import { Product } from "../../models/Types";
import { useState, useEffect } from 'react';
import { getAllProducts } from "../../services/api/product";
import ModalContainer from "../../components/Modal/ModalContainer";
import AddModal from "../../components/Products/DeleteProduct";
import { createPortal } from "react-dom";


const index = () => {

    const [products, setProducts] = useState<Product[]>([]);
    const [totalPage, setTotalPage] = useState<number>();
    const [isDeleteProductModalOpen, setIsDeleteProductModalOpen] = useState(false);
    const [page, setPage] = useState(1);
    const modalElement = document.getElementById('modal');

    const openDeleteProductModal = () => setIsDeleteProductModalOpen(() => true);
    const closeDeleteProductModal = () => setIsDeleteProductModalOpen(() => false);

    useEffect(() => {
        getAllProducts(page).then(res => {
            setProducts(res.data.products);
            setTotalPage(res.total_pages);
        });
    }, [page]);


    return (
        <div className="felx flex-row gap-8 px-8 ">
            <div className="flex flex-col lg:flex-row gap-4 justify-between py-8">
                <div className="order-2  ">
                    <input type='text' placeholder='جست و جو' className="input input-accent w-full" />
                </div>
                <button className="btn btn-accent flex items-center gap-2 order-1 lg:order-2" onClick={openDeleteProductModal}
                >اضافه کردن <BiPlusCircle className="text-xl" />
                </button>
            </div>
            <div className="flex flex-col ">
                <Table products={products} />

                <div className="join flex flex-row-reverse justify-center mt-4">
                    {totalPage && Array.from({ length: totalPage }, (v, k) => k + 1).map(item =>
                        <button onClick={() => setPage(item)} key={item} className={`join-item btn btn-accent btn-md
                         ${page === item ? 'btn-active' : ''}`}>{item}</button>
                    )}
                </div>
            </div>
            {modalElement &&
                isDeleteProductModalOpen &&
                createPortal(
                    <ModalContainer>
                        <AddModal closeModal={closeDeleteProductModal}/>
                    </ModalContainer>
                    , modalElement)}
        </div>
    )
}

export default index
