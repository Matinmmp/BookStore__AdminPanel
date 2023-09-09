import Table from "../../components/Products/Table"
import { BiPlusCircle } from 'react-icons/bi';
import { useState} from 'react';
import { getAllProducts } from "../../services/api/product";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { createPortal } from "react-dom";
import ModalContainer from "../../components/Modal/ModalContainer";
import AddModal from "../../components/Products/AddModal";
import Loading from "../../components/Loading/Loading";

const index = () => {

    let [searchParams, setSearchParams] = useSearchParams();
    const [page, setPage] = useState(searchParams.get('page'));
    const [isOpenAddProductModal, setIsOpenAddProductModal] = useState(false);
    let { data, isLoading } = useQuery({ queryKey: ['products', page], queryFn: () => getAllProducts(Number(page)) });

    const modalElement = document.getElementById('modal');

    const handleChangePage = (number: number) => {
        searchParams.set('page', String(number));
        setSearchParams(searchParams);
        setPage(String(number))
    }

    if(isLoading) return <Loading/>

    const openAddProductModal = () => setIsOpenAddProductModal(true);
    const closeAddProductModal = () => setIsOpenAddProductModal(false);

    return (
        <div className="felx flex-row gap-8 px-8 ">
            <div className="flex flex-col lg:flex-row gap-4 justify-between py-8">
                <div className="order-2  ">
                    <input type='text' placeholder='جست و جو' className="input input-accent w-full" />
                </div>
                <button className="btn btn-accent flex items-center gap-2 order-1 lg:order-2"
                    onClick={openAddProductModal}>اضافه کردن
                    <BiPlusCircle className="text-xl" />
                </button>
            </div>
            <div className="flex flex-col ">
                {!isLoading && <Table products={data?.products} />}
                <div className="join flex flex-row-reverse justify-center mt-4">
                    {!isLoading && data?.totalPages && Array.from({ length: data.totalPages }, (v, k) => k + 1).map(number =>
                        <button onClick={() => handleChangePage(number)} key={number} className={`join-item btn btn-accent btn-md
                         ${Number(page) === number ? 'btn-active' : ''}`}>{number}</button>
                    )}
                </div>
            </div>
            {
                modalElement &&
                isOpenAddProductModal &&
                createPortal(
                    <ModalContainer>
                        <AddModal closeModal={closeAddProductModal} />
                    </ModalContainer>
                    , modalElement)
            }

        </div>
    )
}

export default index
