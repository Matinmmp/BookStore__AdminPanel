
import { useState } from 'react';

import { getAllProducts } from '../../services/api/product';
import Table from '../../components/Price/Table';
import { useSearchParams } from "react-router-dom";
import { BiPlusCircle } from 'react-icons/bi';
import { useQuery } from '@tanstack/react-query';

const index = () => {
    let [searchParams, setSearchParams] = useSearchParams();
    const [page, setPage] = useState(searchParams.get('page'));
    let { data, isLoading } = useQuery({ queryKey: ['products', page], queryFn: () => getAllProducts(Number(page)) });

    const handleChangePage = (number: number) => {
        searchParams.set('page', String(number));
        setSearchParams(searchParams);
        setPage(String(number))
    }
    return (
        <div className="felx flex-row gap-8 px-8 ">
            <div className="flex flex-col lg:flex-row gap-4 justify-between py-8">
                <div className="order-2  ">
                    <input type='text' placeholder='جست و جو' className="input input-accent w-full" />
                </div>
                <button className="btn btn-accent flex items-center gap-2 order-1 lg:order-2"> ذخیره <BiPlusCircle className="text-xl" /></button>
            </div>
            <div className="flex flex-col ">
                {!isLoading && <Table products={data?.products} />}

                <div className="join flex flex-row-reverse justify-center mt-4">
                    {data?.totalPages && Array.from({ length: data?.totalPages }, (v, k) => k + 1).map(number =>
                        <button onClick={() => handleChangePage(number)} key={number} className={`join-item btn btn-accent btn-md
                         ${Number(page) === number ? 'btn-active' : ''}`}>{number}</button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default index
