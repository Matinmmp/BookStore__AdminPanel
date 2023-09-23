import ModalContainer from "../../components/Modal/ModalContainer";
import { getAllProducts } from "../../services/api/product";
import AddModal from "../../components/Products/AddModal";
import Loading from "../../components/Loading/Loading";
import Table from "../../components/Products/Table";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { BiPlusCircle } from 'react-icons/bi';
import { useState, useEffect } from 'react';
import { createPortal } from "react-dom";

const index = () => {
    let [searchParams, setSearchParams] = useSearchParams();
    let pageNumber = '1'
    if (!Number.isNaN(Number(searchParams.get('page')))) pageNumber = String(searchParams.get('page'));
    const [page, setPage] = useState(pageNumber);
    const [isOpenAddProductModal, setIsOpenAddProductModal] = useState(false);
    let { data, isLoading } = useQuery({ queryKey: ['products', page], queryFn: () => getAllProducts(Number((page))) });

    useEffect(() => {
        if (!isLoading)
            if (data?.products.length === 0)
                handleChangePage(data?.totalPages)

    }, [data?.products.length])

    const modalElement = document.getElementById('modal');

    const handleChangePage = (number: number) => {
        if(number === 0)
            number =1
        searchParams.set('page', String(number));
        setSearchParams(searchParams);
        setPage(String(number))
    }

    const openAddProductModal = () => setIsOpenAddProductModal(true);
    const closeAddProductModal = () => setIsOpenAddProductModal(false);

    if (isLoading) return <Loading />

    return (
        <div className="felx flex-row gap-8 px-8 ">
            <div className="flex flex-col lg:flex-row gap-4 justify-between py-8">
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
